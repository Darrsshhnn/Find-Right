/**
 * Small, dependency-free SVG charts for server components. Single series in the brand purple
 * (validated against the light surface). Each mark has a hover/focus tooltip; every chart ships a table view.
 */

export type Point = { label: string; value: number; display: string };

const W = 640;
const H = 240;
const PAD = { top: 24, right: 16, bottom: 32, left: 52 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

function niceTicks(max: number, count = 4) {
  if (max <= 0) return [0, 1];
  const raw = max / count;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw)!;
  const ticks: number[] = [];
  for (let t = 0; t <= max + step * 0.001; t += step) ticks.push(Math.round(t * 100) / 100);
  if (ticks[ticks.length - 1]! < max) ticks.push(ticks[ticks.length - 1]! + step);
  return ticks;
}

const compact = (n: number) => (n >= 100000 ? `${Math.round(n / 1000)}K` : n >= 1000 ? `${(n / 1000).toFixed(n % 1000 ? 1 : 0)}K` : String(n));

function Tip({ x, y, title, value }: { x: number; y: number; title: string; value: string }) {
  const w = Math.max(title.length, value.length) * 7 + 24;
  const left = Math.min(Math.max(x - w / 2, 4), W - w - 4);
  const top = Math.max(y - 54, 2);
  return (
    <g className="viz-tip" aria-hidden="true">
      <rect x={left} y={top} width={w} height={44} rx={8} />
      <text x={left + 12} y={top + 18} className="viz-tip-title">{title}</text>
      <text x={left + 12} y={top + 35} className="viz-tip-value">{value}</text>
    </g>
  );
}

function Table({ caption, points, valueLabel }: { caption: string; points: Point[]; valueLabel: string }) {
  return (
    <details className="viz-table">
      <summary>View as table</summary>
      <table>
        <caption className="sr-only">{caption}</caption>
        <thead><tr><th scope="col">Period</th><th scope="col">{valueLabel}</th></tr></thead>
        <tbody>{points.map((p) => <tr key={p.label}><td>{p.label}</td><td>{p.display}</td></tr>)}</tbody>
      </table>
    </details>
  );
}

/** Vertical columns from a zero baseline — magnitude per period. Labels only the tallest column. */
export function ColumnChart({ points, caption, valueLabel, format = compact }: { points: Point[]; caption: string; valueLabel: string; format?: (n: number) => string }) {
  const ticks = niceTicks(Math.max(...points.map((p) => p.value), 0));
  const top = ticks[ticks.length - 1]!;
  const y = (v: number) => PAD.top + PLOT_H - (v / top) * PLOT_H;
  const band = PLOT_W / points.length;
  const bw = Math.min(24, band * 0.5);
  const maxIndex = points.reduce((m, p, i) => (p.value > points[m]!.value ? i : m), 0);
  return (
    <figure className="viz">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={caption}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} className="viz-grid" />
            <text x={PAD.left - 10} y={y(t) + 4} textAnchor="end" className="viz-axis">{format(t)}</text>
          </g>
        ))}
        {points.map((p, i) => {
          const cx = PAD.left + band * i + band / 2;
          const h = Math.max(0, PLOT_H - (y(p.value) - PAD.top));
          const x0 = cx - bw / 2;
          const yTop = y(p.value);
          const r = Math.min(4, h);
          const d = h > 0 ? `M${x0},${PAD.top + PLOT_H} V${yTop + r} Q${x0},${yTop} ${x0 + r},${yTop} H${x0 + bw - r} Q${x0 + bw},${yTop} ${x0 + bw},${yTop + r} V${PAD.top + PLOT_H} Z` : "";
          return (
            <g key={p.label} className="viz-hit" tabIndex={0} aria-label={`${p.label}: ${p.display}`}>
              <rect x={PAD.left + band * i} y={PAD.top} width={band} height={PLOT_H} className="viz-band" />
              {d && <path d={d} className="viz-bar" />}
              <text x={cx} y={H - 10} textAnchor="middle" className="viz-axis">{p.label}</text>
              {i === maxIndex && p.value > 0 && <text x={cx} y={yTop - 8} textAnchor="middle" className="viz-label">{p.display}</text>}
              <Tip x={cx} y={yTop} title={p.label} value={p.display} />
            </g>
          );
        })}
        <line x1={PAD.left} x2={W - PAD.right} y1={PAD.top + PLOT_H} y2={PAD.top + PLOT_H} className="viz-baseline" />
      </svg>
      <Table caption={caption} points={points} valueLabel={valueLabel} />
    </figure>
  );
}

/** A 2px line over a fixed domain (e.g. ratings 1–5) with ringed markers and a value at the end. */
export function LineChart({ points, caption, valueLabel, min, max }: { points: Point[]; caption: string; valueLabel: string; min: number; max: number }) {
  const ticks = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  const y = (v: number) => PAD.top + PLOT_H - ((v - min) / (max - min)) * PLOT_H;
  const step = points.length > 1 ? PLOT_W / (points.length - 1) : 0;
  const x = (i: number) => (points.length > 1 ? PAD.left + step * i : PAD.left + PLOT_W / 2);
  const line = points.map((p, i) => `${i ? "L" : "M"}${x(i)},${y(p.value)}`).join(" ");
  const area = points.length > 1 ? `${line} L${x(points.length - 1)},${PAD.top + PLOT_H} L${x(0)},${PAD.top + PLOT_H} Z` : "";
  const last = points[points.length - 1];
  return (
    <figure className="viz">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={caption}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} className="viz-grid" />
            <text x={PAD.left - 10} y={y(t) + 4} textAnchor="end" className="viz-axis">{t}</text>
          </g>
        ))}
        {area && <path d={area} className="viz-area" />}
        {points.length > 1 && <path d={line} className="viz-line" />}
        {points.map((p, i) => (
          <g key={`${p.label}-${i}`} className="viz-hit" tabIndex={0} aria-label={`${p.label}: ${p.display}`}>
            <rect x={x(i) - Math.max(step, 24) / 2} y={PAD.top} width={Math.max(step, 24)} height={PLOT_H} className="viz-band" />
            <circle cx={x(i)} cy={y(p.value)} r={5} className="viz-dot" />
            {(i === 0 || i === points.length - 1 || points.length <= 6) && <text x={x(i)} y={H - 10} textAnchor="middle" className="viz-axis">{p.label}</text>}
            <Tip x={x(i)} y={y(p.value)} title={p.label} value={p.display} />
          </g>
        ))}
        {last && <text x={Math.min(x(points.length - 1), W - PAD.right - 4)} y={y(last.value) - 14} textAnchor="end" className="viz-label">{last.display}</text>}
      </svg>
      <Table caption={caption} points={points} valueLabel={valueLabel} />
    </figure>
  );
}
