# 函数式编程

函数式编程（ Functional Programming，简称 FP）

特点: 优雅

## 通过一个示例来感受

### +1 函数

现在有这样的一个需求，实现一个函数给数组中每个数字 +1

命令式编程就可以直接这样实现

```js
let arr = [1, 3, 5, 7];
function addOne(arr) {
 return arr.map((num) => {
  return num + 1;
 });
}
console.log(addOne(arr)); // [2, 4, 6, 8]
```

以上代码实现上没有问题，但是不能复用，比如现在新增了需求，要求给数组中每个数字 *2

那怎么办，再写一个函数循环每项 *2 ？

### 函数功能拆分

需求变更的是加1这儿的逻辑，将加1的逻辑和循环数组的逻辑拆分

```js
let arr = [1, 3, 5, 7];
function addOne(num) {
 return num + 1;
}
function createArr(arr, fn) {
 return arr.map((num) => {
  return fn(num);
 });
}
console.log(createArr(arr, addOne)); // [2,4,6,8]
```

`*2`的需求，则添加一个`*2`的方法

```js
function multiTwo(num) {
 return num * 2;
}
console.log(createArr(arr, multiTwo)); // [2, 6, 10, 14]
```

但这样也有问题，就是直接替换了 +1 这个方法，那这个方法没做到复用

### 继续拆分
