import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { getMoneropediaEntries, processHTMLString } from "./moneropedia";
import type { MoneropediaEntry } from "./moneropedia";

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

const parse = (markdown: string, locale?: string): string => {
  let html = marked.parse(markdown) as string;
  const entries = locale ? moneropediaCache.get(locale) : undefined;
  if (entries) {
    html = processHTMLString(html, entries);
  }
  return DOMPurify.sanitize(html, purifyConfig);
};

const parseInline = (markdown: string, locale?: string): string => {
  let html = marked.parseInline(markdown, { breaks: true }) as string;
  const entries = locale ? moneropediaCache.get(locale) : undefined;
  if (entries) {
    html = processHTMLString(html, entries);
  }
  return DOMPurify.sanitize(html, purifyConfig);
};

export const createSafeMarkdown = (locale?: string) => {
  return {
    parse: (markdown: string) => parse(markdown, locale),
    parseInline: (markdown: string) => parseInline(markdown, locale),
  };
};

export default {
  initSafeMarkdown,
  createSafeMarkdown,
};
