# this指向

## 规则

this的指向，是在调用函数时候根据执行上下文所动态决定的。

**规则**

1. 在函数体内，简单调用该函数时，严格模式下this绑定undefined，否则绑定到全局对象Window
2. 由上下文对象调用时，绑定到该对象上
3. 构造函数new调用，绑定到新创建的对象上
4. 由call/apply/bind方法显式调用，绑定到指定参数的对象上
5. 箭头函数里，根据外层上下文绑定this决定this的指向

## 全局环境下this

严格模式下this绑定undefined，否则绑定到全局对象Window

```js
function fun1() {
  console.log(this);
}
function fun2() {
  "use strict";
  console.log(this);
}
fun1(); // Window
fun2(); // undefined
变化1
const foo = {
  bar: 100,
  fun: function () {
    console.log(this);
    console.log(this.bar);
  },
};
var fun1 = foo.fun;
fun1();
```

验证答案

```text
// Window
// undefined

分析

1. this的指向，要根据调用函数的，执行环境判断
2. 这里虽然foo.fun赋值给fun1, 但是fun1执行的环境还是全局下的
3. 全局环境下this指向Window
4. Window上没有bar变量，所以this.bar为 undefined
```

变化2

```js
var foo = {
 bar: 100,
 fun: function () {
  console.log(this);
  console.log(this.bar);
 },
};
foo.fun();
```

验证答案

```text
// {bar:100, fun: f()}
// 100

分析

1. 这里 this 指向的是最后调用它的对象
2. 在 foo.fn() 语句中 this 指向 foo 对象
3. 在执行函数时，如果函数中的 this 是被上一级的对象所调用
4. 那么 this 指向的就是上一级的对象
5. 否则指向全局环境
```

## 上下文对象调用中的 this

```js

const person = {
 name: "jack",
 fun: function () {
  return this;
 },
};
console.log(person.fun() === person);
```

验证答案

```text
// true

分析

1. person.fun 中 this 指向 person 对象
```

变化1

```js
const person = {
 name: "jack",
 boy: {
  name: "tom",
  fun: function () {
   return this.name;
  },
 },
};
console.log(person.boy.fun());
```

验证答案

```text
// tom

分析

1. 嵌套关系中，this指向 最后 调用它的对象
2. 最后是boy调用，boy对象中name值为tom
```

变化2

```js
const obj1 = {
 text: "1",
 fun: function () {
  return this.text;
 },
};
const obj2 = {
 text: "2",
 fun: function () {
  return obj1.fun();
 },
};
const obj3 = {
 text: "3",
 fun: function () {
  const fun = obj1.fun;
  return fun();
 },
};
console.log(obj1.fun());
console.log(obj2.fun());
console.log(obj3.fun());
```

验证答案

```text
// 1
// 1
// undefined

分析：

1. 第一个输出 1， this指向调用的它的对象obj1
2. 第二个打印obj2.fun(),最终调用的是obj1.fun()，那输出还是1
3. 第三个打印obj3.fun()，obj1.fun赋值给fun，裸奔调用，this指向Window, 
Window上没有text，输出undefined
```

变化3

如何让上一题中console.log(obj2.fun())输出2
验证答案

```js
const obj1 = {
 text: "1",
 fun: function () {
  return this.text;
 },
};
const obj2 = {
 text: "2",
 fun: obj1.fun,
};
console.log(obj2.fun());

分析：
this 指向最后调用它的对象，在 fun 执行时，挂到 obj2 对象上即可，我们提前进行了赋值操作
```

## call/apply/bind改变this指向

**call/apply/bind的区别**

他们都是用来改变相关函数 this 指向的，但是 call/apply 是直接进行相关函数调用；bind 不会执行相关函数，而是返回一个新的函数，这个新的函数已经自动绑定了新的 this 指向，开发者需要手动调用即可。

```js
const person = {
 name: "lucy",
 logName: function () {
  return this.name;
 },
};
const info = {
 name: "Jack",
};

console.log(person.logName.call(info));
```

**call/apply/bind 的高级考察往往会结合 构造函数 以及 组合式实现继承。**

## 构造函数和this

```js
function Foo() {
 this.bar = "Lucy";
}
const instance = new Foo();
console.log(instance.bar);
```

问题：

1. 输出什么
2. new操作符调用构造函数具体做了什么
3. 如何自己实现一个new
验证答案

```text
1. // Lucy
2. 创建一个新的对象；
   将构造函数的this指向这个新对象
   为这个对象添加属性和方法
   最终返回这个新对象
3.
```

变化1

