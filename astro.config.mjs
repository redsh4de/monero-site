// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { defaultLocale, locales } from "./src/config/i18n";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://getmonero.org",
  integrations: [sitemap()],
  i18n: {
    defaultLocale,
    locales,
    routing: {
      prefixDefaultLocale: false
    }
  }
});
