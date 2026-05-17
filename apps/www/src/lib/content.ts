import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

type Frontmatter = Record<string, unknown>;

type BaseContent = {
  title: string;
  description: string;
  date: string;
  content: string;
};

export type BlogPost = BaseContent & {
  categorySlug: string;
  postSlug: string;
  tags: string[];
};

export type Note = BaseContent & {
  noteSlug: string;
};

export type Project = BaseContent & {
  projectSlug: string;
  stack: string[];
  repoUrl?: string;
  demoUrl?: string;
};

const CONTENT_ROOT = path.join(process.cwd(), 'content');

const parseDate = (value: string) => new Date(value).getTime();

const sortByDateDesc = <T extends { date: string }>(entries: T[]) => {
  return entries.sort((a, b) => parseDate(b.date) - parseDate(a.date));
};

const ensureString = (
  value: unknown,
  fallback: string,
  label: string,
  filePath: string,
) => {
  if (typeof value === 'string' && value.trim().length > 0) {
    return value;
  }

  return fallback || `${label} missing in ${filePath}`;
};

const ensureStringArray = (value: unknown) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === 'string');
};

const stripMarkdownExtension = (filename: string) => {
  return filename.replace(/\.mdx?$/i, '');
};

const readMarkdownFile = async (filePath: string) => {
  const raw = await fs.readFile(filePath, 'utf8');
  const parsed = matter(raw);

  return {
    data: parsed.data as Frontmatter,
    content: parsed.content,
  };
};

const readDirSafe = async (dirPath: string) => {
  try {
    return await fs.readdir(dirPath, { withFileTypes: true });
  } catch {
    return [];
  }
};

const findMarkdownFileBySlug = async (dirPath: string, slug: string) => {
  const mdPath = path.join(dirPath, `${slug}.md`);
  const mdxPath = path.join(dirPath, `${slug}.mdx`);

  try {
    await fs.access(mdPath);
    return mdPath;
  } catch {
    try {
      await fs.access(mdxPath);
      return mdxPath;
    } catch {
      return null;
    }
  }
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const blogRoot = path.join(CONTENT_ROOT, 'blog');
  const categoryDirs = await readDirSafe(blogRoot);
  const posts: BlogPost[] = [];

  for (const categoryDir of categoryDirs) {
    if (!categoryDir.isDirectory()) {
      continue;
    }

    const categorySlug = categoryDir.name;
    const categoryPath = path.join(blogRoot, categorySlug);
    const files = await readDirSafe(categoryPath);

    for (const file of files) {
      if (!file.isFile() || !/\.mdx?$/i.test(file.name)) {
        continue;
      }

      const postSlug = stripMarkdownExtension(file.name);
      const filePath = path.join(categoryPath, file.name);
      const { data, content } = await readMarkdownFile(filePath);

      posts.push({
        categorySlug,
        postSlug,
        title: ensureString(data.title, postSlug, 'title', filePath),
        description: ensureString(
          data.description,
          '',
          'description',
          filePath,
        ),
        date: ensureString(
          data.date,
          new Date().toISOString(),
          'date',
          filePath,
        ),
        tags: ensureStringArray(data.tags),
        content,
      });
    }
  }

  return sortByDateDesc(posts);
};

export const getBlogCategories = async () => {
  const posts = await getBlogPosts();
  const byCategory = new Map<string, number>();

  for (const post of posts) {
    byCategory.set(
      post.categorySlug,
      (byCategory.get(post.categorySlug) || 0) + 1,
    );
  }

  return [...byCategory.entries()]
    .map(([categorySlug, count]) => ({ categorySlug, count }))
    .sort((a, b) => a.categorySlug.localeCompare(b.categorySlug));
};

