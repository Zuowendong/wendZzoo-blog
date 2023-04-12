# nextTick

## 定义

先来看字面意思，next 表示下一个，tick表示时钟的滴答，nextTick就表示下一个滴答，即下一个任务。

这就涉及到一个执行时机的问题，不得不提到了Event Loop

Event Loop 具体介绍请看这篇文章，[戳这里](../js/eventLoop.md)

那官方文档，[戳这里](https://v2.cn.vuejs.org/v2/api/#Vue-nextTick)

> 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

nextTick是Vue提供的一个全局API，由于Vue的异步更新策略，导致了在对数据修改之后不会立刻体现在DOM变化上，如果想要立即获取更新后的DOM状态，就需要使用这个方法。

## 为何使用

官方文档中对于异步更新队列这儿解释的nextTick更加具体，[戳这里](https://v2.cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97)

> Vue更新DOM时是异步执行的
>
> 只有监听到数据变化，Vue才会开启一个队列，缓存在同一事件循环中发生的所有数据变更
如果一个watcher被多次触发，只会被推入到队列一次。这样在缓冲时去除重复数据，对于避免不必要的计算和DOM操作是很必要的。
>
> 在下一次事件循环的tick中，Vue刷新队列并执行实际的工作。
>
>Vue内部对异步队列的使用，考虑兼容性采用优雅降级，使用原生 Promise.then、MutationObserver 和 setImmediate ，都不支持则使用 setTimeout(fn, 0)

为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 Vue.nextTick(callback)。这样回调函数将在 DOM 更新完成后被调用。

## 何时使用

想在修改数据之后立即看到DOM相应的变化，就需要用这个方法。

比如这样的需求，原本隐藏的输入框input输入框，在控制显示之后聚焦，如果没有使用nextTick

```html
<template>
  <input ref="inputRef" v-show="showInput" type="text" placeholder="请输入" />
</template>
<script setup>
import { onMounted, ref } from "vue";
let showInput = ref(false);
let inputRef = ref(null);

onMounted(() => {
 showInput.value = true;
 inputRef.value.focus();
});
</script>
```

其实这样是无效的，input输入框无法聚焦

使用nextTick

```html
<template>
 <input ref="inputRef" id="input" v-show="showInput" type="text" placeholder="请输入" />
</template>

<script setup>
import { nextTick, onMounted, ref } from "vue";
let showInput = ref(false);
let inputRef = ref(null);

onMounted(() => {
 showInput.value = true;
 nextTick(() => {
  inputRef.value.focus();
 });
});
</script>
```
