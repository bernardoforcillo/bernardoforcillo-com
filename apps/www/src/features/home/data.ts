// Static home-page copy. Edit here; nothing below is driven by content.

export const STACK = [
  'Go',
  'TypeScript',
  'React',
  'Kubernetes',
  'Rust',
  'IoT',
] as const;

export const PRACTICE: { n: string; title: string; text: string }[] = [
  {
    n: '01',
    title: 'Research',
    text: 'Turning open questions into working prototypes.',
  },
  {
    n: '02',
    title: 'Infrastructure',
    text: 'Distributed systems and AI infrastructure.',
  },
  {
    n: '03',
    title: 'Products & hardware',
    text: 'The interface people touch, and the board under it.',
  },
  {
    n: '04',
    title: 'Hard problems',
    text: 'Open to ambitious deep-tech systems.',
  },
];

export const NOW: {
  when: string;
  title: string;
  text: string;
  current?: boolean;
}[] = [
  {
    when: 'Now',
    title: 'Ganiga Innovation',
    text: 'Building infrastructure and products.',
    current: true,
  },
];
