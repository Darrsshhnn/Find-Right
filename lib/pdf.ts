/**
 * Minimal PDF writer (Helvetica, text, lines, filled boxes, multiple pages) so receipts and agreements
 * need no dependency. Coordinates are in points from the bottom-left of an A4 page (595 × 842).
 */
type RGB = [number, number, number];

const ascii = (s: string) =>
  s.replace(/₹/g, "INR ").replace(/[–—]/g, "-").replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/·/g, "-").replace(/…/g, "...").replace(/→/g, "->").replace(/[^\x20-\x7e]/g, "");
const esc = (s: string) => ascii(s).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
/** Approximate Helvetica advance width (average 0.52em) used for alignment and wrapping. */
const width = (s: string, size: number) => ascii(s).length * size * 0.52;

export class PdfPage {
  private ops: string[] = [];

  text(x: number, y: number, value: string, { size = 11, bold = false, color = [0.07, 0.04, 0.12] as RGB, align = "left" as "left" | "right" } = {}) {
    const dx = align === "right" ? width(value, size) : 0;
    this.ops.push(`BT /${bold ? "F2" : "F1"} ${size} Tf ${color.join(" ")} rg ${(x - dx).toFixed(1)} ${y.toFixed(1)} Td (${esc(value)}) Tj ET`);
    return this;
  }

  line(x1: number, y1: number, x2: number, y2: number, color: RGB = [0.9, 0.88, 0.94]) {
    this.ops.push(`${color.join(" ")} RG 1 w ${x1} ${y1} m ${x2} ${y2} l S`);
    return this;
  }

  box(x: number, y: number, w: number, h: number, color: RGB) {
    this.ops.push(`${color.join(" ")} rg ${x} ${y} ${w} ${h} re f`);
    return this;
  }

  content() { return this.ops.join("\n"); }

  toBuffer() { return pdfFromPages([this]); }
}

export function wrap(text: string, size: number, maxWidth: number) {
  const words = ascii(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (width(next, size) > maxWidth && line) { lines.push(line); line = word; } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

/** Flowing multi-page document with a cursor; adds pages automatically. */
export class PdfDoc {
  pages: PdfPage[] = [];
  page!: PdfPage;
  y = 0;
  readonly left = 56;
  readonly right = 539;

  constructor(private onPage?: (page: PdfPage, n: number) => number) { this.addPage(); }

  addPage() {
    this.page = new PdfPage();
    this.pages.push(this.page);
    this.y = this.onPage ? this.onPage(this.page, this.pages.length) : 786;
  }

  ensure(space: number) { if (this.y - space < 64) this.addPage(); }

  paragraph(text: string, { size = 10.5, bold = false, color, indent = 0, gap = 6 }: { size?: number; bold?: boolean; color?: RGB; indent?: number; gap?: number } = {}) {
    const lines = wrap(text, size, this.right - this.left - indent);
    for (const l of lines) {
      this.ensure(size + 4);
      this.page.text(this.left + indent, this.y, l, { size, bold, color });
      this.y -= size + 4;
    }
    this.y -= gap;
  }

  toBuffer() { return pdfFromPages(this.pages); }
}

function pdfFromPages(pages: PdfPage[]) {
  const n = pages.length;
  // Object numbers: 1 catalog, 2 pages, 3 F1, 4 F2, then (page, content) pairs.
  const objects: string[] = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    `<< /Type /Pages /Kids [${pages.map((_, i) => `${5 + i * 2} 0 R`).join(" ")}] /Count ${n} >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  ];
  pages.forEach((p, i) => {
    const content = p.content();
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${6 + i * 2} 0 R >>`);
    objects.push(`<< /Length ${Buffer.byteLength(content, "latin1")} >>\nstream\n${content}\nendstream`);
  });
  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((body, i) => {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xref = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.map((o) => `${String(o).padStart(10, "0")} 00000 n \n`).join("")}`;
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(pdf, "latin1");
}
