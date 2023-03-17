# watch 和 computed

## 思路

1. 两者定义，列举使用上差异
2. 列举使用场景上的区别，如何选择
3. 使用细节，注意事项
4. vue3中的变化

## 定义

**watch**:

侦听器，可以侦测指定响应式数据的变化并执行相应逻辑。

常见用法是传递一个函数执行，watch没有返回值，但可以执行异步操作等复杂逻辑处理

**computed**:

计算属性，依赖组件数据计算出新数据。

常见用法是设置一个函数，返回计算结果，它与methods的差异是computed具有缓存性，依赖的属性值没有变化时不会重新计算。

### computed 缓存的实现原理

## 使用场景

计算属性一般用在，简化行内模板中复杂计算，在模板中出现很多计算逻辑会让模板代码臃肿难以维护

侦听器一般用在，响应式数据发生变化之后做的一些额外的DOM操作或者异步操作

如果需要得到的数据是基于data中属性值的话，首选计算属性

## 使用细节

1. 计算属性可以传递对象，成为即可读也可写的计算属性
2. 侦听器可以传递对象，设置deep, immediate等属性

## vue3中变化

vue3中watch有一些新变化，不能侦测一个点操作符之外的字符串形式的表达式

有watch, watchEffect 完全替代vue2中的watch选项

### watch 和 watchEffect 的区别

watchEffect 会立即执行一个函数，然后被动的追踪它的依赖，但这些依赖改变时重新执行该函数。

```html
<template>
 <div>{{ msg }}</div>
 <button @click="handleChange">change</button>
</template>

<script setup>
import { ref, watchEffect } from "vue";
let msg = ref("Hi");
watchEffect(() => {
 console.log(msg.value);
});
function handleChange() {
 msg.value += "Hello";
}
</script>
```

![watch](./assets/watch/1.gif)

watch 侦测一个或多个响应式数据源并在其发生改变时候调用一个回调函数

```html
<template>
 <div>{{ msg }}</div>
 <button @click="handleChange">change</button>
</template>

<script setup>
import { ref, watch } from "vue";
let msg = ref("Hi");

watch(msg, (val) => {
 console.log(val);
});

function handleChange() {
 msg.value += "Hello";
}
</script>
```

![watch](./assets/watch/2.gif)
