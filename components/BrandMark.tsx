import Icon from "./Icon";

/** The FindRight mark (ring + check). `/brand/logo-full.svg` holds the full lockup with the wordmark. */
export const BRAND_LOGO = "/brand/logo-mark.svg";

export default function BrandMark({ size = 18 }: { size?: number }) {
  return BRAND_LOGO
    ? <img src={BRAND_LOGO} alt="" height={size} width={Math.round((size * 456) / 320)} style={{ objectFit: "contain" }} />
    : <Icon name="check" size={size} />;
}
