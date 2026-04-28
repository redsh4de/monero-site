import { locales } from "./config";

export const localeKeys = Object.keys(locales);
export const localeSet = new Set(localeKeys);
export const localePrefixRe = new RegExp(`^/(${localeKeys.join("|")})(?=/|$)`);
