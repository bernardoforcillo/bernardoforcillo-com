// Static home-page copy. Edit here; nothing below is driven by content.

export const STACK = [
  'Go',
  'TypeScript',
  'React',
  'Kubernetes',
  'Rust',
  'IoT',
] as const;

// Not a sequence: four sides of one practice, so no numbering.
export const PRACTICE: {
  key: 'research' | 'infrastructure' | 'products' | 'problems';
  title: string;
  text: string;
}[] = [
  {
    key: 'research',
    title: 'Research',
    text: 'Turning open questions into working prototypes.',
  },
  {
    key: 'infrastructure',
    title: 'Infrastructure',
    text: 'Distributed systems and AI infrastructure.',
  },
  {
    key: 'products',
    title: 'Products & hardware',
    text: 'The interface people touch, and the board under it.',
  },
  {
    key: 'problems',
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
