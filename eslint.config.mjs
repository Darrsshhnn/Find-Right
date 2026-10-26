import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Images are local assets and user uploads served from our own API; next/image adds no value here.
      "@next/next/no-img-element": "off",
    },
  },
  { ignores: [".next/**", "node_modules/**", ".figma/**", ".figaro/**", "data/**", "next-env.d.ts"] },
];

export default config;