export const getBlogPostBySlug = async (
  categorySlug: string,
  postSlug: string,
) => {
  const directoryPath = path.join(CONTENT_ROOT, 'blog', categorySlug);
  const filePath = await findMarkdownFileBySlug(directoryPath, postSlug);

  if (!filePath) {
    return null;
  }

  try {
    const { data, content } = await readMarkdownFile(filePath);
    return {
      categorySlug,
      postSlug,
      title: ensureString(data.title, postSlug, 'title', filePath),
      description: ensureString(data.description, '', 'description', filePath),
      date: ensureString(data.date, new Date().toISOString(), 'date', filePath),
      tags: ensureStringArray(data.tags),
      content,
    } satisfies BlogPost;
  } catch {
    return null;
  }
};

export const getNotes = async (): Promise<Note[]> => {
  const notesRoot = path.join(CONTENT_ROOT, 'notes');
  const files = await readDirSafe(notesRoot);
  const notes: Note[] = [];

  for (const file of files) {
    if (!file.isFile() || !/\.mdx?$/i.test(file.name)) {
      continue;
    }

    const noteSlug = stripMarkdownExtension(file.name);
    const filePath = path.join(notesRoot, file.name);
    const { data, content } = await readMarkdownFile(filePath);

    notes.push({
      noteSlug,
      title: ensureString(data.title, noteSlug, 'title', filePath),
      description: ensureString(data.description, '', 'description', filePath),
      date: ensureString(data.date, new Date().toISOString(), 'date', filePath),
      content,
    });
  }

  return sortByDateDesc(notes);
};

export const getNoteBySlug = async (noteSlug: string) => {
  const directoryPath = path.join(CONTENT_ROOT, 'notes');
  const filePath = await findMarkdownFileBySlug(directoryPath, noteSlug);

  if (!filePath) {
    return null;
  }

  try {
    const { data, content } = await readMarkdownFile(filePath);
    return {
      noteSlug,
      title: ensureString(data.title, noteSlug, 'title', filePath),
      description: ensureString(data.description, '', 'description', filePath),
      date: ensureString(data.date, new Date().toISOString(), 'date', filePath),
      content,
    } satisfies Note;
  } catch {
    return null;
  }
};

export const getProjects = async (): Promise<Project[]> => {
  const projectsRoot = path.join(CONTENT_ROOT, 'projects');
  const files = await readDirSafe(projectsRoot);
  const projects: Project[] = [];

  for (const file of files) {
    if (!file.isFile() || !/\.mdx?$/i.test(file.name)) {
      continue;
    }

    const projectSlug = stripMarkdownExtension(file.name);
    const filePath = path.join(projectsRoot, file.name);
    const { data, content } = await readMarkdownFile(filePath);

    projects.push({
      projectSlug,
      title: ensureString(data.title, projectSlug, 'title', filePath),
      description: ensureString(data.description, '', 'description', filePath),
      date: ensureString(data.date, new Date().toISOString(), 'date', filePath),
      stack: ensureStringArray(data.stack),
      repoUrl: typeof data.repoUrl === 'string' ? data.repoUrl : undefined,
      demoUrl: typeof data.demoUrl === 'string' ? data.demoUrl : undefined,
      content,
    });
  }

  return sortByDateDesc(projects);
};

export const getProjectBySlug = async (projectSlug: string) => {
  const directoryPath = path.join(CONTENT_ROOT, 'projects');
  const filePath = await findMarkdownFileBySlug(directoryPath, projectSlug);

  if (!filePath) {
    return null;
  }

  try {
    const { data, content } = await readMarkdownFile(filePath);
    return {
      projectSlug,
      title: ensureString(data.title, projectSlug, 'title', filePath),
      description: ensureString(data.description, '', 'description', filePath),
      date: ensureString(data.date, new Date().toISOString(), 'date', filePath),
      stack: ensureStringArray(data.stack),
      repoUrl: typeof data.repoUrl === 'string' ? data.repoUrl : undefined,
      demoUrl: typeof data.demoUrl === 'string' ? data.demoUrl : undefined,
      content,
    } satisfies Project;
  } catch {
    return null;
  }
};
