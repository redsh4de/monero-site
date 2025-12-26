import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { getMoneropediaEntries, processHTMLString } from "./moneropedia";
import type { MoneropediaEntry } from "./moneropedia";
import { defaultLocale } from "@/i18n/config";

const purifyConfig = {
  ALLOWED_ATTR: [
    "href",
    "target",
    "rel",
    "class",
    "id",
    "title",
    "alt",
    "src",
    "width",
    "height",
    "style",
    "data-tooltip",
  ],
};

const moneropediaCache = new Map<string, MoneropediaEntry[]>();

export const initSafeMarkdown = async (locale: string): Promise<void> => {
  if (!locale || moneropediaCache.has(locale)) return;
  const entries = await getMoneropediaEntries(locale);
  moneropediaCache.set(locale, entries);
};

export const parse = (markdown: string, locale?: string): string => {
  let html = marked.parse(markdown) as string;
  const entries = locale ? moneropediaCache.get(locale) : undefined;
  if (entries && locale) {
    html = processHTMLString(html, entries, locale);
  }
  return DOMPurify.sanitize(html, purifyConfig);
};

export const parseInline = (markdown: string, locale?: string): string => {
  let html = marked.parseInline(markdown, { breaks: true }) as string;
  const entries = locale ? moneropediaCache.get(locale) : undefined;
  if (entries && locale) {
    html = processHTMLString(html, entries, locale);
  }
  return DOMPurify.sanitize(html, purifyConfig);
};

export default {
  initSafeMarkdown,
  parse,
  parseInline,
};
