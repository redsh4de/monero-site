// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration";
import { defaultLocale, locales } from "./src/config/i18n";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://getmonero.org/",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  integrations: [
    i18n({
      locales,
      defaultLocale,
    }),
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
      filter: filterSitemapByDefaultLocale({ defaultLocale }),
    }),
  ],
});
