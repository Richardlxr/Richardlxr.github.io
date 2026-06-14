# 博客路由动效实验总结

## 当前已回退状态

代码已经回退到实验前的稳定版本：使用 Astro `ClientRouter` 的默认路由能力，并通过 `main` 的 View Transition 动画做页面切换。

当前版本的优点是实现简单、构建稳定、性能压力低；缺点是视觉表达比较克制，容易显得像普通页面淡入/展开，不够有个人博客的记忆点。

## 这次尝试了什么

### 方案 1：增加大量中间关键帧

目标是解决“动画帧数低、卡卡的”观感。

做法是把页面进入/离开动画拆成更多关键帧，让 `clip-path`、`transform`、`opacity` 的变化更细。

结论：主观上会更细腻一点，但不是根本解法。浏览器并不是按 CSS keyframe 数量决定帧率，真正每秒渲染多少帧取决于合成线程、属性类型、页面复杂度和当前机器负载。堆关键帧可以改善插值节奏，但也会让 CSS 很难维护。

### 方案 2：偏性能的 transform / opacity 方案

目标是尽量把动画压到浏览器擅长的合成层上，减少布局和绘制压力。

做法是减少 `clip-path` 参与，更多使用 `translate3d`、`scaleY`、`opacity`。

结论：丝滑度明显更好，但视觉变得太工具化，缺少“浅紫、稻妻、雷电、樱花纸幕”的气质。这个方案适合作为底层性能策略，不适合作为最终视觉方案。

### 方案 3：紫色幕布 / 电光 / 樱花光点覆盖层

目标是在保持顺滑的同时，让跳转更有“徐徐展开”的美感。

做法是新增一个全屏 `route-veil` 覆盖层，并尝试通过 Astro 的 `fallback="animate"` 状态驱动旧页面覆盖和新页面展开。

结论：构建可以通过，但实测不可靠。点击 Writing 后页面确实跳转到了 `/writing/`，但没有出现预期的 `data-astro-transition-fallback="old/new"` 状态，覆盖层透明度也保持为 `0`。这说明单纯依赖 Astro fallback 状态来驱动自定义覆盖层，在当前环境下不能作为稳定方案继续堆视觉。

## 关键问题

1. 原生 View Transition 和 Astro fallback 是两套机制。浏览器支持原生 View Transition 时，Astro 更倾向走原生路径；强行关闭原生能力会引入时序和兼容风险。

2. Astro fallback 动画依赖浏览器的动画采集能力。测试环境里 `document.getAnimations()` 不可用时，fallback 状态不会稳定出现，导致 Writing 这类链接看起来“一帧闪过去”。

3. 只靠 CSS keyframe 数量追求“60 帧”不准确。真正要顺滑，应该优先控制动画属性：`transform`、`opacity` 优先；少用会触发布局或大面积重绘的属性。

4. “丝滑”和“好看”不是同一个目标。性能方案解决的是卡顿，美感方案还需要视觉叙事、节奏、层次和主题一致性。

## 后续推荐方向

### 方向 A：保留原生 View Transition，做轻量美化

这是最稳的方向。

保留当前 `ClientRouter` 和 `main` 的 View Transition 机制，不强行关闭 `document.startViewTransition`。在现有 `::view-transition-old(page-content)` / `::view-transition-new(page-content)` 上做更有设计感的改良。

建议：

- 继续使用 `transform + opacity` 做主体移动。
- 少量使用 `clip-path`，只作为边缘展开感，不作为主要运动。
- 在页面内容上做浅紫纸幕感：例如进入时从 96% 裁切到 0%，同时轻微 `translate3d` 和 `scale`。
- 总时长控制在 `720ms` 到 `920ms`，旧页离开 `180ms` 到 `260ms`，新页展开更慢。

优点：维护成本低，Writing、Home、文章卡片这类站内链接更容易统一。

风险：只能影响页面快照本身，做不了特别复杂的全屏装饰。

### 方向 B：用自定义路由事件驱动覆盖层

这是美感上限更高的方向。

保留 Astro 路由跳转，但不用 fallback 状态做动画触发，而是监听 `astro:before-swap` 和 `astro:after-swap`。在换页前手动给 `<html>` 加 `data-route-veil="covering"`，换页后改成 `data-route-veil="revealing"`。

建议：

- 覆盖层独立成组件，例如 `RouteTransitionVeil.astro`。
- 覆盖层只使用 `transform` 和 `opacity`，避免滤镜和大面积 blur。
- 用少量元素做氛围：浅紫纸幕、一条电光斜线、两三枚樱花光点。
- JS 只负责状态切换和兜底清理，不负责逐帧动画。
- 所有站内链接统一走 Astro 事件，不单独给 Writing 写特殊逻辑。

优点：最容易做出“徐徐展开”的美感。

风险：要仔细处理连续点击、返回前进、同页 hash、外链、动画中断和 reduced motion。

### 方向 C：混合方案

推荐真正开发时采用这个方向。

主体页面继续使用原生 View Transition，负责稳定和丝滑；覆盖层只做很轻的气氛，不承担主要切换逻辑。

建议实现顺序：

1. 先恢复并打磨当前 `page-content` 动画，让它稳定覆盖所有站内跳转。
2. 再加入一个非常轻的覆盖层，只在 `astro:before-swap` 到 `astro:after-swap` 之间短暂出现。
3. 如果 Writing 仍然没有明显动效，再检查导航链接是否被浏览器原生跳转、hash、缓存或事件时序绕开。
4. 最后再逐步增加紫色电光和樱花元素，不一次性上复杂视觉。

## 建议的下一次开发验收标准

- 点击 Home、Writing、Projects、About 都有同一套过渡。
- 点击首页“最近文章 / 全部文章”和文章卡片也有过渡。
- 外链 GitHub 不触发站内过渡。
- 连续快速点击不会卡住遮罩。
- `npm run build` 通过。
- 本地 `http://127.0.0.1:4321/` 视觉检查通过。
- reduced motion 开启时动画基本关闭。

## 暂不推荐继续的做法

- 继续无限加密 keyframe。收益会越来越低，维护成本会越来越高。
- 强行关闭 `document.startViewTransition`。这会绕开浏览器原生能力，也容易让 Astro 的路径变复杂。
- 把动效完全交给 `clip-path`。视觉上好调，但性能和兼容性不如 `transform + opacity` 稳。
- 为 Writing 单独写一套点击动画。短期能修，长期会让导航、文章卡片、返回前进的行为不一致。

