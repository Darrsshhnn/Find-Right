import Icon from "./Icon";

/**
 * Single source for the FindRight logo mark (header, sidebar, intro animation).
 * To use the official logo: save it as public/brand/logo.svg (or .png) and set BRAND_LOGO to its path.
 */
export const BRAND_LOGO = "";

export default function BrandMark({ size = 18 }: { size?: number }) {
  return BRAND_LOGO ? <img src={BRAND_LOGO} alt="" width={size} height={size} /> : <Icon name="check" size={size} />;
}
