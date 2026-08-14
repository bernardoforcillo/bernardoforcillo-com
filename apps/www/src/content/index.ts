import { allNotes, allPosts, allProjects } from 'content-collections';
import { byDateDesc, countByCategory } from './lib';

export type Post = (typeof allPosts)[number];
export type Note = (typeof allNotes)[number];
export type Project = (typeof allProjects)[number];

// Sorted once at module scope. Every array here is read-only in practice:
// prerender runs fourteen pages in one Node process, so mutable module state
// would leak across pages.
export const blogPosts: readonly Post[] = [...allPosts].sort(byDateDesc);
export const notes: readonly Note[] = [...allNotes].sort(byDateDesc);
export const projects: readonly Project[] = [...allProjects].sort(byDateDesc);

export const blogCategories = countByCategory(blogPosts);

export const postsByCategory = (categorySlug: string) =>
  blogPosts.filter((post) => post.categorySlug === categorySlug);

export const findPost = (categorySlug: string, postSlug: string) =>
  blogPosts.find(
    (post) => post.categorySlug === categorySlug && post.postSlug === postSlug,
  );

export const findNote = (noteSlug: string) =>
  notes.find((note) => note.noteSlug === noteSlug);

export const findProject = (projectSlug: string) =>
  projects.find((project) => project.projectSlug === projectSlug);
