import type { CollectionEntry } from "astro:content";

import { getLocalizedCollection } from "@/i18n/utils";

export const idToDateSlug = (id: string): string =>
  id.replace(
    /^(\d{4})-(\d{1,2})-(\d{1,2})-/,
    (_match, year, month, day) =>
      `${year}/${month.padStart(2, "0")}/${day.padStart(2, "0")}/`,
  );

export const getDateStringFromId = (id: string): string | undefined => {
  const m = id.match(/^(\d{4})\/(\d{2})\/(\d{2})/);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : undefined;
};

// Returns all blog posts, replaced with its translation when available.
const blogCache = new Map<string, Promise<CollectionEntry<"blog">[]>>();
export const getLocalizedBlog = (locale: string) => {
  const cached = blogCache.get(locale);
  if (cached) return cached;
  const promise = getLocalizedCollection("blog", locale).then((entries) =>
    entries.sort((a, b) => b.id.localeCompare(a.id)),
  );
  blogCache.set(locale, promise);
  return promise;
};
