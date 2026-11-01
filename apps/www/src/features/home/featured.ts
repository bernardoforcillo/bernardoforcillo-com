/** The home page features at most `max` projects, newest first. */
export const featuredProjects = <T>(all: readonly T[], max = 3): readonly T[] =>
  all.slice(0, max);
