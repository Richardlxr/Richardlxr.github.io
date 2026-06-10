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
    title: "博客换装：新主题上线",
    slug: "site-refresh",
    href: "/writing/site-refresh/",
    excerpt:
      "把个人主页从规划稿推进到能访问的第一版：更清爽的色彩、更利落的首屏，以及一个适合持续写作的结构。",
    date: "2026-06-10",
    tags: ["Blog", "Astro", "CSS"],
    readingTime: "3 min"
  },
  {
    title: "C++ 与数据结构的学习地图",
    slug: "cpp-learning-map",
    href: "/writing/cpp-learning-map/",
    excerpt:
      "把零散的语法、容器、算法题和工程练习收束成一条可以反复迭代的学习路线。",
    date: "2026-06-08",
    tags: ["C++", "数据结构", "学习笔记"],
    readingTime: "5 min"
  },
  {
    title: "把 Agent 当作学习搭子",
    slug: "agent-workflow",
    href: "/writing/agent-workflow/",
    excerpt:
      "记录如何把 AI Agent 放进日常学习和项目开发中：先拆问题，再做验证，最后沉淀为可复用的工作流。",
    date: "2026-06-05",
    tags: ["AI Agent", "Workflow", "Prompt"],
    readingTime: "4 min"
  }
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
