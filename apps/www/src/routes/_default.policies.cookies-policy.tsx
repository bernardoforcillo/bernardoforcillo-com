import { PROSE_CLASS_NAME, PageHeader } from '@monorepo/components';
import { Link, createFileRoute } from '@tanstack/react-router';
import { Cookie } from 'lucide-react';
import { ARTICLE_CLASS } from '~/features/content/styles';
import { CONSENT_COOKIE, openConsentPreferences } from '~/lib/consent';
import { pageHead } from '~/lib/seo';

const DESCRIPTION =
  'Which cookies and similar technologies bernardoforcillo.com uses, why, for how long, and how to change your choice.';

export const Route = createFileRoute('/_default/policies/cookies-policy')({
  head: () =>
    pageHead({
      title: 'Cookie policy',
      description: DESCRIPTION,
      path: '/policies/cookies-policy',
    }),
  component: CookiesPolicyPage,
});

function CookiesPolicyPage() {
  return (
    <div className='relative'>
      <PageHeader
        icon={<Cookie className='size-7' />}
        title='Cookie policy'
        description='Last updated 23 November 2026'
      />

      <article className={ARTICLE_CLASS}>
        <div className={PROSE_CLASS_NAME}>
          <p>
            Cookies are small files a website stores in your browser; local
            storage works in a similar way. This page lists what this site
            stores, following the Italian Data Protection Authority&apos;s
            guidelines on cookies of 10 June 2021. Who processes the data and
            your rights are described in the{' '}
            <Link to='/policies/privacy-policy'>privacy policy</Link>.
          </p>

          <h2>Necessary</h2>
          <p>
            These make the site work as you asked and need no consent. They are
            not used to track you.
          </p>
          <div className='overflow-x-auto'>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>{CONSENT_COOKIE}</code>
                  </td>
                  <td>First-party cookie</td>
                  <td>Remembers your cookie choice and when you made it</td>
                  <td>6 months</td>
                </tr>
                <tr>
                  <td>
                    <code>theme</code>
                  </td>
                  <td>Local storage</td>
                  <td>Remembers whether you chose the light or dark theme</td>
                  <td>Until you clear it</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Analytics, only with your consent</h2>
          <p>
            If you accept analytics, the site loads Google Tag Manager, which
            runs Google Analytics 4. Google Analytics measures visits and pages
            read; it is not used for advertising, and advertising consent is
            always sent to Google as denied. If you refuse or close the banner,
            neither is loaded.
          </p>
          <div className='overflow-x-auto'>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Provider</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>_ga</code>
                  </td>
                  <td>Google Analytics (Google Ireland Limited)</td>
                  <td>Distinguishes visitors with a random identifier</td>
                  <td>2 years</td>
                </tr>
                <tr>
                  <td>
                    <code>_ga_&lt;ID&gt;</code>
                  </td>
                  <td>Google Analytics (Google Ireland Limited)</td>
                  <td>Keeps the state of the current session</td>
                  <td>2 years</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            How Google uses this data:{' '}
            <a
              href='https://policies.google.com/technologies/partner-sites'
              target='_blank'
              rel='noopener noreferrer'
            >
              How Google uses information from sites that use its services
            </a>
            .
          </p>

          <h2>Changing your choice</h2>
          <p>
            You can change or withdraw your consent at any time. Withdrawing it
            stops Google Analytics and deletes its cookies from this site. The
            banner asks again after 6 months, or sooner if the cookies used here
            change.
          </p>
          <p>
            <button
              type='button'
              onClick={openConsentPreferences}
              className='inline-flex items-center rounded-full bg-deep-blue-500 px-4.5 py-2 text-sm font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.15)] transition-colors hover:bg-deep-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure-radiance-700'
            >
              Change cookie preferences
            </button>
          </p>
          <p>
            You can also block or delete cookies in your browser settings.
            Blocking the necessary ones means the site cannot remember your
            theme or your choice.
          </p>
        </div>
      </article>
    </div>
  );
}
