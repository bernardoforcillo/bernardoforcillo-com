import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async (params) => {
  const locale = 'en';
  return {
    locale,
    messages: (await import(`~/assets/messages/${locale}.json`)).default,
  };
});
