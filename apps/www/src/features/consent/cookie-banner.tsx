import { Link } from '@tanstack/react-router';
import { X } from 'lucide-react';
import { type FC, useEffect, useId, useState } from 'react';
import {
  OPEN_PREFERENCES_EVENT,
  readConsent,
  saveConsent,
} from '~/lib/consent';

const FOCUS_RING =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure-radiance-700';

// Accept and reject share one style on purpose: refusing must be as easy and as
// visible as accepting.
const CHOICE_BUTTON = `inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-full bg-deep-blue-500 px-4.5 py-2 text-sm font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.15)] transition-colors hover:bg-deep-blue-600 sm:flex-none ${FOCUS_RING}`;

const SECONDARY_BUTTON = `inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-full border border-deep-blue-200 bg-white px-4.5 py-2 text-sm font-medium text-deep-blue-800 transition-colors hover:border-deep-blue-300 hover:text-deep-blue-900 sm:flex-none ${FOCUS_RING}`;

type View = 'hidden' | 'banner' | 'preferences';

type SwitchProps = {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Id of the element that names the switch. */
  labelledBy: string;
};

const Switch: FC<SwitchProps> = ({
  checked,
  onChange,
  disabled,
  labelledBy,
}) => (
  <button
    type='button'
    role='switch'
    aria-checked={checked}
    aria-labelledby={labelledBy}
    disabled={disabled}
    onClick={() => onChange?.(!checked)}
    className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
      checked ? 'bg-deep-blue-500' : 'bg-deep-blue-200'
    } ${FOCUS_RING}`}
  >
    <span
      aria-hidden='true'
      className={`inline-block size-5 rounded-full bg-white shadow-sm transition-transform ${
        checked ? 'translate-x-5.5' : 'translate-x-0.5'
      }`}
    />
  </button>
);

/**
 * Client-only: the site is prerendered, so the banner renders nothing on the
 * server and decides after hydration whether a choice is already stored.
 */
export const CookieBanner: FC = () => {
  const [view, setView] = useState<View>('hidden');
  const [analytics, setAnalytics] = useState(false);
  const titleId = useId();
  const analyticsId = useId();
  const necessaryId = useId();

  useEffect(() => {
    if (!readConsent()) setView('banner');

    const open = () => {
      setAnalytics(readConsent()?.analytics ?? false);
      setView('preferences');
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, open);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, open);
  }, []);

  if (view === 'hidden') return null;

  const choose = (value: boolean) => {
    saveConsent(value);
    setView('hidden');
  };

  return (
    <section
      aria-labelledby={titleId}
      className='fixed inset-x-3 bottom-3 z-[55] mx-auto max-w-xl rounded-2xl border border-deep-blue-200 bg-white p-5 text-deep-blue-800 shadow-lg shadow-deep-blue-900/10 sm:inset-x-6 sm:bottom-6'
    >
      <div className='flex items-start justify-between gap-4'>
        <h2
          id={titleId}
          className='font-semibold tracking-tight text-deep-blue-900'
        >
          {view === 'banner' ? 'Cookies on this site' : 'Cookie preferences'}
        </h2>
        {/* Closing without choosing counts as a refusal: only necessary storage is used. */}
        <button
          type='button'
          onClick={() => choose(false)}
          aria-label='Close and continue without accepting'
          className={`-m-1.5 rounded-full p-1.5 text-deep-blue-600 transition-colors hover:text-deep-blue-900 ${FOCUS_RING}`}
        >
          <X aria-hidden='true' size={18} />
        </button>
      </div>

      {view === 'banner' ? (
        <p className='mt-2 text-sm leading-relaxed'>
          I use only the storage this site needs to work, and, if you agree,
          Google Analytics to count visits and see which pages are read. Nothing
          is used for advertising. You can change your mind at any time from the
          footer. Details are in the{' '}
          <Link
            to='/policies/cookies-policy'
            className='text-azure-radiance-700 underline decoration-azure-radiance-300 underline-offset-4 hover:decoration-azure-radiance-700'
          >
            cookie policy
          </Link>
          .
        </p>
      ) : (
        <ul className='mt-3 grid gap-3 text-sm'>
          <li className='flex items-start justify-between gap-4'>
            <div>
              <p id={necessaryId} className='font-medium text-deep-blue-900'>
                Necessary
              </p>
              <p className='mt-0.5 leading-relaxed'>
                Remembers your theme and this choice. Always on.
              </p>
            </div>
            <Switch checked disabled labelledBy={necessaryId} />
          </li>
          <li className='flex items-start justify-between gap-4'>
            <div>
              <p id={analyticsId} className='font-medium text-deep-blue-900'>
                Analytics
              </p>
              <p className='mt-0.5 leading-relaxed'>
                Google Analytics, loaded through Google Tag Manager, to measure
                visits.
              </p>
            </div>
            <Switch
              checked={analytics}
              onChange={setAnalytics}
              labelledBy={analyticsId}
            />
          </li>
        </ul>
      )}

      <div className='mt-4 flex flex-wrap gap-2'>
        {view === 'banner' ? (
          <>
            <button
              type='button'
              onClick={() => choose(false)}
              className={CHOICE_BUTTON}
            >
              Reject all
            </button>
            <button
              type='button'
              onClick={() => choose(true)}
              className={CHOICE_BUTTON}
            >
              Accept all
            </button>
            <button
              type='button'
              onClick={() => setView('preferences')}
              className={SECONDARY_BUTTON}
            >
              Customize
            </button>
          </>
        ) : (
          <>
            <button
              type='button'
              onClick={() => choose(false)}
              className={CHOICE_BUTTON}
            >
              Reject all
            </button>
            <button
              type='button'
              onClick={() => choose(true)}
              className={CHOICE_BUTTON}
            >
              Accept all
            </button>
            <button
              type='button'
              onClick={() => choose(analytics)}
              className={SECONDARY_BUTTON}
            >
              Save choices
            </button>
          </>
        )}
      </div>
    </section>
  );
};
