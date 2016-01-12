---
layout: post
title: 编码规范
header-img: other-bg.jpg
date:   2016-01-12 10:00:30 +0800
---

在网上查找到的关于javascript,html,css的编码规范，备忘。

###黄金定律：永远遵循同一套编码规范




###HTML

1. tab=2个空格——保证所有环境对于下获得一致展现。
2. 对于属性定义全部使用双引号。
3. 不要在自闭和元素的尾部添加斜线。(img,input等标签)
4. 为html元素指定`lang`属性，从而为文档设置正确的语言，有助于语音合成工具确定其所应该采用的发音。有助于翻译工具确定其翻译时所应遵守的规则。
5. 添加`<meta http-equiv="X-UA-Compatible" content="IE=Edge">`,开启IE兼容模式，确定绘制当前页面所应该采用的IE版本。
6. 明确声明字符编码，确保浏览器快速准确地判断内容的渲染模式。
7.  在引入js和css文件时，一般无需指定其type属性，因为`text/css`和`text/javascrit`分别是他们的默认值。
8. 任何时候尽量使用最少标签。
9. 属性顺序：
* `class`
* `id`，`name`
* `data-*`
* `src`，`type`，`for`，`href`
* `title`，`alt`
* `aria-*`，`role`

###CSS
1. tab=2个空格
2. 每个声明块的左花括号前有一个空格，右花括号独起一行。
3. 每条声明独占一行(报错时有用)
4. 不要在`rgb()``rgba()``hsl()``hsla()``rect()`内部逗号前后加入空格。
5. 省略小数点前的0。
6. 16进制值全部小写，且尽量使用简写的16进制值：`#FFFFFF`写成`#fff`。
7. 0后面不要加单位。`margin: 0px`写成`margin: 0`。
8. 属性声明顺序:
* `Positioning`定位
* `Box Model`元素的尺寸
* `Typographic`字体行高等和印刷相关的
* `Visual`其他视觉效果，背景颜色，阴影等。
9. 尽量不要使用`@import`，它比`link`标签慢且增加额外请求次数。
10. 不要滥用简写属性。
11. 当使用带有特定厂商的前缀的属性时，保持属性值垂直对齐。像这样：
{% highlight css %}
.selector {
  -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.15);
         -box-shadow: 0 1px 2px rgba(0,0,0,.15);
}
{% endhighlight %}
###JavaScript
1. 表示区块起首的大括号不要另起一行。
2. 不要省略句末的分号。
3. 不要使用“==”运算符，使用严格相等运算符“===”。<br>
   因为相等运算符会自动转换变量类型，造成很多意想不到的情况。
4. 所有变量声明都放在函数的头部。
5. 所有函数都在使用前定义。
6. 避免使用全局变量，如果不得不，使用大写变量名加以区别。<br>
   因为全局变量对任何一个代码块都可读可写，这对代码的模块化重复使用非常不利。
7. 不要使用`new`命令，改用`Object.create()`命令。<br>
    `var o = new myObject()`一旦你忘了加`new`，`myObject()`内部的`this`关键字就会指向全局对象，导致所有绑定在`this`上的变量都变为全局变量。
8. 将`--`换成`-=`，`++`换成`+=`。<br>
   因为自增和自减运算符放在变量前和放在变量后结果不一样，容易造成错误。
9. 总是使用`{}`表示区块，不要省略。
10. 运算符和操作符左右加空格。

****

参考

[编码规范 by @mdo](http://codeguide.bootcss.com/)


[Javascript编程风格](http://www.ruanyifeng.com/blog/2012/04/javascript_programming_style.html)









