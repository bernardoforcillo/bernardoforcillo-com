/**
 * Runs after `/config.js` has defined `globalThis.__APP_CONFIG__`. In dev the
 * config is an empty frozen object and during prerender the script never
 * executes, so the optional chain no-ops and nothing is loaded from Google.
 */
export const GTM_BOOTSTRAP =
  '(function(){var id=globalThis.__APP_CONFIG__?.GTM_ID;if(!id)return;' +
  'window.dataLayer=window.dataLayer||[];' +
  "window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});" +
  "var f=document.getElementsByTagName('script')[0];" +
  "var j=document.createElement('script');j.async=true;" +
  "j.src='https://www.googletagmanager.com/gtm.js?id='+encodeURIComponent(id);" +
  'f.parentNode.insertBefore(j,f);})();';
