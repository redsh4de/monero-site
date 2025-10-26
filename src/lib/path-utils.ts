import { defaultLocale } from "../config/i18n";

export function generatePaths(locales: string[]) {
  function keyToPath(key: string) {
    let s = key.replace(/^\/src\/views\//, "").replace(/\.astro$/, "");
    return s == "index" ? undefined : s;
  }

  // Use an eager glob to enumerate files at build time
  const fileMap = import.meta.glob("/src/views/**/[!_]*.astro", { eager: true });
  const keys = Object.keys(fileMap);

  const paths: Array<{
    params: { lang?: string; path?: string };
    props: { viewKey: string; lang: string };
  }> = [];

  for (const key of keys) {
    for (const locale of locales) {
      const pathParam = keyToPath(key);
      const params = locale === defaultLocale ? { path: pathParam } : { lang: locale, path: pathParam };
      paths.push({
        params,
        props: { viewKey: key, lang: locale },
      });
    }
  }

  return paths;
}