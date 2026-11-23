import { PROSE_CLASS_NAME, PageHeader } from '@monorepo/components';
import { Link, createFileRoute } from '@tanstack/react-router';
import { Shield } from 'lucide-react';
import { ARTICLE_CLASS } from '~/features/content/styles';
import { CONTACT_EMAIL, pageHead } from '~/lib/seo';

const DESCRIPTION =
  'Who processes personal data on bernardoforcillo.com, what data, why, for how long, and your rights.';

export const Route = createFileRoute('/_default/policies/privacy-policy')({
  head: () =>
    pageHead({
      title: 'Privacy policy',
      description: DESCRIPTION,
      path: '/policies/privacy-policy',
    }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <div className='relative'>
      <PageHeader
        icon={<Shield className='size-7' />}
        title='Privacy policy'
        description='Last updated 23 November 2026'
      />

      <article className={ARTICLE_CLASS}>
        <div className={PROSE_CLASS_NAME}>
          <p>
            This policy explains how personal data is processed when you visit
            bernardoforcillo.com, under the EU General Data Protection
            Regulation (GDPR, Regulation (EU) 2016/679) and the Italian Personal
            Data Protection Code (Legislative Decree 196/2003).
          </p>

          <h2>Data controller</h2>
          <p>
            Bernardo Forcillo, Italy. Contact:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>

          <h2>What data, why, and on what basis</h2>
          <div className='overflow-x-auto'>
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Purpose</th>
                  <th>Legal basis</th>
                  <th>Retention</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Technical request data: IP address, browser, page requested,
                    date and time
                  </td>
                  <td>
                    Serving the site, keeping it secure, investigating errors
                    and abuse
                  </td>
                  <td>Legitimate interest (Art. 6(1)(f) GDPR)</td>
                  <td>
                    30 days in the hosting provider&apos;s request logs, then
                    deleted
                  </td>
                </tr>
                <tr>
                  <td>
                    Usage data collected by Google Analytics: pages viewed,
                    approximate location, device and browser, a pseudonymous
                    identifier
                  </td>
                  <td>
                    Counting visits and understanding which content is read
                  </td>
                  <td>
                    Your consent (Art. 6(1)(a) GDPR and Art. 122 of the Code)
                  </td>
                  <td>
                    2 months in Google Analytics; the cookies themselves last up
                    to 2 years
                  </td>
                </tr>
                <tr>
                  <td>
                    What you write when you email me: address, name, message
                  </td>
                  <td>Replying, and any follow-up you ask for</td>
                  <td>
                    Steps taken at your request (Art. 6(1)(b)) or legitimate
                    interest in answering (Art. 6(1)(f))
                  </td>
                  <td>
                    As long as the conversation is useful, and no longer than
                    needed for any legal obligation
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Google Analytics runs only if you accept analytics in the cookie
            banner. Until then, Google Tag Manager and Google Analytics are not
            loaded at all. Data is not used for advertising, profiling or
            automated decisions, and is not sold.
          </p>

          <h2>Who receives the data</h2>
          <ul>
            <li>
              <strong>Google Ireland Limited</strong>, Gordon House, Barrow
              Street, Dublin 4, Ireland, which provides Google Tag Manager and
              Google Analytics as a processor. Google may process data in the
              United States; Google LLC is certified under the EU-U.S. Data
              Privacy Framework, which the European Commission found adequate in
              its decision of 10 July 2023. See{' '}
              <a
                href='https://business.safety.google/privacy/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Google&apos;s privacy information for business
              </a>
              .
            </li>
            <li>
              <strong>Google Cloud EMEA Limited</strong>, Velasco, Clanwilliam
              Place, Dublin 2, Ireland, which hosts the site as a processor. The
              site runs on Google Cloud Run in the europe-west1 region
              (Belgium), and the technical request data is kept in Google Cloud
              Logging. Google may access it from outside the EU under the same
              safeguards described above.
            </li>
            <li>
              The provider of the email service, only as far as needed to
              deliver and store messages.
            </li>
          </ul>

          <h2>Your rights</h2>
          <p>
            You can ask for access to your data, its correction or erasure,
            restriction of processing, data portability, and you can object to
            processing based on legitimate interest (Articles 15 to 21 GDPR).
            Where processing is based on consent, you can withdraw it at any
            time, without affecting what was done before: for analytics, use{' '}
            <strong>Cookie preferences</strong> in the footer. To exercise your
            rights, email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
          <p>
            You can also lodge a complaint with the Italian Data Protection
            Authority, the{' '}
            <a
              href='https://www.garanteprivacy.it'
              target='_blank'
              rel='noopener noreferrer'
            >
              Garante per la protezione dei dati personali
            </a>
            , or with the authority of the EU country where you live or work.
          </p>

          <h2>Cookies</h2>
          <p>
            The cookies and similar technologies used on this site are listed in
            the <Link to='/policies/cookies-policy'>cookie policy</Link>.
          </p>

          <h2>Changes</h2>
          <p>
            If this policy changes, the new version is published on this page
            with a new date. If the change affects analytics, the cookie banner
            asks for your choice again.
          </p>
        </div>
      </article>
    </div>
  );
}
