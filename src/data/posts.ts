import { getCollection, type CollectionEntry } from "astro:content";

export type Post = {
  title: string;
  slug: string;
  href: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTime: string;
};

type PostEntry = CollectionEntry<"posts">;

const DEFAULT_RECENT_POST_LIMIT = 6;

export function getPostReadingTime(post: PostEntry) {
  const body = post.body ?? "";
  const withoutCodeBlocks = body.replace(/```[\s\S]*?```/g, " ");
  const plainText = withoutCodeBlocks
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`~\-[\]()]/g, " ");
  const cjkCharacters = plainText.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  const latinWords =
    plainText
      .replace(/[\u3400-\u9fff]/g, " ")
      .match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*/g)?.length ?? 0;
  const minutes = Math.max(1, Math.ceil(cjkCharacters / 450 + latinWords / 220));

  return `${minutes} min`;
}

function sortPostsByDateDesc(a: PostEntry, b: PostEntry) {
  const dateDiff = Date.parse(b.data.date) - Date.parse(a.data.date);

  if (dateDiff !== 0) {
    return dateDiff;
  }

  return a.data.title.localeCompare(b.data.title, "zh-CN");
}

function toPost(post: PostEntry): Post {
  return {
    title: post.data.title,
    slug: post.id,
    href: `/writing/${post.id}/`,
    excerpt: post.data.description,
    date: post.data.date,
    tags: post.data.tags,
    readingTime: getPostReadingTime(post),
  };
}

export async function getPosts() {
  const posts = await getCollection("posts", ({ data }) => !data.draft);

  return posts.sort(sortPostsByDateDesc).map(toPost);
}

export async function getRecentPosts(limit = DEFAULT_RECENT_POST_LIMIT) {
  const posts = await getPosts();

  return posts.slice(0, limit);
}

export async function getPostBySlug(slug: string) {
  const posts = await getPosts();

  return posts.find((post) => post.slug === slug);
}
