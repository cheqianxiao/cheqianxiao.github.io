---
layout: post
title: 前端面试题——HTML、CSS
header-img: other-bg.jpg
date:   2017-08-04 08:00:30 +0800
tags:  前端面试 
---

前端面试题之HTML、CSS


* * *
#### **img的title和alt的区别**  

***

1. tilte属于通用属性，为元素提供附加提示信息，鼠标滑过元素时显示。  
2. alt是`<img>`特有属性，用来描述图片内容，图片无法加载时显示，读屏器会读取它的值。若图片纯粹是出于设计目的，我们应该把它放到css中，而不是html中。若非要放在html中，alt属性应设置为空。除此之外的图片，都应该加上设置alt属性。不仅是为了SEO，也是为了对视觉障碍者友好。   

<br/>

#### **HTML全局属性有哪些？**  

***  
全局属性是指可以用在任何html元素的属性。
* accesskey 为元素设置快捷键，值是由空格分隔的字符串。
* class    
* contenteditable 元素是否可被编辑。  
* contextmenu 自定义右键菜单  
* data-* 自定义属性  
* dir 文本的阅读方向
	* ltr 从左到右（比如英语）
	* rtl 从右到左（比如阿拉伯语） 
	* auto 用户代理决定，用一种算法解析文本，直到找到一个可以明显代表文字方向的字符，就对整个文本应用这个方向。  
* draggable 是否可被拖拽。
* dropzone 哪种类型的内容可以被释放在元素上
	* copy 生成一个被拖拽元素的副本。  
	* move 将被拖拽元素移动到这个新位置上。  
	* link 生成被拖拽数据的链接。
* lang 设置语言
* style 
* id  
* tilte tooltip的作用
* translate 是否需要翻译

<br/>