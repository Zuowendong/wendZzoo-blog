# designer项目开发记录

## vite创建项目

使用pnpm创建 vite + vue3 项目

`pnpm create vite`

选择 vue 模板中 Customize with create-vue

选择安装 ts, jsx, vue-router, pinia, elsint, prettier, vitest

## 使用pnpm workspace

文档参考：<https://pnpm.io/zh/pnpm-workspace_yaml>

根目录下新建文件pnpm-workspace.yaml

文件内容

```shell
packages:
- 'packages/*'
```

## 代码提交前校验

安装 husky, lint-staged, commitlint

### 对文件校验

因为配置了workspace，在根目录下安装依赖需要添加 -w 参数

```shell
pnpm add husky lint-staged -D -w
```

初始化husky

```shell
# 在package.json的script指令中添加prepare指令执行 husky install
npm set-script prepare "husky install"

# 执行 husky install
pnpm perpare
```

执行完根目录下会出现.husky文件夹

添加 pre-commit 执行钩子

```shell
npx husky add .husky/pre-commit "npx lint-staged"
```

根目录下新建.lintstagedrc.json，文件内容

```json
{
  "*.{js,jsx,ts,tsx,vue}": [
    "prettier --write .",
    "eslint --fix"
  ],
  "*.md": [
    "prettier --write"
  ]
}
```

这表示在commit提交前，pre-commit这个钩子中触发执行lint-staged, lint-staged对暂存区的js, jsx. ts, tsx, vue, md尾缀的文件进行校验。

### 对提交信息校验

```shell
## 安装依赖
pnpm add commitlint @commitlint/config-conventional -D -w

# 配置commit-msg钩子
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

@commitlint/config-conventional表示提交信息的校验安装默认的Angular提交规范，这也是业界常用的一种规范

根目录下新建.commitlintrc.json

```shell
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "type-enum": [2, "always", ["feat", "fix", "refactor", "test", "build", "docs", "chore"]],
    "subject-max-length": [1, "always", 150]
  }
}
```

|类型|描述|
|--|--|
|build| 编译相关的修改，例如发布版本、对项目构建或者依赖的改动|
|chore| 其他修改, 比如改变构建流程、或者增加依赖库、工具等|
|ci| 持续集成修改|
|docs| 文档修改|
|feat| 新特性、新功能|
|fix| 修改bug|
|perf| 优化相关，比如提升性能、体验|
|refactor| 代码重构|
|style| 代码格式修改, 注意不是 css 修改|
|test| 测试用例修改|
|revert| 回滚到上一个版本|

## 主题切换方案

参考文章：[前端主题切换方案](https://juejin.cn/post/7134594122391748615#heading-8)

采用 css变量+类名切换+scss变量 方案

在样式文件中预先定义好 白天和黑暗两个主题色样式文件

style/light.scss

```css
$light-text: #8c8c8c;
$light-border: #d9d9d9;
$light-background: #f8f8f8;
$light-color: #262626;
```

style/dark.scss

```css
$dark-text: #dbdbdb;
$dark-border: #434343;
$dark-background: #262626;
$dark-color: #ffffff;
```

在theme.scss中使用这些scss变量来定义css变量值

**注意**：使用#{}语法嵌套scss变量才可以生效

style/theme.scss

```css
@import './light.scss';
@import './dark.scss';
:root {
  --theme-color: #{$light-color};
  --theme-background: #{$light-background};
  --theme-border: #{$light-border};
}
.dark {
  --theme-color: #{$dark-color};
  --theme-background: #{$dark-background};
  --theme-border: #{$dark-border};
}
```

样式文件都需要在main.js中引入。

通过一个方法来控制html根节点上的class切换

utils/theme.ts

```js
export function setTheme(type: string) {
  const htmlDom = document.documentElement
  const htmlClassNames = htmlDom.classList
  if (type === 'light' && htmlClassNames.contains('dark')) {
    htmlDom.classList.remove('dark')
  }
  if (type === 'dark') {
    htmlDom.classList.add('dark')
  }
}
```

在主题切换按钮上使用这个方法

components/Navigation/ThemeButton.vue

```html
<template>
  <button class="switch" @click="handleSwitch">
    <span :class="['icon', isDark ? 'dark' : 'light']">
      <i :class="['iconfont', isDark ? 'icon-yueliang' : 'icon-taiyang']"></i>
    </span>
  </button>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { setTheme } from '@/utils/theme'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'
