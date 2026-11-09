import type { FC } from 'react';

type Props = { text: string };

// Width of the drawing; the SVG scales to the column, so the name always runs
// edge to edge at any viewport without a font-size breakpoint.
const W = 1000;
const H = 134;
const BASELINE = 116;
// Inter ExtraBold sets "Bernardo Forcillo" ~1100 units wide at 150px; 132px
// keeps the natural width under the 992 slot, so `textLength` only ever
// opens the spacing and never squeezes glyphs into each other.
const FONT_SIZE_CLASS = 'text-[132px]';

// Strands of the hero's flowing lines, continued inside the letters. They
// share one slow wave whose phase drifts a little per strand, so they run
// together like contour lines instead of crossing. Fixed maths: server and
// client render identical paths.
const STRANDS = Array.from({ length: 30 }, (_, i) => {
  const y = 2 + i * 4.6;
  const amp = 9 + Math.sin(i / 4) * 3;
  const phase = i * 0.06;
  const at = (x: number) => (y + Math.sin(x / 190 + phase) * amp).toFixed(1);
  return `M -10 ${at(-10)} C 240 ${at(240)}, 420 ${at(420)}, 560 ${at(560)} S 860 ${at(860)}, 1010 ${at(1010)}`;
});

/**
 * The footer's signature: the name set across the full column, its letters
 * filled with flowing strands rather than flat colour, held by a hairline
 * outline and dissolving toward the bottom edge.
 *
 * Fixed ids are safe: the footer renders once per page.
 */
export const Wordmark: FC<Props> = ({ text }) => (
  <svg
    aria-hidden='true'
    viewBox={`0 0 ${W} ${H}`}
    className='block h-auto w-full select-none'
  >
    <defs>
      <clipPath id='wordmark-letters'>
        <text
          x={W / 2}
          y={BASELINE}
          textAnchor='middle'
          textLength={W - 8}
          lengthAdjust='spacing'
          className={`fill-current ${FONT_SIZE_CLASS} font-extrabold tracking-[-0.045em]`}
        >
          {text}
        </text>
      </clipPath>
      <linearGradient id='wordmark-strand' x1='0' x2='1' y1='0' y2='0'>
        <stop offset='0' stopColor='var(--color-deep-blue-300)' />
        <stop offset='0.55' stopColor='var(--color-azure-radiance-500)' />
        <stop offset='1' stopColor='var(--color-azure-radiance-300)' />
      </linearGradient>
      <linearGradient id='wordmark-fade' x1='0' x2='0' y1='0' y2='1'>
        <stop offset='0.35' stopColor='#fff' />
        <stop offset='1' stopColor='#fff' stopOpacity='0.05' />
      </linearGradient>
      <mask id='wordmark-dissolve'>
        <rect width={W} height={H} fill='url(#wordmark-fade)' />
      </mask>
    </defs>

    <g mask='url(#wordmark-dissolve)'>
      {/* A faint body so the letters read even between strands. */}
      <g clipPath='url(#wordmark-letters)'>
        <rect width={W} height={H} className='fill-azure-radiance-50' />
        {STRANDS.map((d) => (
          <path
            key={d}
            d={d}
            fill='none'
            stroke='url(#wordmark-strand)'
            strokeWidth={1.1}
            strokeLinecap='round'
          />
        ))}
      </g>
      <text
        x={W / 2}
        y={BASELINE}
        textAnchor='middle'
        textLength={W - 8}
        lengthAdjust='spacing'
        fill='none'
        strokeWidth={1}
        className={`stroke-azure-radiance-400/45 ${FONT_SIZE_CLASS} font-extrabold tracking-[-0.045em]`}
      >
        {text}
      </text>
    </g>
  </svg>
);
