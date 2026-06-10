export type Project = {
  name: string;
  href: string;
  summary: string;
  status: string;
  tags: string[];
  accent: "violet" | "teal" | "gold" | "sakura";
};

export const projects: Project[] = [
  {
    name: "Skillpkg",
    href: "https://github.com/Richardlxr/skillpkg",
    summary: "面向 AI Agent 的技能包实验，把常用流程、工具和工程经验沉淀成可复用能力。",
    status: "主线项目",
    tags: ["Agent", "Workflow", "Tooling"],
    accent: "violet"
  },
  {
    name: "DataStructure",
    href: "https://github.com/Richardlxr/DataStructure",
    summary: "数据结构学习仓库，持续整理题解、模板和实现细节。",
    status: "学习中",
    tags: ["C++", "Algorithm", "Notes"],
    accent: "teal"
  },
  {
    name: "SJTU InformationGrabber",
    href: "https://github.com/Richardlxr/SJTU_InformationGrabber",
    summary: "围绕校园信息获取做的小工具练习，从实际场景里训练工程手感。",
    status: "工具项目",
    tags: ["Python", "Automation", "SJTU"],
    accent: "gold"
  },
  {
    name: "Richardlxr.github.io",
    href: "https://github.com/Richardlxr/Richardlxr.github.io",
    summary: "这座站点本身：个人博客、项目陈列室和学习轨迹的公开入口。",
    status: "本站",
    tags: ["Astro", "GitHub Pages", "Blog"],
    accent: "sakura"
  }
];