let isDark = ref(false)
function handleSwitch() {
  isDark.value = !isDark.value
  let type = isDark.value ? 'dark' : 'light'
  setTheme(type)
  setLocalStorage('theme', type)
}
function initTheme() {
  let theme = getLocalStorage('theme')
  if (theme) {
    isDark.value = theme === 'light' ? false : true
    setTheme(theme)
  }
}
onMounted(() => initTheme())
</script>
<style scoped lang="scss">
.switch {
  position: relative;
  width: 40px;
  height: 22px;
  border-radius: 11px;
  background-color: var(--theme-background);
  border: 1px solid var(--theme-border);
  cursor: pointer;
}
.icon {
  position: absolute;
  top: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  transition: margin-right 2s;
}
.light {
  left: 1px;
  color: var(--theme-color);
}
.dark {
  right: 1px;
  color: var(--theme-color);
}
</style>
```

## 搭建可视化组件库

packages下新建ui目录，构建可视化组件库子项目

pnpm 初始化一个ui项目，package.json中name取值为 @designer/ui

scr下存放所有组件，通过component.ts导入所有组件，index.js导出

### 写一个文字标签组件

scr/text/text.vue

```html
<template>
  <div :style="textStyle">{{ textValue }}</div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'WdText',
  props: {
    text: { type: String, default: '文本标签' },
    fontSize: { type: Number, default: 12 },
    color: { type: String, default: '#003eb3' }
  },
  setup(props) {
    const textStyle = computed(() => {
      return `color: ${props.color}; fontSize: ${props.fontSize}px;`
    })
    return {
      textStyle,
      textValue: props.text
    }
  }
})
</script>

```

src/text/index.ts

```js
import type { App, Plugin } from 'vue'
import Text from './text.vue'
Text.install = (app: App) => {
  app.component(Text.name, Text)
  return app
}
export default Text as typeof Text & Plugin
```

src/component.ts

```js
import WdText from './text'
export { WdText }
src/index.ts
import type { App } from 'vue'
import*as components from './component'
export default {
  install(app: App) {
    for (const componentKey in components) {
      const component = [components as any](componentKey)
      if (component.install) {
        app.use(component)
      }
    }
  }
}
export* from './component'
```

### 打包

使用rollup + gulp，rollup进行组件库打包，gulp进行流程构建

ui根目录下新建script，所有打包逻辑文件放这里

首先安装依赖

```shell
# 安装rollup相关依赖
pnpm add rollup rollup-plugin-esbuild @rollup/plugin-node-resolve -D -F ui

# 安装gulp
pnpm add gulp @types/gulp -D -F ui

# 安装构建插件
pnpm add @vitejs/plugin-vue @vitejs/plugin-vue-jsx -D -F ui
```

对于常用的文件路径可以先定义好，方便复用

script/utils/path.ts

```js
import { resolve } from 'path'
// root
export const root = resolve(__dirname, '../../../ui')
export const compRoot = resolve(root, 'src')
// output
export const output = resolve(root, 'dist')
export const outputEsm = resolve(root, 'es')
export const outputCjs = resolve(root, 'lib')
// package
export const compPackage = resolve(root, 'package.json')
```

对于像组件库这样的工作库，最终打包的文件中需要将依赖的第三方插件排除

script/utils/rollup.ts

```js
import { compPackage } from './path'
const getCompPackage = () => {
  const { version, dependencies = {}, peerDependencies = {} } = require(compPackage)
  return {
    version,
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies)
  }
}
export const generateExternal = (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getCompPackage()
  const packages: string[] = peerDependencies
  if (options.full) {
    packages.push(...dependencies)
  }
  return (id: string) => {
    return packages.some((pkg) => id === pkg || (options.full && id.startsWith(`${pkg}/`)))
  }
}