```js
function Foo() {
 this.bar = "Lucy";
 const obj = {};
 return obj;
}
const instance = new Foo();
console.log(instance.bar);
```

验证答案

```text
// undefined

分析
instance是返回的空对象obj
```

变化2

```js
function Foo() {
 this.bar = "Lucy";
 return `obj`;
}
const instance = new Foo();
console.log(instance.bar);
```

验证答案

```text
// Lucy

分析：
instance 是返回的目标对象实例 this
结论：如果构造函数中显式返回一个值，且返回的是一个对象，那么 this 就指向这个返回的对象；如果返回的不是一个对象，那么 this 仍然指向实例
```

## 箭头函数中this

规则：箭头函数里，根据外层上下文绑定this决定this的指向

```js
const foo = {
 fun: function () {
  setTimeout(function () {
   console.log(this);
  });
 },
};
foo.fun();
```

验证答案

```text
// Window

分析

1. this出现在setTimeout的匿名函数中，this指向Window
```

如何让上题输出 foo 这个对象
验证答案

```js
const foo = {
 fun: function () {
  setTimeout(() => {
   console.log(this);
  });
 },
};
foo.fun(); // {fun: f}
```

## this的优先级

显式绑定：通过call， apply，bind，new对 this 的绑定情况

隐式绑定：根据调用关系确定的 this 指向

```js
function foo(a) {
 console.log(this.a);
}
const obj1 = {
 a: 1,
 foo: foo,
};
const obj2 = {
 a: 2,
 foo: foo,
};
obj1.foo.call(obj2);
obj2.foo.call(obj1);
```

验证答案

```text
// 2
// 1

分析
显式绑定的优先级更高
```

变化1

```js
function foo(a) {
 this.a = a;
}
const obj1 = {};
var res1 = foo.bind(obj1);
res1(2);
console.log(obj1.a);

var res2 = new res1(3);
console.log(res2.a);
```

验证答案

```text
// 2
// 3

分析

1. res1 函数中 通过bind 将this 绑定为 obj1 对象
2. 执行res1(2)，obj1.a = 2
3. 通过new 调用的 res1 构造函数时候，即便 res1中已经是用bind绑定了obj1，
4. 此时返回的实例 为 new 调用传入的3，已经和obj1 解绑， 说明new 的优先级 高于 显式绑定
```

变化2

```js
function foo() {
 return (a) => {
  console.log(this.a);
 };
}
const obj1 = { a: 2 };
const obj2 = { a: 3 };
const bar = foo.call(obj1);
bar.call(obj2);
```

验证答案

```text
// 2

分析

1. 由于 foo() 的 this 绑定到 obj1，bar（引用箭头函数）的 this 也会绑定到 obj1
2. 箭头函数的绑定无法被修改。
```

变化3

```js
var a = 123;
const foo = () => (a) => {
 console.log(this.a);
};
const obj1 = { a: 2 };
const obj2 = { a: 3 };
var bar = foo.call(obj1);
bar.call(obj2);
```

验证答案

```
// 123
```

变化4

```js
let a = 123;
const foo = () => (a) => {
 console.log(this.a);
};
const obj1 = { a: 2 };
const obj2 = { a: 3 };
var bar = foo.call(obj1);
bar.call(obj2);
```

验证答案

```
// undefined

分析：

1. 使用 let / const 声明的变量不会挂载到 window 全局对象当中
2. this 指向 window 时，自然也找不到 a 变量
```

## 手写题

实现一个bind

初级版

```js
Function.prototype.myBind = function (context) {
 var me = this;
 var argsArr = Array.prototype.slice.call(arguments);
 return function () {
  return me.apply(context, argsArr.slice(1));
 };
};
```

验证

```js
Function.prototype.myBind = function (context) { // context = {a: 1}
 var me = this; // foo
 var argsArr = Array.prototype.slice.call(arguments); // [{a: 1}]
 return function () {
  return me.apply(context, argsArr.slice(1));
 };
};

function foo(a) {
 console.log(this.a);
}
let obj = { a: 1 };
let res = foo.myBind(obj);
res(); // 1
分析

1. 使用apply模拟
2. 函数体内的this就是需要绑定this的实例函数
3. 使用apply进行参数context绑定 并 返回
4. 将第一个参数context以外的其他参数，作为提供原函数的预设参数
```

进阶版

```js
Function.prototype.bind = Function.prototype.bind || function (context) {
    var me = this;
    var args = Array.prototype.slice.call(arguments, 1);
    return function bound () {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return me.apply(context, finalArgs);
    }
}
```
