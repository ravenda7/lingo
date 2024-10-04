import {Pathnames, LocalePrefix} from 'next-intl/routing';

export const locales = ["en", "jp"] as const;

export type Locales = typeof locales;

export const pathnames: Pathnames<Locales> = {
  '/': '/',
  '/pathnames': '/pathname',
}
export const localePrefix: LocalePrefix<Locales> = 'always';