export const generatePaths = () => {
  const paths = [
    ['lodash-es', 'lodash'],
    ['ui/es', 'ui/lib']
  ]
  return (id: string) => {
    for (const [oldPath, newPath] of paths) {
      if (id.startsWith(oldPath)) {
        return id.replace(oldPath, newPath)
      }
    }
    return ''
  }
}
```

script/build-modules.ts

```js
import path from 'path'
import { rollup } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import esbuild from 'rollup-plugin-esbuild'

import { outputEsm, outputCjs } from '../utils/path'
import { generateExternal, generatePaths } from '../utils/rollup'

export const buildModules = async () => {
  // compile
  const bundle = awa it rollup({
    input: path.resolve(__dirname, '../../src/index.ts'),
    plugins: [vue(), vueJsx(), nodeResolve(), esbuild({ target: 'esnext' })],
    treeshake: false,
    external: generateExternal({ full: true })
  })

  // output
  await Promise.all([
    bundle.write({
      format: 'esm',
      dir: outputEsm,
      exports: undefined,
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: false,
      entryFileNames: `[name].mjs`
    }),
    bundle.write({
      format: 'cjs',
      paths: generatePaths(),
      dir: outputCjs,
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: false,
      entryFileNames: `[name].js`
    })
  ])
}
```

## 组件拖拽

使用H5原生的拖拽属性

在组件列表项上设置可拖拽属性，设置draggable为true，表示当前原生可以杯拖拽，
dragstart方法设置当前元素刚开始拖拽时的执行方法

components/sidebar-list/SidebarList.vue

```html
<div
  v-for="compItem in componentList"
  :key="compItem.id"
  class="compItem"
  draggable="true"
  @dragstart="handleDragStart($event, compItem)"
>
  <span>{{ compItem.name }}</span>
</div>
```

```js
function handleDragStart(e: DragEvent, compItem: ICompItem) {
  e.dataTransfer?.setData('component', compItem.key)
}
```

接收方，也就是元素会被拖到的地方，需要设置drop, dragover方法，其中方法调用是都需要先设置阻止冒泡e.preventDefault()才可以生效。

```html
<div class="canvasMain" @drop="handleDrop" @dragover="handleDragover"></div>
```

```js
function handleDrop(e: DragEvent) {
  e.preventDefault()
  let compKey = e.dataTransfer?.getData('component')
  console.log(compKey)
}
function handleDragover(e: DragEvent) {
  e.preventDefault()
  e.dataTransfer!.dropEffect = 'copy'
}
```

## 国际化方案

### 安装

安装 vue-i18n 最新版支持 vue3

```shell
pnpm add vue-i18n -w
```

### 使用

src/lang/index.ts

```js
import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

export const i18n = createI18n({
  legacy: false,
  locale: 'zh-cn',
  messages: {
    'zh-cn': { ...zh },
    'en-us': { ...en }
  }
})
```

lang/zh.ts

```js
export default {
  title: '大屏设计器',
  'component-list': '组件列表',
  property: '属性',
  data: '数据',
  event: '事件',
  'canvas-size': '画布大小'
}
```

lang/zn.ts

```js
export default {
  title: 'Large screen designer',
  'component-list': 'Component list',
  property: 'Property',
  data: 'Data',
  event: 'Event',
  'canvas-size': 'Canvas size'
}
```

在main.js中引入全局使用

main.js

```js
import { i18n } from '@/lang'
app.use(i18n)
```

在模板中使用

例如，在头部标题组件中将名称字段改为国际化方案

```html
<template>
  <div class="main">
    <div class="left"></div>
    <div class="title">{{ $t('title') }}</div>
    <div class="right">
      <ThemeButton />
      <SwitchLanguage />
    </div>
  </div>
</template>
```

在 Composition API 中使用，需要使用computed改为响应式

components/sidebar-component/SidebarComponent.vue

```js
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const TABS = reactive([
  { component: '1', name: computed(() => t('property')) },
  { component: '2', name: computed(() => t('data')) },
  { component: '3', name: computed(() => t('event')) }
])
```
