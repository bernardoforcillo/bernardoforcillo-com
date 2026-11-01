import { STACK } from '../../data';

// A 1px gap over a deep-blue-200 fill draws the cell rules at every column count.
export const StackStrip = () => (
  <ul
    aria-label='Stack'
    className='grid grid-cols-3 gap-px border-b border-deep-blue-200 bg-deep-blue-200 md:grid-cols-6'
  >
    {STACK.map((name) => (
      <li
        key={name}
        className='bg-white px-2 py-5.5 text-center text-sm font-semibold text-deep-blue-600'
      >
        {name}
      </li>
    ))}
  </ul>
);
