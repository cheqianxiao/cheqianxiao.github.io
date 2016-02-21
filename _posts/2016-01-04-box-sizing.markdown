---
layout: post
title: box-sizing【译】
header-img: other-bg.jpg
date:   2016-01-04 13:00:30 +0800
tags: css3 学习笔记 译
---




`box-sizing`可以让css布局更加简单和直观。

### 盒模型的历史

css诞生之初，盒模型是这样的：


* width + padding + border = 元素的实际可视/渲染宽度
* height + padding + border = 元素的实际可视/渲染高度


这样是有点反直觉的，因为你设定好一个元素的width和height之后，再给它加padding和border，它的实际高度和宽度就会变化。



在web design的早期，IE的比较早的版本（<=IE6),当它处于**“quirks模式”**时，会用一种不同的方式来处理盒模型，“quirks盒模型”是这样的：

* width=元素的实际可视/渲染宽度

* height=元素的实际可视/渲染高度

border和padding都移到盒子里面

![](https://cdn.css-tricks.com/wp-content/uploads/2010/09/widthbox.png)


上面的盒子是默认的盒模型，下面的是曾经的“quirks模式”对盒模型的解释。


有人人更喜欢下面那种对盒模型的“quirky"理解，认为这更直观。元素的实际宽度和你在css中定义的不一样还真是让人伤脑筋呢。但是在固定宽度布局的年代，只要你理解了盒模型，计算元素的宽度不是特别复杂，你只要计算一下你应该定义width和height为多少以适应padding和border。
然而，如今的开发者遇到的问题是：固定像素长度无法适应响应式布局，所以那些数学计算也不再适用。


随着响应式布局（也叫流体布局）越来越流行，网页开发者和设计者都期待着盒模型的更新。


### 今天的box-sizing


喜大普奔，css3中引进了box-sizng这个属性! 尽管它有三个属性值：`content-box`  `padding-box` `border-box`,但用得最多的还是`border-box`。

今天（这篇文章是写于2010年9月20日）所有浏览器的最新版本都默认使用最初的盒模型："width/hiehgt + padding + border = 元素的实际宽度"，有了`box-sizing: border-box`我们可以将盒模型改为曾经的“quirky”方式。这样定义好的width或height就不会被padding和height影响。事实也说明这个方法在响应式布局中非常有用。


这是你或许会问自己：可能古来的IE做了一件对的事？[(很多人这么认为)](http://www.jefftk.com/p/the-revenge-of-the-ie-box-model)


### box-sizing 重置方法

**旧的box-sizing重置方法**

最早的`box-sizing: border-box`重置


{% highlight css %}
* {
	box-sizing: border-box;
}
{% endhighlight %}
这种方法没什么大问题，但是它忘记了伪元素，这会产生一些意想不到的结果，于是很快出现了包含伪元素的重置方法：

**通用Box Sizing**

{% highlight css %}

*, *:before, *:after {
	box-sizing: border-box;
}

{% endhighlight %}
这种方法同时选择了伪元素，但`*`选择器会让开发者在其他地方使用`content-box`或者`padding-box`变得不方便。于是就有了下面这个实践效果最佳的重置方式：

**带继承的通用Box Sizing**

{% highlight css %}
html {
	box-sizing: border-box;
}
*, *:before, *:after {
	box-sizing: inherit;
}
{% endhighlight %}

这种方法给你更大的灵活性，你可以在需要的地方使用`padding-box`或`content-box`,不用担心通用选择器覆盖你的css。(在["Inheriting box-sizing Probably Slightly Better Best Practice"](https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/)中我们对这个问题进行了深入研究。)存在的一个问题是:`box-sizing`不被正常继承，so it's specialized behavior，(这里不会翻orz）和你设置的不完全一致。

### 浏览器前缀
每个现代浏览器都支持`box-sizing: border-box;`,不带前缀的，所以不需要加上浏览器前缀，但如果你想支持那些老版本Safari (< 5.1), Chrome (< 10), and Firefox (< 29),你就得加上前缀`-webkit`和`-moz`，像这样：
{% highlight css %}
html {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}
*, *:before, *:after {
	-webkit-box-sizing: inherit;
	-mox-box-sizing: inherit;
	box-sizing: inherit;
}

 {% endhighlight %}



### Known Issues
 `box-sizing: border-box;`被所有浏览器的当前版本支持，但`padding-box`目前只被Firefox支持，更多的有关浏览器支持的信息在我们的[box-sizing](https://css-tricks.com/almanac/properties/b/box-sizing/)条目中。

 在IE的更早版本中（IE<=8）还存在一些问题:

 * 在IE8中，对带有min/max-width或min/max-height属性的元素使用`border-box`不起作用。(Firefox以前也存在相同问题，但在2012年[被修正](https://bugzilla.mozilla.org/show_bug.cgi?id=308801)了)
 * 在IE<=7完全不起作用，但是这里有个[ployfill](https://github.com/Schepp/box-sizing-polyfill)可以解决这个问题。


[原文地址](https://css-tricks.com/box-sizing/)