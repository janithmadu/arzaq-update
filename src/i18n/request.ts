import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Await the requestLocale to resolve the promise
  const locale = await requestLocale;

  // Validate that the incoming `locale` is valid
  if (!locale || !routing.locales.includes(locale as "en" | "ar")) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
