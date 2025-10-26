import { defaultLocale, locales } from "@/config/i18n";

export const localizeHref = (locale: string, href: string): string => {
  if (href.startsWith('http')) return href;
  const cleanHref = href.replace(/\/+$/, '');
  const localized = locale === defaultLocale ? cleanHref : `/${locale}${cleanHref}`;
  return `${localized}/`;
};

const getFlagEmoji = (countryCode: string): string => {
  return countryCode
    .toUpperCase()
    .split('')
    .map(char => String.fromCodePoint(char.charCodeAt(0) + 127397))
    .join('');
};

export const getLocaleInfo = (locale: string): { name: string; emoji: string } | null => {
  const fullLocale = (locales as Record<string, string>)[locale];
  if (!fullLocale) return null;
  const countryCode = fullLocale.split('-')[1];
  if (!countryCode) return null;
  const displayNames = new Intl.DisplayNames([locale], { type: 'language' });
  const name = displayNames.of(locale);
  if (!name) return null;
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  const emoji = getFlagEmoji(countryCode);
  return { name: capitalizedName, emoji };
};
