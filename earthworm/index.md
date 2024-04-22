# 如何搭建 Nuxt3+Nest 全栈式项目

## 前言

公司的屎山看多了，来学学 earthworm 中优雅代码。

earthworm 是一款通过连词成句这种更新颖方式学习英语的一款软件，其源码仓库在 github 上 starred 已经有 3.1k (日期截至 2024/04/22)。仓库地址在这儿，[点击查看](https://github.com/cuixueshe/earthworm)。

本文来解析一下这个热门项目的项目结构，并仿造实现了一个示例项目，仓库地址在这儿，[点击查看](https://github.com/zuowendong/sample-nuxt-project/tree/1361b1c2e09acd2b72c86eadbf556356dc966976)。

earthworm 使用 pnpm 以 Monorepo 方式建立项目，技术栈上前端用到了 Nuxt3，后端用的是 Nest.
js，数据库方面用到了 PostgreSQL 和 Redis，ORM 框架是 Drizzle ORM。项目工程化上使用 simple-git-hooks 作为 git hooks 方案，lint-staged 和 prettier 格式化代码。

## 初始化

新建项目，进入项目文件路径下 `pnpm init` 初始化项目。

## monorepo 架构

pnpm 原生支持 monorepo，参考官网上给出的示例，[点击查看](https://pnpm.io/pnpm-workspace_yaml)。

项目根目录下新建文件 pnpm-workspace.yaml, 文件内容如下：

```yaml
packages:
  - "apps/*"
```

同级目录下新建文件夹 apps，里面将存放前后端项目。

## Nuxt3

进入 apps，创建前端项目。

```shell
pnpm dlx nuxi@latest init client
```

依据官网给出的脚手架创建项目，大概率会因为网络问题无法创建，你会得到如下这样的报错提示。

> Error: Failed to download template from registry: Failed to download https://raw.githubusercontent.com/nuxt/starter/templates/templates/v3.json: TypeError: fetch failed

### 初始化

根据上面的错误日志，提示我们是因为下载项目模板失败，这个模板也是在 github 上，我们可以直接访问这个模板项目，[点击查看](https://github.com/nuxt/starter)。

模板项目中，用法是执行 `npx nuxi@latest init client` 新建项目。但是这一步的创建也有可能会出现报错中断初始化，但是没关系我们还有最后一招，也就是手动创建。

手动创建的同时，我也会依次介绍每个文件目录的作用。

新建文件夹 client，初始化 `pnpm init`

### 安装依赖

因为使用了 monorepo，安装方式上和传统项目有点不同。

- 安装 Nuxt3，typescript

```shell
pnpm add -D -F client nuxt typescript tsx
```

- 安装 vue 相关

```shell
pnpm add -D -F client vue vue-router
pnpm add -F client pinia axios
```

- 安装 css 框架，earthworm 中使用了目前较为流行的原子框架 tailwindcss

```shell
pnpm add -D -F client tailwindcss @nuxtjs/tailwindcss daisyui
```

最终你会得到如下这样的 package.json

```json
{
  "name": "client",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  },
  "dependencies": {
    "axios": "^1.6.7",
    "pinia": "^2.1.7"
  },
  "devDependencies": {
    "@nuxtjs/tailwindcss": "^6.11.4",
    "daisyui": "^4.7.3",
    "nuxt": "^3.10.3",
    "tailwindcss": "^3.4.1",
    "tsx": "^4.7.1",
    "vue": "^3.4.21",
    "vue-router": "^4.3.0"
  }
}
```

### 目录结构

目录结构大致如下:

- api：接口请求文件
- assets：静态文件，存放全局的 css，图片和音视频资源
- components：组件，page 中可以抽离的部分都可以封装为组件放到这儿
- composables：存放 hooks 文件，component 中 js 的相关逻辑封装成 hooks
- layouts：布局，默认是 default.vue
- pages： 页面，index.vue 为首页，其他的文件则是其他的路由地址
- plugins：插件，例如我们安装的 pinia
- server：服务端，earthworm 中未用到这块，服务端是单独 next.js 写的
- store：状态管理库
- utils：通用的工具方法
- app.vue：入口文件
- nuxt.config.ts
- tailwind.config.js

可以发现并没有传统 vue 项目的路由文件，因为 nuxt 项目的路由是约定生成的，路由地址基于 page 文件。

具体的文件内容示例，可以参考：

- earthworm 的 client 目录结构，[点击查看](https://github.com/cuixueshe/earthworm/tree/main/apps/client)
- 示例项目的 client 目录结构，[点击查看](https://github.com/zuowendong/sample-nuxt-project/tree/master/apps/client)

## Nest.js

apps 下使用 nest 的脚手架创建后端项目。

```shell
# 全局安装脚手架
npm i -g @nestjs/cli

# 新建后端项目
nest new api
```

### 目录结构

earthworm 中的目录结构和@nestjs/cli 脚手架创建出来的默认项目的目录结构稍微有点不同。

将原本 src 下平铺的 app 相关文件用一个 app 文件夹存放起来，保证了目录结构的一致性。

创建一个接口就是在 src 下创建一个文件夹，例如 course 表示课程相关的接口服务，其中包含了：

- course.controller.ts
- course.modules.ts
- course.service.ts

三者的区别在官方文档中都有详细的介绍。根据我的理解，可以简单的认为，controller 是对外的接口，这里写的接口就是前端需要调用的接口地址，其中接口里需要的实现的一些逻辑，包括对数据库操作的这些逻辑都是封装到 service，controller 里需要调用 service 的方法。module 相当于入口文件，它导入了 controller 和 service，在 app.modules.ts 中就需要导入每个接口的 modules。

### service 引用问题

在初尝试编写 nest 接口过程中，遇到过关于 service 相互依赖问题的困扰。在模仿其他接口写法中发现引用的方式有通过 module 也有直接用 service，我最终的感受还是统一用 module 作为入口比较方便清晰关系。

仅供参考。

解决这个问题的第一要则是理清接口间的引用关系，其次就是 modules 中写法。

例如 B.service.ts 中需要引用 A.service.ts 中方法。

那对于 A，modules 中代码如下：

```ts
import { Module } from "@nestjs/common";

import { AController } from "./A.controller";
import { AService } from "./A.service";

@Module({
  controllers: [AController],
  providers: [AService],
  exports: [AService],
})
export class AModule {}
```

其中最关键，就是需要在 exports 中导出 service，这样其他的 modules 才可以导入使用。

B.modules 中代码：

```ts
import { Module } from "@nestjs/common";

import { BController } from "./B.controller";
import { BService } from "./B.service";
import { BModule } from "../A/A.modules";

@Module({
  imports: [AModule],
  controllers: [BController],
  providers: [BService],
})
export class BModule {}
```

那在 B.service 里就这样，愉快的使用 this.aService 调用其中的方法。

```ts
import { Injectable } from "@nestjs/common";
import { AService } from "../A/A.service";

@Injectable()
export class CourseService {
  constructor(private readonly aService: AService) {}
}
```

## 工程化

earthworm 作为开源项目，要解决多为贡献者提交代码的协同工作。

在 git 钩子中需要做两件事：

- pre-commit 期间格式化代码
- commit-msg 期间校验 commit 格式

git hooks 方案使用了 simple-git-hooks 这个库，具体的集成示例可以参考我的这篇文章《更轻量级的 git hooks 方案》，[点击查看](https://mp.weixin.qq.com/s/ROOAPTjrIt4XDkqlaNgRDg)

### 安装依赖

安装 simple-git-hooks

```shell
pnpm add -D -w simple-git-hooks
```

安装 lint-staged 和 prettier

```shell
pnpm add -D -w lint-staged prettier
```

安装变更日志插件

```shell
pnpm add -D -w conventional-changelog-cli
```

### 集成

新建 .simple-git-hooks.js， 代码如下：

```js
module.exports = {
  "pre-commit": "pnpm exec lint-staged",
  "commit-msg": "pnpm exec tsx ./scripts/verify-commit.ts",
};
```

新建 .lintstagedrc.mjs，代码如下：

```js
export default {
  "*.{js,jsx,ts,tsx,mjs,cjs,mts,cts,mtsx,ctsx}": ["prettier --write"],
  "*.{vue,html}": ["prettier --write"],
  "*.{json,md,mdx,yaml}": ["prettier --write"],
  "*.{css,less,sass,scss}": ["prettier --write"],
};
```

其他更多内容可以参考项目中实现。

## 最后

欢迎来体验免费使用 earthworm 学习英语，浏览器打开 https://earthworm.cuixueshe.com/

欢迎参与 earthworm 开源项目，使用的技术栈前沿，淬炼你的技术，作为你面试简历上两点的不二选择。github 仓库地址 https://github.com/cuixueshe/earthworm
