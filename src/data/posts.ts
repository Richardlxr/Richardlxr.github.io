export type Post = {
  title: string;
  slug: string;
  href: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTime: string;
};

export const posts: Post[] = [
  {
    title: "你好，很高兴认识你",
    slug: "hello",
    href: "/writing/hello/",
    excerpt:
      "和大家打个招呼：我的博客前端刚刚构建好，以后会时不时在这里分享学习和生活。",
    date: "2026-06-10",
    tags: ["Blog", "学习", "生活"],
    readingTime: "1 min",
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
