# vue mixin

## 什么是Mixin

`mixin`是一种思想模式

> 根据维基百科的定义，mixin 是一个包含可被其他类使用而无需继承的方法的类。

在`vue`中的`mixin`

> 混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

通俗来说

将组件的公共逻辑或者配置提取出来，哪个组件需要用到时，直接将提取的这部分混入到组件内部即可，它更像是一个公共模板。

好处：

1. 减少代码冗余度，也可以让后期维护起来更加容易
1. 代码复用性更高

## mixin 和 vuex 区别

它们两个都是做组件间共享数据抽离的，但其实是不一样的：

1. vuex 是公共状态管理，一个组件使用了vuex中的数据也会导致其他 使用改数据的组件 内部发生改变。
1. mixin 中的数据和方法都是独立的，组件使用之后不会相互影响。

## 使用

mixin可以局部使用和全局使用。

### 全局使用

```js
import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import { msgMixin } from "./mixin/msgMixin";
Vue.mixin(msgMixin);

Vue.config.productionTip = false;

new Vue({
 store,
 render: (h) => h(App),
}).$mount("#app");
```

### 局部使用

新建一个`mixin`文件夹，用来存放`mixin`文件。

```js
export const msgMixin = {
 data() {
  return {
   msg: "mixin msg value",
  };
 },
 computed: {},
 created() {
  console.log("created function in mixin");
 },
 mounted() {
  console.log("mounted function in mixin");
 },
 methods: {
  handleClick() {
   this.msg = "click event in mixin";
   console.log("click event in mixin");
  },
 },
};
```

A, B两个组件

```js
<template>
 <div>
  <div>{{ msg }}</div>
  <button @click="handleClick">点击事件</button>
 </div>
</template>

<script>
import { msgMixin } from "../mixin/msgMixin";
export default {
 name: "AView",
 mixins: [msgMixin],
 data() {
  return {
   msg: "A msg value",
  };
 },
 created() {
  console.log("created function in A component");
 },
 mounted() {
  console.log("mounted function in A component");
 },
 methods: {
  handleClick() {
   this.msg = "click event in A component";
   console.log("click event in A component");
  },
 },
};
</script>
```

