---
layout: post
title: 雅虎军规35条
header-img: other-bg.jpg
date:   2017-08-04 08:00:30 +0800
tags:  前端面试 
---

如何做前端性能优化？


* * *
原文： [Best Practices for Speeding Up Your Web Site](https://developer.yahoo.com/performance/rules.html)
### **减少http请求数**

80%的用户端响应时间都是耗费在前端，这其中大部分时间都用在加载网页中的这些东西：图片、样式表、脚本、flash等，减少这些资源的数量，完成渲染页面需要的最小http请求数。这是加快网页访问速度的关键。  

减少页面中的这些资源的一个方法是简化网页设计，我们是否能构建一个内容丰富响应时间又很短的网页呢？下面列出了一些保持页面设计丰富前提下减少http请求的方法。

**合并文件**是一个减少请求数的方法，把所有脚本合并为一个js文件，把所有样式文件合并为一个css文件，然而，在每个页面需要加载的
脚本和样式都不尽相同时，这种做法就会遇到问题。 but making this part of your release process improves response times.（不会翻ORZ）  
**雪碧图合并**是一个常用来减少图片请求数的方法，总的文件大小是相同的，但是减少了请求数，从而加快了响应速度。  
 Image Maps主要用在当图片在网页中是相邻的，比如导航条，确定Image Maps中的坐标是一件繁琐又容易出错的事情。所以这种做法不太推荐。  
 Inline images使用data: URL scheme 将图片数据插入页面中，这样会使你的html文件变大，将inline images放入（缓存在）样式表中可以减少请求又避免了让网页变得很大。inline images并没有被所有的主流浏览器支持。  

 减少页面中的http请求是优化的第一步，这是提高首次访问性能最重要的指导思想。就像Tenni Theurer在他的博客 [Browser Cache Usage - Exposed!](https://yuiblog.com/blog/2007/01/04/performance-research-part-2/)中提到的，40-60%的日访问用户是没有带缓存来访问你的网站的，加快页面首次响应速度是提升用户体验的关键。


**使用内容分发网络**  

用户离web 服务器的距离会对响应时间有影响。将你的内容分开部署在多个地理位置分散的服务器上，从用户角度上可以得到一个更快的页面加载速度。但是我们应该从哪开始呢？  

实现内容地理分散的第一步，不要将你的web应用设计工作在一个分布式架构。



相关阅读：

[知乎]()