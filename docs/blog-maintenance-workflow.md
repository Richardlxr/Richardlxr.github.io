# 个人博客维护工作流与原理说明

这份文档用于日常维护 `Richardlxr.github.io`。目标不是只记命令，而是理解每一步为什么存在。

## 一句话原理

这个博客是一个 Astro 静态站点：

```text
本地源码 -> npm run build -> dist 静态文件 -> GitHub Actions -> GitHub Pages 托管
```

你平时编辑的是源码，不直接编辑线上网页。每次把源码推送到 GitHub 后，GitHub Actions 会自动安装依赖、构建网站、把生成的 `dist/` 发布到 GitHub Pages。

## 目录怎么理解

```text
src/pages/
```

页面入口。这里的每个 `.astro` 文件都会变成一个网页路径。

例子：

```text
src/pages/index.astro                 -> /
src/pages/about.astro                 -> /about/
src/pages/writing/index.astro         -> /writing/
src/pages/writing/[slug].astro        -> /writing/每篇文章的文件名/
```

```text
src/content/posts/
```

Markdown 文章目录。这里的每个 `.md` 文件都会自动变成一篇文章。

例子：

```text
src/content/posts/blog-maintenance-log.md -> /writing/blog-maintenance-log/
```

```text
src/content.config.ts
```

文章元信息规则。它会检查每篇 Markdown 顶部有没有标题、摘要、日期、标签等字段。

```text
src/data/posts.ts
```

文章列表辅助代码。首页和文章列表页会从 Markdown 文章自动生成标题、摘要、日期、标签和链接。

```text
src/data/projects.ts
```

项目卡片数据。项目页和首页项目区域会从这里读取项目信息。

```text
src/styles/global.css
```

全站样式。颜色、排版、头像框、动效、移动端布局都主要在这里。

```text
public/
```

静态资源。这里的文件会原样发布到网站根路径。

例子：

```text
public/images/profile-avatar.webp -> /images/profile-avatar.webp
public/favicon.svg                -> /favicon.svg
```

```text
.github/workflows/deploy.yml
```

GitHub Actions 部署脚本。它告诉 GitHub：每次推送到 `main` 后，如何构建并发布网站。

## 第一次或换电脑后的准备

进入项目目录：

```bash
cd /Users/richard/Vault/Code/Richardlxr.github.io
```

安装依赖：

```bash
npm install
```

本地启动预览：

```bash
npm run dev
```

浏览器打开：

```text
http://127.0.0.1:4321/
```

## 日常改博客的标准流程

### 1. 开始前先看状态

```bash
git status
```

你要知道当前有没有没保存到 Git 的修改。这样能避免把旧修改和新修改混在一起。

### 2. 启动本地预览

```bash
npm run dev
```

本地预览的意义是：你可以先在自己电脑上看效果，不需要每改一次都推到 GitHub。

### 3. 编辑内容

常见改动位置：

- 改首页：`src/pages/index.astro`
- 改关于页：`src/pages/about.astro`
- 新增或修改文章：`src/content/posts/*.md`
- 改项目卡片：`src/data/projects.ts`
- 改样式：`src/styles/global.css`

### 4. 构建检查

```bash
npm run build
```

如果这一步失败，说明源码还不能正确变成静态网站。不要急着 `git push`，先看报错。

### 5. 提交到 Git

```bash
git status
git add .
git commit -m "docs: update blog content"
```

提交信息建议说明这次做了什么。

常见格式：

```text
docs: update blog content
feat: add new article
style: polish homepage
fix: repair deploy config
```

### 6. 推送到 GitHub

```bash
git push
```

推送后 GitHub Actions 会自动部署。

### 7. 检查部署结果

去仓库页面：

```text
Actions -> Deploy to GitHub Pages
```

确认最新一次运行是绿色成功。

然后打开线上网站：

```text
https://richardlxr.github.io/
```

如果页面还没更新，先等 1-3 分钟。GitHub Pages 和浏览器缓存有时会慢一点。

