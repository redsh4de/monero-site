import { readFile } from "node:fs/promises";
import path from "node:path";

import fg from "fast-glob";
import matter from "gray-matter";

import { defaultLocale } from "../i18n/config";
import escapeStringRegexp from "escape-string-regexp";

const MONEROPEDIA_SUFFIXES = ["based", "like", "form"] as const;
export const MONEROPEDIA_LOOKAHEAD = `(${MONEROPEDIA_SUFFIXES.join("|")})`;
const MONEROPEDIA_ROOT = path.resolve(
  process.cwd(),
  "src",
  "content",
  "moneropedia",
);

export interface MoneropediaEntry {
  terms: string[];
  summary: string;
  fileName: string;
  locale: string;
}

export interface MoneropediaMatcher {
  regex: RegExp;
  lookup: Map<string, MoneropediaEntry>;
}

export function buildMoneropediaHref(entry: MoneropediaEntry): string {
  return `/resources/moneropedia/${entry.fileName.toLowerCase()}/`;
}

// Filename-keyed so loadMergedEntries can override defaults with translations.
const perLocaleCache = new Map<
  string,
  Promise<Map<string, MoneropediaEntry>>
>();
function loadLocaleEntries(
  locale: string,
): Promise<Map<string, MoneropediaEntry>> {
  const cached = perLocaleCache.get(locale);
  if (cached) return cached;

  const localeDir = path.join(MONEROPEDIA_ROOT, locale);

  const promise = (async () => {
    const files = await fg("**/*.md", {
      cwd: localeDir,
      onlyFiles: true,
      ignore: ["**/_*/**", "**/_*"],
    });

    const entries = await Promise.all(
      files.map(async (relativePath) => {
        const filePath = path.join(localeDir, relativePath);
        const { data } = matter(await readFile(filePath, "utf-8"));
        const fileName = path.basename(filePath, path.extname(filePath));

        return {
          fileName,
          locale,
          summary: typeof data?.summary === "string" ? data.summary : "",
          terms: Array.isArray(data?.terms)
            ? data.terms.map((term) => String(term))
            : [],
        } satisfies MoneropediaEntry;
      }),
    );

    return new Map(entries.map((entry) => [entry.fileName, entry]));
  })();

  perLocaleCache.set(locale, promise);
  return promise;
}

async function loadMergedEntries(locale: string): Promise<MoneropediaEntry[]> {
  if (locale === defaultLocale) {
    return Array.from((await loadLocaleEntries(defaultLocale)).values());
  }

  const [fallback, current] = await Promise.all([
    loadLocaleEntries(defaultLocale),
    loadLocaleEntries(locale),
  ]);
  const merged = new Map(fallback);
  for (const [file, entry] of current) merged.set(file, entry);
  return Array.from(merged.values());
}

const mergedCache = new Map<string, Promise<MoneropediaEntry[]>>();
const mergedResolved = new Map<string, MoneropediaEntry[]>();
export function getMoneropediaEntries(
  locale: string,
): Promise<MoneropediaEntry[]> {
  const cached = mergedCache.get(locale);
  if (cached) return cached;
  const promise = loadMergedEntries(locale).then((entries) => {
    mergedResolved.set(locale, entries);
    return entries;
  });
  mergedCache.set(locale, promise);

  return promise;
}
function getCachedEntries(locale: string): MoneropediaEntry[] | undefined {
  return mergedResolved.get(locale);
}

const matcherCache = new Map<string, MoneropediaMatcher | null>();
export async function getMoneropediaMatcher(
  locale: string,
): Promise<MoneropediaMatcher | null> {
  if (matcherCache.has(locale)) return matcherCache.get(locale)!;
  const entries = await getMoneropediaEntries(locale);
  const matcher = buildMoneropediaMatcher(entries);
  matcherCache.set(locale, matcher);
  return matcher;
}

// Builds a regex + lookup map for scanning text. The regex matches any
// `@term` mention while the lookup tells us which entry it belongs to.
export function buildMoneropediaMatcher(
  entries: MoneropediaEntry[],
): MoneropediaMatcher | null {
  if (!entries.length) return null;

  const lookup = new Map<string, MoneropediaEntry>();
  const patterns: string[] = [];

  for (const entry of entries) {
    for (const term of entry.terms) {
      const key = term.toLowerCase();
      if (lookup.has(key)) continue;
      lookup.set(key, entry);
      patterns.push(escapeStringRegexp(term));
    }
  }

  if (!patterns.length) return null;

  const pattern = `@(${patterns.join("|")})((?=-${MONEROPEDIA_LOOKAHEAD})|(?![\\w-]))`;
  return { regex: new RegExp(pattern, "gi"), lookup };
}

// Rewrites plain HTML by replacing `@term` mentions with Moneropedia links.
// Useful for content that goes outside the Astro Content Collection pipeline (e.g., strings pulled
// from i18n JSON files) but still needs the same linking behavior.
export function processHTMLString(html: string, locale: string): string {
  const matcher = getCachedMoneropediaMatcher(locale);
  if (!matcher) return html;

  return html.replace(matcher.regex, (match, term) => {
    const displayText = match.slice(1).replace(/-/g, " ");
    const entry = term && matcher.lookup.get(term.toLowerCase());
    if (!entry) return displayText;

    const linkPath = buildMoneropediaHref(entry);
    const escapedSummary = entry.summary.replace(/"/g, "&quot;");

    return `<a class="moneropedia-link" data-tooltip="${escapedSummary}" href="${linkPath}">${displayText}<sup>&#x1F6C8;</sup></a>`;
  });
}

function getCachedMoneropediaMatcher(
  locale: string,
): MoneropediaMatcher | null | undefined {
  if (matcherCache.has(locale)) return matcherCache.get(locale);
  const entries = getCachedEntries(locale);
  if (!entries) return undefined;
  const matcher = buildMoneropediaMatcher(entries);
  matcherCache.set(locale, matcher);
  return matcher;
}
