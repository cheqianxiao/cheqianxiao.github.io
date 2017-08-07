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
2. alt是`<img>`特有属性，用来描述图片内容，图片无法加载时显示，读屏器会读取它的值。若图片纯粹出于设计目的，应将它放到css中，而非html中。若必须放在html中，alt属性应设置为空。除此之外的图片，都应设置alt属性。不仅是为了SEO，也是为了对视觉障碍者友好。   

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
* tabindex   

<br/>

#### **web语义化**  

***  
html语义化： 用标签来标记内容，如h1 - h6表示标题。  
css语义化： class和id命名都要有意义  
语义化的好处：  
1. 去掉样式后文档结构清晰
2. SEO友好
3. 读屏器友好
4. 利于代码维护   


<br/>  

#### **在浏览器地址栏输入一个网址后...** 

***  
简洁版： 

1. DNS解析  
2. TCP三次握手，客户端服务端建立连接。
3. 发送请求
4. 返回响应
5. 浏览器渲染  

详细版：  

1.**DNS解析**  
即域名到ip的解析。网络中的计算机都是通过ip来标识的，但是ip是一串数字，人类记不住，于是就有了方便记忆的域名。通过DNS解析帮助我们找到对应的ip地址，有了ip地址，我们就可以向对应这个ip地址的那台计算机请求资源了。  
基本概念：   
主机名（hostname） 域名（domain name） 两者组成完整域名（FQDN）  
举个栗子来描述他们的关系：   
北京的张三 和 南京的张三 虽然都叫张三（主机名相同） 但是他们在不同地方（域名不同） 所以是两个不同的人（FQDN不同） 
![域名分层](http://7xq6lv.com1.z0.glb.clouddn.com/domain-layer.png)
DNS解析过程：   

![DNS解析过程](http://7xq6lv.com1.z0.glb.clouddn.com/dns-analyse.png)
2.**TCP三次握手**  
3.**发送请求**   
一个http请求一般由4部分组成： 请求方法、请求地址、请求头、请求体  
GET请求和POST请求的区别： 
1. GET请求一般用于数据查询，参数通过url传递，发送的信息的大小有限制。
2. POST请求用于修改和添加数据，参数放在请求体中，发送信息的大小无限制。   

4.**返回响应**  
一个http响应一般由3部分组成： 数字和文字组成的状态码、响应头、相应体  
http状态码： 
* 1XX: 信息类，表示服务器已收到请求，正在处理中。
* 2XX: 请求成功,例如200 OK
* 3XX: 重定向，客户端需要采取进一步动作
* 4XX: 客户端错误，例如404 NOT FOUND
* 5XX: 服务器错误，例如500  

5.**浏览器渲染**  

参考[浏览器的JavaScript渲染引擎](http://javascript.ruanyifeng.com/bom/engine.html#toc5)  

<br/>

#### **CSS选择器有哪些？** 

***  
* id   
* class  
* tag  
* 通配符*  
* 链接状态 `:link` 、 `:visited`、 `:hover` 、 `:active`、`:focus`  
  (注： 顺序是LoVe HAte, 另`:active`和 `:focus`不同，前者是激活状态，后者是获得焦点状态。)  
* 后代选择器（descendant selector）`x y`   
* 子元素选择器（Child selectors）`x > y`  
* 相邻兄弟选择器 `x + y` 匹配紧跟在x后面的y
* 通用兄弟选择器 `x ~ y` 匹配跟在x后面的y
* 属性选择器  
  `[attr ^= value]` 属性值以value开始  
  `[attr $= value]` 属性值以value结束  
  `[attr *= value]` 属性值包含value  
  `[attr = value]`  属性值等于value   
  `[attr ~= value]` 属性值由空格隔开，其中一个为value  
  `[attr |= value]` 属性值等于value或value-*   
* 伪元素   
  `::after`  
  `::before`  
  `::first-letter` 匹配**块状**元素的第一个字符  
  `::first-line`  匹配**块状**元素的第一行  
* 伪类  
  `:not(selector)`  匹配不符合selector的元素  
  `selector:nth-child(an+b)` 匹配符合selector且是第an+b个child  
  `selector:nth-last-child(an+b)` 匹配符合selector且是倒数第an+b个child  
  `selector:first-child`  匹配符合selector且是第一个child  
  `selector:last-child`  匹配符合selector且是最后一个child  
  `selector:only-child` 匹配符合selector且是only child  
  `selector:nth-of-type(an+b)` 匹配符合selector的第an+b个元素  
  `selector:nth-last-of-type(an+b)` 匹配符合selector的倒数第an+b个元素 

  总结：   

  `:`后面若是选择第n个child，它和前面selector是并列关系， 最终是选择满足selector**且**属于父元素的第n个child    
  `:`后面若是选择第n个type，它和前面selector是修饰关系，最终是选择满足selector**的**n个元素  

* `:checked`  

<br/>  

### **清除浮动**  

*** 
为什么要清除浮动？  

* 父元素高度坍塌，影响后面元素的布局  
* 块状元素会钻到浮动元素的后面（或者说浮动元素会浮到块状元素的上面）块状元素被浮动元素遮住。  
* 行内元素会环绕浮动元素。  

清除浮动的方法：  
1. 让父元素也浮动  
2. 使用`clear: both`
3. 父元素使用`overflow: auto`
