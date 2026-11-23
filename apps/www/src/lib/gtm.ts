import { CONSENT_COOKIE, CONSENT_VERSION } from './consent';

/**
 * Runs after `/config.js` has defined `globalThis.__APP_CONFIG__`, before the
 * app hydrates. It sets Consent Mode v2 defaults to denied, then loads Google
 * Tag Manager only if a stored choice of the current version grants analytics.
 * Visitors who have not chosen yet load nothing from Google; the banner loads
 * the container later through `saveConsent`.
 *
 * In dev the config is an empty frozen object and during prerender the script
 * never executes, so the container is never requested there.
 */
export const GTM_BOOTSTRAP = [
  // The router can run head scripts again on client navigation: run once.
  '(function(){var w=window;if(w.__consentBootstrap)return;w.__consentBootstrap=1;',
  'w.dataLayer=w.dataLayer||[];',
  'w.gtag=function(){w.dataLayer.push(arguments)};',
  "w.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',",
  "ad_user_data:'denied',ad_personalization:'denied',functionality_storage:'granted',",
  "security_storage:'granted',wait_for_update:500});",
  `var c=null;try{var m=document.cookie.match(/(?:^|; )${CONSENT_COOKIE}=([^;]*)/);`,
  'if(m)c=JSON.parse(decodeURIComponent(m[1]))}catch(e){}',
  `if(!c||c.v!==${CONSENT_VERSION}||c.a!==1)return;`,
  "w.gtag('consent','update',{analytics_storage:'granted'});",
  "var id=globalThis.__APP_CONFIG__&&globalThis.__APP_CONFIG__.GTM_ID;if(!id||document.getElementById('gtm-script'))return;",
  "w.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});",
  "var j=document.createElement('script');j.id='gtm-script';j.async=true;",
  "j.src='https://www.googletagmanager.com/gtm.js?id='+encodeURIComponent(id);",
  'document.head.appendChild(j);})();',
].join('');
