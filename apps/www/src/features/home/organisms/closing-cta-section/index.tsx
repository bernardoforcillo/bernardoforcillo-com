import { CONTACT_EMAIL } from '~/lib/seo';
import { BUTTON_PRIMARY } from '../../styles';

export const ClosingCtaSection = () => (
  <section className='mt-14 bg-[radial-gradient(ellipse_at_50%_120%,var(--color-azure-radiance-100),transparent_65%)] px-4 py-20 text-center'>
    <h2 className='text-[clamp(1.75rem,5vw,2.375rem)] font-semibold tracking-[-0.035em] text-deep-blue-900'>
      Got a hard problem worth building?
    </h2>
    <p className='mx-auto mb-6.5 mt-2.5 max-w-[460px] text-[15px] leading-[1.6] text-deep-blue-600'>
      Open to ambitious deep-tech systems and difficult technical problems.
    </p>
    <a href={`mailto:${CONTACT_EMAIL}`} className={BUTTON_PRIMARY}>
      {CONTACT_EMAIL}
    </a>
  </section>
);
