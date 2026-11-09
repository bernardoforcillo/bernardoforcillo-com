// Decorative: a loose bundle of curves rising left to right — ideas pulled
// through into something that holds its shape. Each strand gets its own
// spacing, lift and sway so the bundle reads as grown, not copy-pasted.
// Pure SVG, drawn in once by CSS.

// [vertical offset, extra lift, sway] per strand — hand-tuned, not random, so
// the server and client render the same paths.
const STRANDS: [number, number, number][] = [
  [0, 0, 0],
  [11, 8, -14],
  [19, 3, 10],
  [31, 14, -6],
  [40, 9, 18],
  [54, 20, -10],
  [61, 12, 6],
  [75, 26, -18],
  [88, 18, 12],
];

const LEAD = 4;

const path = ([dy, lift, sway]: [number, number, number]) => {
  const y = 296 + dy;
  const top = y - 150 - lift;
  return `M -20 ${y} C 130 ${y + sway * 0.4}, 210 ${top + sway}, 360 ${top + 12} S 560 ${top - 58 + sway}, 650 ${top - 70 + dy * 0.3}`;
};

export const FlowLines = () => (
  <svg
    aria-hidden='true'
    viewBox='0 0 620 420'
    fill='none'
    preserveAspectRatio='xMaxYMid slice'
    className='pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[62%] [mask-image:linear-gradient(90deg,transparent_10%,#000_55%)] md:block'
  >
    <defs>
      <linearGradient id='flow-stroke' x1='0' x2='1' y1='1' y2='0'>
        <stop offset='0' stopColor='var(--color-deep-blue-300)' />
        <stop offset='1' stopColor='var(--color-azure-radiance-500)' />
      </linearGradient>
    </defs>
    {STRANDS.map((strand, i) => (
      <path
        key={strand.join(',')}
        d={path(strand)}
        pathLength={1}
        stroke='url(#flow-stroke)'
        strokeWidth={i === LEAD ? 1.6 : 0.9}
        strokeLinecap='round'
        opacity={i === LEAD ? 0.9 : 0.2 + (1 - Math.abs(i - LEAD) / LEAD) * 0.4}
        className='animate-draw'
        style={{ animationDelay: `${120 + Math.abs(i - LEAD) * 110}ms` }}
      />
    ))}
  </svg>
);