```js
<template>
 <div>
  <div>{{ msg }}</div>
  <button @click="handleClick">点击事件</button>
 </div>
</template>

<script>
import { msgMixin } from "../mixin/msgMixin";
export default {
 name: "BView",
 mixins: [msgMixin],
 data() {
  return {
   msg: "B msg value",
  };
 },
 created() {
  console.log("created function in B component");
 },
 mounted() {
  console.log("mounted function in B component");
 },
 methods: {
  handleClick() {
   this.msg = "click event in B component";
   console.log("click event in B component");
  },
 },
};
</script>
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/605b7ea8b8104138b62177a799fe4458~tplv-k3u1fbpfcp-zoom-1.image)

从以上打印结果上就能看出

1. 组件内部的数据 优先级 高于 mixin 中定义的同名数据
1. 生命周期的执行顺序也是 先 mixin 后组件
1. mixin 的数据和方法在组件中不共享

## 特点

针对以上特点具体分析

**1. 组件内部的数据 优先级 高于 mixin 中定义的同名数据**

去掉A组件中msg的定义，页面中msg值会先从 mixin中获取

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4987140f691a42e3a550d80970a7f3fe~tplv-k3u1fbpfcp-zoom-1.image)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f1eb2b5fcad46fda2919a804b08eff2~tplv-k3u1fbpfcp-zoom-1.image)

但是在A组件中定义了msg的话，就会像上面的GIF中显示的一样，显示了`A msg value`

所以是先执行的mixin中的数据，然后组件中有同名数据就覆写了。

**2.生命周期的执行顺序也是 先 mixin 后组件**

去掉A组件中所有生命周期函数的调用和方法的执行，会执行mixin中的生命周期函数和事件方法。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ccc98e8698c4c899a128b0c1ec05a40~tplv-k3u1fbpfcp-zoom-1.image)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1959e95ff6ff48bbbe1b602d04c5884b~tplv-k3u1fbpfcp-zoom-1.image)

**3.mixin 的数据和方法在组件中不共享**

注释掉B组件中的`data`,`created`,`mounted`,`methods`

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/baa3d4bf974940918f9bb3a17031bbb0~tplv-k3u1fbpfcp-zoom-1.image)

A组件中修改了，但是B组件中引入的mixin还是原本的数据，证明了mixin就像一个模板一样，并不会被组件修改。

## 源码

从vue2源码角度来看，源码地址：<https://github1s.com/vuejs/vue/blob/HEAD/src/core/global-api/mixin.ts#L4-L9>

```
export function initMixin(Vue: GlobalAPI) {
  Vue.mixin = function (mixin: Object) {
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
```

Vue.mixin在调用的时候传入一个形参`mixin`, 通过`mergeOptions`方法合并全局基础`options`，最后返回vue实例。

那看一下 `mergeOptions` 这个方法，源码地址：<https://github1s.com/vuejs/vue/blob/HEAD/src/core/util/options.ts#L411-L460>

```
export function mergeOptions( parent, child, vm ) {
  // ...
  if (!child._base) {
    if (child.mixins) {
      for (let i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm)
      }
    }
  }

  const options = {} as any
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField(key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}
```

1. 首先判断有没有`mixin`里面挂载`mixin`的情况，有的话就循环递归调用执行
1. 遍历`parent`中 key 放入`strats`

这里的`strats`初始就是个空对象 `Object.create(null)`，类型是`{ [key: string]: Function }`，所以是相当于调用`strats[key]`这个方法， 如果不存在的话 调用 `defaultStrat`方法

```
const defaultStrat = function (parentVal: any, childVal: any): any {
  return childVal === undefined ? parentVal : childVal
}
```

3. 遍历`child`中所有`key`, 判断对象自身属性中是否具有指定的属性

```
export function hasOwn(obj: Object | Array<any>, key: string): boolean {
  return hasOwnProperty.call(obj, key)
}
```

4. 最终把值存入 options 并返回

核心就是 `strats`所对应方法的合并策略，源码地址：<https://github1s.com/vuejs/vue/blob/HEAD/src/core/util/options.ts>

## vue3中mixin

<https://cn.vuejs.org/guide/reusability/composables.html#vs-mixins>

mixins 选项接受一个 mixin 对象数组。这些 mixin 对象可以像普通的实例对象一样包含实例选项，它们将使用一定的选项合并逻辑与最终的选项进行合并。举例来说，如果你的 mixin 包含了一个 created 钩子，而组件自身也有一个，那么这两个函数都会被调用。

Mixin 钩子的调用顺序与提供它们的选项顺序相同，且会在组件自身的钩子前被调用。

**不再推荐**

**在 Vue 2 中，mixins 是创建可重用组件逻辑的主要方式。尽管在 Vue 3 中保留了 mixins 支持，但对于组件间的逻辑复用，** Composition API **是现在更推荐的方式。**

****

### 和 Mixin 的对比

Vue 2 的用户可能会对 [mixins](https://cn.vuejs.org/api/options-composition.html#mixins) 选项比较熟悉。它也让我们能够把组件逻辑提取到可复用的单元里。然而 mixins 有三个主要的短板：

1. **不清晰的数据来源**：当使用了多个 mixin 时，实例上的数据属性来自哪个 mixin 变得不清晰，这使追溯实现和理解组件行为变得困难。这也是我们推荐在组合式函数中使用 ref + 解构模式的理由：让属性的来源在消费组件时一目了然。
1. **命名空间冲突**：多个来自不同作者的 mixin 可能会注册相同的属性名，造成命名冲突。若使用组合式函数，你可以通过在解构变量时对变量进行重命名来避免相同的键名。
1. **隐式的跨 mixin 交流**：多个 mixin 需要依赖共享的属性名来进行相互作用，这使得它们隐性地耦合在一起。而一个组合式函数的返回值可以作为另一个组合式函数的参数被传入，像普通函数那样。

基于上述理由，我们不再推荐在 Vue 3 中继续使用 mixin。保留该功能只是为了项目迁移的需求和照顾熟悉它的用户。

`vue3`中`Composition API`写法

```js
import { ref, onMounted } from "vue";

export function useMsg() {
 let msg = ref("");
 function updateMsg() {
  msg.value = "Hello Msg";
 }
 onMounted(() => updateMsg());
 return {
  msg,
 };
}
```

在A组件中使用

```js
<template>
  <div>{{ msg }}</div>
  <div>{{ AMsg }}</div>
</template>

<script setup>
  import { useMsg } from "./msg";
  let { msg: AMsg } = useMsg();

  let msg = "Hello A";
</script>
```

## 问题转变

你如果想要扩展某个Vue组件时会怎么做？

### 思路

1. 按照逻辑扩展和内容扩展来列举，逻辑扩展有：mixins、extends、composition api；内容扩展有slots；
2. 分别说出他们使用方法、场景差异和问题。
3. 作为扩展，还可以说说vue3中新引入的composition api带来的变化

### 回答

1. 常见的组件扩展方式有 mixin，extends，slots
2. mixin 按照本文写的来描述
3. extends, [戳这里 （Vue.extend方法你用过吗？它能用来做组件扩展吗？）](./extends.md)
4. 插槽主要用于vue组件中的内容分发，也可以用于组件扩展
5. vue3中的composition api
