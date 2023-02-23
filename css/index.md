# 水平垂直居中布局方案

## [定宽高] - 绝对定位和负magin值

```scss
.parent {
 width: 200px;
 height: 200px;
 border: 1px solid #333;
 position: relative;

 .child {
  width: 100px;
  height: 80px;
  background-color: red;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -40px;
  margin-left: -50px;
 }
}
```

## [定宽高] - 绝对定位和transform

```scss
.parent {
 width: 200px;
 height: 200px;
 border: 1px solid #333;
 position: relative;

 .child {
  width: 100px;
  height: 80px;
  background-color: red;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
 }
}
```

## [不定宽高] - 绝对定位和transform

```html
<div class="parent">
  <div class="child">https://zuowendong.github.io/zwd/</div>
</div>
<style>
.parent {
  width: 300px;
  height: 300px;
  border: 1px solid #333;
  position: relative;
}
.child {
  background-color: red;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
 }
</style>
```

## [定宽高] - 绝对定位top/left/bottom/right和margin

```scss
.parent {
 width: 200px;
 height: 200px;
 border: 1px solid #333;
 position: relative;

 .child {
  width: 100px;
  height: 80px;
  background-color: red;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
 }
}
```

## [定宽高 / 不定宽高] - flex

```scss
.parent {
 width: 200px;
 height: 200px;
 border: 1px solid #333;
 display: flex;
 align-items: center;
 justify-content: center;
 
 .child {
  width: 100px; // [不定宽高] 去除
  height: 80px; // [不定宽高] 去除
  background-color: red;
 }
}
```

## [不定宽高] - flex和margin

```scss
.parent {
 width: 300px;
 height: 300px;
 border: 1px solid #333;
 display: flex;

 .child {
  background-color: red;
  margin: auto;
 }
}
```

## [定宽高 / 不定宽高] - grid

```scss
.parent {
 width: 200px;
 height: 200px;
 border: 1px solid #333;
 display: grid;
 align-items: center;
 justify-items: center;

 .child {
  width: 100px;
  height: 80px;
  background-color: red;
 }
}
```

## [不定宽高] - grid

```scss
.parent {
 width: 300px;
 height: 300px;
 border: 1px solid #333;
 display: grid;

 .child {
  background-color: red;
  align-self: center;
  justify-self: center;
 }
}
```

## [不定宽高] - grid和margin

```scss
.parent {
 width: 300px;
 height: 300px;
 border: 1px solid #333;
 display: grid;
 
 .child {
  background-color: red;
  margin: auto;
 }
}
```