## 新增一篇文章

假设你要新增文章：

```text
我的博客维护日志
```

### 1. 新建 Markdown 文章

新建：

```text
src/content/posts/blog-maintenance-log.md
```

内容模板：

```md
---
title: "我的博客维护日志"
description: "记录我如何维护和更新这个个人博客。"
date: "2026-06-10"
tags:
  - Blog
  - 维护
  - 学习
---

这里写正文第一段。

## 小标题

这里继续写正文。
```

文件名就是文章网址。比如 `blog-maintenance-log.md` 会生成 `/writing/blog-maintenance-log/`。

如果文章还没写完，可以在顶部加一行：

```md
draft: true
```

这样文章不会出现在首页、文章列表，也不会生成公开网页。

### 2. 本地检查

```bash
npm run dev
```

检查：

- 首页是否出现新文章
- `/writing/` 是否出现新文章
- `/writing/blog-maintenance-log/` 是否能打开

### 3. 构建、提交、推送

```bash
npm run build
git add .
git commit -m "docs: add blog maintenance log"
git push
```

更完整的长文写法可以看：

```text
docs/blog-writing-guide.md
```

## 修改头像或图片

把图片放到：

```text
public/images/
```

引用路径从网站根路径开始：

```astro
<img src="/images/profile-avatar.webp" alt="个人博客头像" />
```

注意：`public/images/profile-avatar.webp` 在代码里要写成 `/images/profile-avatar.webp`。

## 修改样式

全站样式主要在：

```text
src/styles/global.css
```

建议先理解这些区域：

- `:root`：浅色主题变量
- `:root[data-theme="dark"]`：深色主题变量
- `.hero-section`：首页首屏布局
- `.avatar-frame`：头像框
- `.post-card`：文章卡片
- `.project-card`：项目卡片
- `@media`：移动端适配

改样式的原则：

1. 先在本地预览看效果。
2. 改完跑 `npm run build`。
3. 手机和桌面都看一眼。
4. 不要一次改太多，否则出问题很难定位。

## GitHub Pages 设置必须是什么

这个项目必须使用：

```text
Settings -> Pages -> Build and deployment -> Source -> GitHub Actions
```

不能使用：

```text
Deploy from a branch
```

原因：

`Deploy from a branch` 会触发 GitHub 默认 Jekyll 构建。Jekyll 不认识 `.astro` 文件，会把 Astro 文件顶部的 `--- ... ---` 当作 YAML，然后报错。

正确流程是：

```text
GitHub Actions 运行 npm run build -> 发布 dist/
```

## 常见问题排查

### 本地 `npm run build` 失败

先读终端最后几行报错。

常见原因：

- `.astro` 文件语法写错
- import 路径写错
- 标签没有闭合
- TypeScript 数据对象少了字段

### GitHub Actions 失败

去：

```text
GitHub 仓库 -> Actions -> 最新一次 Deploy to GitHub Pages
```

点失败的 job，看失败步骤。

如果看到：

```text
Build with Jekyll
Invalid YAML front matter
```

说明 Pages Source 又被切回了 `Deploy from a branch`，需要改回 `GitHub Actions`。

### 线上没更新

可能原因：

- Actions 还没跑完
- GitHub Pages 缓存没刷新
- 浏览器缓存
- 你只改了本地，没有 `git push`

检查顺序：

```bash
git status
git log --oneline -3
```

再看 GitHub Actions 最新运行是否成功。

## 最小心智模型

你只需要记住三层：

```text
源码层：src/、public/、package.json
构建层：npm run build 生成 dist/
托管层：GitHub Actions 把 dist/ 发布到 GitHub Pages
```

本地写源码，GitHub 负责自动构建和托管。每次维护博客，本质上都是让这三层保持一致。

## 官方参考

- GitHub Pages 发布源说明：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Astro 部署到 GitHub Pages：https://docs.astro.build/en/guides/deploy/github/
