import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async (params) => {
  let locale = params.locale || 'en';
  const supportedLocales = ['en', 'it'];
  if (!supportedLocales.includes(locale)) {
    locale = 'en';
  }
  return {
    locale,
    messages: (await import(`~/assets/messages/${locale}.json`)).default,
  };
});
