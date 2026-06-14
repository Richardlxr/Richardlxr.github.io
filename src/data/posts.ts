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

  return posts
    .sort((a, b) => Date.parse(b.data.date) - Date.parse(a.data.date))
    .map(toPost);
}

export async function getPostBySlug(slug: string) {
  const posts = await getPosts();

  return posts.find((post) => post.slug === slug);
}
