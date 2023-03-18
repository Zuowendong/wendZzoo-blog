# Set 和 Map 的区别

## Set

`Set`对象允许存储任何类型的唯一值，无论是原始值还是对象引用。

`Set`对象是值的合集，可以按照插入的顺序迭代它的元素。Set中元素只会出现一次，即Set中的元素是**唯一的**。

```html
<template>
 <button @click="handleAddNum">添加数字</button>
 <button @click="handleAddObj">添加对象</button>
 <button @click="hasTen">取值10</button>
 <span>{{ tenTip }}</span>
 <div v-for="item in list.data" :key="item">
  <span>{{ item }}</span>
  <button @click="handleDelete(item)">删除</button>
 </div>
</template>

<script setup>
import { reactive, ref } from "vue";
let list = reactive({
 data: new Set(),
});

let idx = ref(0);
function handleAddNum() {
 list.data.add(idx.value++);
}
function handleAddObj() {
 let num = idx.value++;
 list.data.add({ id: num, name: num });
}
let tenTip = ref("");
function hasTen() {
 if (list.data.has(10)) {
  tenTip.value = "找到了数字10";
 } else {
  tenTip.value = "没找到";
 }
}
function handleDelete(item) {
 list.data.delete(item);
}
</script>
```
