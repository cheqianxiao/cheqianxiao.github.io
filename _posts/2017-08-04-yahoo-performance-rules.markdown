---
layout: post
title: Yahoo军规35条【译】（未完待续）
header-img: other-bg.jpg
date:   2017-08-04 08:00:30 +0800
tags:  前端面试 
---

如何做前端性能优化？


* * *
原文： [Best Practices for Speeding Up Your Web Site](https://developer.yahoo.com/performance/rules.html)  
     
目录：  

1. content  
	- [减少http请求数](#减少http请求数)
	- [使用Ajax缓存](#使用Ajax缓存)  
	- [拒绝404](#拒绝404)  
	- [尽可能少的DOM元素](#尽可能少的DOM元素)
	- [减少DNS轮询](#减少DNS轮询)
	- [避免重定向](#避免重定向)
2. server
	- [使用内容分发网络](#使用内容分发网络)  
	- [增加过期时间和缓存控制头](#增加过期时间和缓存控制头)  
	- [启用Gzip压缩](#启用Gzip压缩)  
	- [使用GET方式发送Ajax请求](#使用GET方式发送Ajax请求)
	- [尽早刷新缓存](#尽早刷新缓存)
3. cookie  
	- [减少cookie大小](#减少cookie大小)
4. js
	- [将脚本放在底部](#将脚本放在底部)  
	- [最小化DOM访问次数](#最小化DOM访问次数)
	- [使用外部JS、CSS文件](#使用外部JS、CSS文件)
	- [压缩JS、CSS](#压缩JS、CSS)
	- [移除重复的脚本](#移除重复的脚本)
	- [开发智能的事件处理程序](#开发智能的事件处理程序)
5. css
	- [将样式文件放在最上面](#将样式文件放在最上面)  
	- [避免使用css表达式](#避免使用css表达式)  
	- [使用`<link>`而不是`@import`](#使用`<link>`而不是`@import`)  
6. img  
	- [使favicon.ico尽可能小并可缓存](#使favicon.ico尽可能小并可缓存)
	- [不要在html中缩放图片](#不要在html中缩放图片)
7. mobile  

<br/>
#### **减少http请求数**   

***

终端用户响应时间80%都是花费在前端，大部分时间都用在加载网页中的这些资源：图片、样式表、脚本、flash等，减少这些资源的数量从而最小化页面渲染所需http请求数。这是加快网页访问速度的关键。  

减少页面资源的一个方法是简化网页设计，我们是否能做一个内容丰富同时响应时间又短的网页呢？以下是一些在保持页面丰富度的前提下减少http请求的方法：  

* **文件合并**： 将js合并，将css合并，然而，在每个页面所需加载的
脚本和样式都不尽相同时，这种做法就有难度。 

* **css sprite**： 将多个背景图片合并进一张图片，设置`background-image ` `background-image ` 属性来显示不同部分。 

* **Image Maps**： 主要用于网页中的相邻图片，比如导航条。确定Image Maps中的坐标是一件繁琐又容易出错的事情。所以不推荐此方法。   

* **Inline images**： 使用data: URL scheme 将图片数据插入页面中，然而这样会使html文件变大，为了避免这个问题，可以将inline images放入（缓存在）样式表中。（注：inline images并没有被所有主流浏览器支持。）  

减少http请求是优化的第一步，这是提高首次访问性能最重要的指导思想。就像Tenni Theurer在他的博客 [Browser Cache Usage - Exposed!](https://yuiblog.com/blog/2007/01/04/performance-research-part-2/)中提到的，40-60%的日常访问用户是没有带缓存来访问你的网站的，加快页面首次响应速度是提升用户体验的关键。  
<br/> 
#### **使用内容分发网络**  

***  

用户离服务器的距离会影响响应时间。将你的内容分开部署在多个地理分散的服务器上，用户将体验到更快的加载速度。但从哪开始呢？  

实现内容地理分散的第一步，是不要一开始就尝试将你的应用设计成分布式架构。改变架构意味着同时你可能要同步seesion 状态、跨服务器复制数据库。减少用户到内容之间的距离的尝试可以在应用架构之后，但绝不能被忽略。 

牢记一点： 80-90%的用户端响应时间都耗费在了下载图片、脚本、样式等资源上，这是**性能黄金准则**，而不是一开始就从重新设计应用架构这样有难度的事情开始。最好先将静态资源分发。这样不仅可以大大减少响应时间，而且，因为有了内容分发网络，这种做法也变得更简单。 

内容分发网络（CDN）是分散在不同地理位置高效地给用户分发内容的服务器的集合。基于网络拓扑策略来选择给特定用户分发内容的服务器。 例如，通常会选择那些网络跳数最少或响应速度最快的服务器。

一些大的互联网公司会有他们自己的CDN，但更节约成本的方式是使用CDN服务提供商，比如[Akamai Technologies](http://www.akamai.com/), [EdgeCast](http://www.edgecast.com/), 或 [level3](http://www.level3.com/index.cfm?pageID=36)。


对于创业公司或私人网站来说，CDN服务的成本会高得吓人。但是当你的访问者越来越多，越来越全球化。为了提高响应速度，CDN是必不可少的，At Yahoo!, properties that 将静态内容从应用服务器移到CDN (包括上面提到的第三方和雅虎自己的CDN) 将响应速度提高了20%甚至更多。切换到CDN是一个相对简单的将动态提高网站速度的代码更改。  
<br/>
#### **增加过期时间和缓存控制头**  

***

这条规则有两个方面：  

1. 对于静态资源：通过将设置Expires Header为一个“遥远的将来”来执行“永不过期”策略。  
2. 对于动态资源：通过设置合理的cache-control header来帮助浏览器实现有条件的请求。

网页变得越来越丰富，也意味着需要更多的样式、脚本、图片、flash，首次访问用户可能需要发送多个http请求，但是我们可以通过设置Expires Header来缓存这些资源，这样可以避免在后续的访问中增加不必要的请求，Expires Headers在图片中使用比较多，但是它应该被用在包括脚本、样式、flash在内的所有资源。  

浏览器（或代理）使用缓存来减少请求的数量和大小，使得网页加载更快。服务器通过http响应中的Expires Header响应头来告诉客户端资源的缓存时间。  

记住：当你使用“遥远将来”的过期头，当组件更新的时候你需要更改文件名。  

使用“遥远将来”的过期头可以优化非首次访问者的用户体验，对首次访问者无用，所以，性能优化的影响取决于用户事先缓存（缓存中已包含页面中的所有资源）情况下访问的频率，经过我们对Yahoo的测试，发现75-85%的访问是在有缓存的条件下发生的。通过设置一个“遥远将来”的过期头增加浏览器缓存的资源数，并在后续的访问中被重复利用，不需要发送一字节的数据。  

译者注：  
**Expires 和 Cache-Control的区别**  
Expires设置的是一个截止时间点，如果客户端的时间和服务器的时间有偏差，那么过期时间就会和预期的时间有偏差。  
而cache-control设置的是一个时间长度，就不存在上面的问题。所以建议使用Cache-Control，另：如果这两个同时存在，Cache-Control将覆盖Expires。

**三种刷新方式的区别**  
假设第一次请求的时候，服务器在响应头上加上了Cache-Control和Last-Modified字段。  

地址栏enter： 先检查自己的缓存，如果有且没过期，就使用缓存，不发送请求。
F5或刷新按钮刷新：浏览器无论如何都会发送一个请求，并在请求头中加一个if-modified-since，去询问服务器这个资源从last-modified之后是否更新过。 如果没有更新过，服务器返回一个304，告诉浏览器没有更新过，可以直接用之前的缓存。
Ctrl + F5 刷新：浏览器放弃缓存，告诉服务器：我不用之前的缓存，给我来份新鲜热乎的。  


<br/>
#### **启用Gzip压缩**  

*** 
请求到响应的时间可以被前端工程师显著减少，虽然开发人员无法决定用户的带宽、网络 服务提供商、到邻近交换节点的距离等等，但是还有一些其他因素影响了响应时间。可以通过压缩文件来减少响应的大小从而减少响应时间。  

从 HTTP/1.1开始，客户端可以在请求中添加Accept-Encoding header 标识支持压缩。  

    Accept-Encoding: gzip, deflate  

服务端看到这个头，就可以使用客户端列出的方法来压缩响应。并通过响应中的Content-Encoding header来告知客户端。  
    
    Content-Encoding: gzip  
 
在Gzip是目前最常用和高效的压缩方式，它是由GNU项目开发使用客户端列出的一种方法对响应压缩，在REC 1952被标准化，你可能会看到另一种压缩方式：deflate，它相对Gzip来说没有那么高效和常见。  

Gzip通常可以将响应大小减少70%，如果你是用Apache，配置Gzip的方式取决于你的版本，Apache 1.3用mod_gzip，Apache 2.x用mod_deflate。  

浏览器和代理的一些问题会导致期望的和实际返回的压缩内容不匹配。幸运的是，随着旧版本浏览器被淘汰，这样的情况越来越少。
服务器基于文件类型来决定是否对其压缩，但通常在他们决定压缩时有太多限制，大多数站点压缩他们的HTML文档，样式和脚本也可以压缩，但大多数服务器都没有这个机会，事实上，任何文本响应都值得压缩，包括XML、JSON。图片和PDF文件不应该被压缩，因为它们本身就已经被压缩，试图压缩它们不仅浪费CPU还会无形增加文件大小。  

对尽可能多的文件类型开启Gzip是一种减小页面体积提升用户体验的简单方法。  
<br/>
#### **将样式文件放在最上面**  

*** 

研究[Yahoo](https://www.yahoo.com)性能后发现将样式表放在文档头部可以加快页面加载，因为这样可以让页面逐步渲染。关注性能的前端工程师希望页面被逐步加载，因为，我们希望让浏览器尽快将内容展现出来，这对于网络环境不好的用户浏览一个有很多内容的网站尤为重要。给予用户视觉反馈（比如，进度指示）的重要性经过了研究记录。在我们的情况中HTML页面就是进度指示，当页面按顺序加载导航条、顶部logo等等，所有这些都为等待页面加载的用户提供了视觉反馈，这可以提升整体用户体验。

将样式表放在文档底部的问题在于： 在包括IE在内的多数浏览器中，它阻止了逐步渲染。这些浏览器为了避免因样式表的变化导致的页面元素的重绘而阻止了页面的渲染。这样用户就会长时间看到一个空白页面。 

[HTML规范](http://www.w3.org/TR/html4/struct/links.html#h-12.3)明确指明样式表应包含在HEAD中： “与`<a>`不同，`<link>`只能出现在`<head>`中，尽管它可以出现任意次数。”不值得冒白屏或闪烁（FOUC）的危险，最好的方案是遵循HTML规范，将样式表放在文档头部。  
<br/>

#### **将脚本放在底部**  

***

脚本的问题在于他们阻塞了并行下载。[HTTP/1.1规范](http://www.w3.org/Protocols/rfc2616/rfc2616-sec8.html#sec8.1.4) 建议不要在一个域名下并行加载超过两个资源，如果你将图片放在多个不同域名下，你会得到超过两个的并行下载数。当加载脚本的时候，浏览器不会再去开始任何下载，即使是在不同的域名。  

在某些情况下，将脚本放到文档底部并不容易，例如：脚本使用`document.write`来插入部分页面内容，它就不能被放在底部。还有作用域问题，多数情况下，都有这些场景对应的解决办法。

一个常见的替代方案是使用延迟加载的脚本，`defer`属性表示脚本中不包含任何`document.write`，浏览器可以根据这个属性来继续渲染。很不幸，火狐不支持这个属性，在IE中，可以做到延迟加载，但并不竟如人意。如果一个脚本可以延迟加载，那么它也可以被放到页面底部，这将使你的页面加载更快。  
<br/>

#### **避免使用css表达式** 

*** 

css expression一个很强大（也很危险）的用来动态设置css属性的方法，IE5开始支持这个方法，但在IE8中被废弃。下面这个栗子，利用css表达式实现了每小时切换一次背景色：

    background-color: expression( (new Date()).getHours()%2 ? "#B8D4FF" : "#F08A00" );

像上面这样，`expression`可以接受一个js表达式，css属性设置成这个表达式的执行结果。这个`expression`会被其他浏览器忽略，所以可以通过用这个方法来设置IE中的属性，从而获得浏览器一致性用户体验。

css表达式的问题在于：它被计算的次数比大多数人预想的要频繁。它不仅在页面渲染和调整大小的时候被计算，在页面滚动甚至当用户在页面上移动鼠标时，它也会被重新计算。在css表达式中添加一个计数器可以帮助我们知道css表达式是在什么时候、怎样被计算的。在页面上随便移动一下鼠标就能轻易产生一万多次的计算。

一个可以减少css 表达式计算次数的方法是使用一次性表达式，表达式第一次计算的时候就将样式属性设置为一个确切的值。如果样式属性必须在页面的生命周期中被动态设定，可以使用事件处理函数来取代css表达式。如果你仍旧要使用css表达式，请记住：它们可能会被计算上千次，而这样会影响页面性能。  
<br/>
#### **使用Ajax缓存**  

***  

使用Ajax的好处可以给用户及时反馈，因为它使用异步方式从后台请求信息。但是，“异步”不保证用户会无聊地玩弄他的大拇指等待着响应返回。在很多应用中，用户是否会等待取决我们如何使用Ajax。例如，在web电子邮件客户端中，用户会一直等待Ajax请求返回符合他们搜索条件的邮件信息。记住：“异步”不意味着“实时”。 

提高Ajax的性能的一个重要方法是让响应可被缓存。如在[增加过期时间和缓存控制头](#增加过期时间和缓存控制头)提到的那样，其他的规则也适用于Ajax。  
* 开启Gzip压缩  
* 减少DNS轮询  
* 压缩js  
* 避免重定向  
* 配置Etags  

让我们看个栗子：一个Web 2.0电子邮件应用可能使用Ajax来获取通讯录帮助用户自动补全。如果用户自他上次使用这个邮件应用以来都没有更改过通讯录，并且，我们使用过期时间或缓存控制头缓存过Ajax响应，之前的通讯录数据就可以从缓存中获取。浏览器需要知道是使用之前的通讯录还是重新请求新的，方法是在请求地址中增加一个时间戳来
标识用户上次是否修改过他的通讯录，例如`&t=1190241612`。如果没有被修改过，时间戳不变，浏览器从缓存中获取通讯录数据。这样就灭掉了一个HTTP请求。如果修改过，时间戳保证了新的URL和缓存的响应不匹配，浏览器就会重新发起一次请求，更新通讯录数据。  

尽管Ajax响应是动态生成的，并可能只适用于单个用户，它们仍应该被缓存，这么做可以加速你的Web 2.0应用。  
<br/>
#### **使用GET方式发送Ajax请求**  

***  
使用XHR时，POST请求是分为两步的。先发送请求头，再发送数据。所以最好用GET，它只占一个TCP包（除非你的cookie很大），IE中最多可以发送2K的数据，所以超过2K就不能用GET了。   

不发送数据时GET和POST其实是一样的，HTTP规范指明GET请求是用来获取数据的，而不是向服务器存储数据的。  

<br/>

#### **尽可能少的DOM元素**  

***

复杂的页面不仅意味着需要下载更多的字节也会使js操作DOM的速度变慢。比如，你想为DOM中某个元素添加事件，遍历500个元素和遍历5000个元素是不一样的。  

当页面元素相当多的时候，你就要去看看自己写的html标签，是否为了布局而写了嵌套的`<table>`？是否为了解决布局问题而写了更多的`<div>`？或许有更好更具语义化的方式来组织你的html标签。

有个简单的方法可以知道html中有多少DOM元素： 打开firebug控制台，输入：  

`document.getElementsByTagName('*').length`  

[YUI CSS utilities](https://developer.yahoo.com/yui/)是个布局利器！grid.css帮助你整体布局，fonts.css和reset.css 可以帮你统一浏览器默认样式，这是一个帮助你重新更新并思考自己的html标签组织方式的机会。例如，不要只为了渲染一个新行就加个div，要考虑语义化！

多少的DOM元素算多呢？可以看看类似的标签写得好的页面，比如：雅虎首页，就是一个复杂的页面但也只用了不到700个元素。  
<br/>  

#### **拒绝404**   

***   

http请求花销是很大的，所以发出一个http请求而得到一个无用的响应（比如404）是完全没必要的，并且这样会降低用户体验。  
一些网站会有一些有用的提升用户体验的404，但这仍然会浪费服务器资源。  
最糟糕的情况是引用外部脚本的链接出错并返回404，首先，这个下载会阻塞并行下载，其次，浏览器会将相应体当作js代码去解析，试图找到一点有用的信息。  
<br/>   
#### **减少cookie大小**   

***  
在很多情况下会用到cookie，比如用户认证和个性化。浏览器和服务器通过http头来交换cookie，所以，尽可能减少cookie大小对响应速度很重要。

更多信息可以看[ "When the Cookie Crumbles" ](http://yuiblog.com/blog/2007/03/01/performance-research-part-3/),这篇研究得出以下几个要点：  
* 清除不必要的cookie  
* 将cookie大小减到最小  
* 设置cookie要设置合适的域名层级保证子域不会被影响。  
* 设置一个合适的失效日期，将Expires设置为早一点的时间或者设置为none可以尽快清除cookie，减少响应时间。  

<br/>  
#### **最小化DOM访问次数**    

***  

js操作DOM是很慢的，所以为了页面的性能，你应该：  
* 将获取到的DOM元素缓存起来  
* “线下”更新节点再将它们一起插入到DOM中  
* 尽量避免用js去解决布局问题     

详情请看["High Performance Ajax Applications" ](http://yuiblog.com/blog/2007/12/20/video-lecomte/)  

<br/>  

#### **使用`<link>`而不是`@import`**   

***  
上面有一条说到为了实现逐步渲染要将样式文件放在head标签中。  
在IE中，使用`@import`和将样式放在页面底部有同样的效果，所以不要用它。  
<br/>
#### **尽早刷新缓存**    

*** 

当用户请求一个页面的时候，服务端通常需要200 到 500 ms来拼凑这个html页面，这期间，浏览器是空闲的，它在等待服务端返回数据，在PHP中你可以使用flush()方法来返回部分已准备好的html给浏览器，浏览器就可以开始拉取资源，而服务器可以忙剩下的部分，这样做的好处主要在重后端或轻前端可以看到。

比较好的刷新位置是在HEAD后面，因为head比较容易生成，并且你可以在里面包含任何js、css文件让浏览器去并行下载当后端还没有处理完html的时候。  

栗子： 

	... <!-- css, js -->
    </head>
    <?php flush(); ?>
    <body>
     ... <!-- content -->

<br/>
#### **使用外部JS、CSS文件**  

***  
这些规则大多数都是关于如何管理外部资源的，然而在考虑这些之前，你应该问一个更基础的问题：js和css应该放在外部文件中还是内联在页面中？   

在实际生产环境中，引用外部文件通常会让页面加载更快，因为js、css文件被浏览器缓存了，而内联在html中的js、css会在每次请求html时都下载一次。虽然这样这减少了请求数，但也增加了html的大小。另一方面，如果浏览器缓存了外部文件中的js、css，就可以在不增加请求数的情况下减少html的大小。  

然后关键因素是：外部js、css文件被缓存的频率相对请求的html文档数量。尽管这个因素很难量化，但是可以从一些不同的指标来衡量，如果你的用户在每次会话中有多次pv,并且你的很多页面间有共有的js、css，那么使用外部文件就大有好处。  

许多网站都的这个指标都比较低，对这些网站来说，最好的方案通常是使用外部js、css文件。而唯一例外的情况是首页，首页更适合使用内联js、css，比如[Yahoo!'s front page ](http://www.yahoo.com/)和[My Yahoo!](http://my.yahoo.com/)。对于每次会话中pv较少（可能只有一个）的首页，使用内联的js、css或许可以获得更快的响应时间。  
 
 有一些方法来权衡使用内联js、css带来的请求数的减少和使用外部js、css文件带来的缓存的好处，其中一个方法是：将js、css内联在首页中，当页面加载完之后去动态地同时动态加载外部文件，之后的页面就可以利用这些应该已经被浏览器缓存的文件。

<br/>  

#### **减少DNS轮询**  

***  
DNS将域名映射到ip，就像通讯录将姓名映射到电话。 当你在浏览器中输入www.yahoo.com，浏览器相关的DNS解析服务器会返回对应服务器的ip地址。DNS轮询是有开销的，通常需要20-120毫秒来完成轮询。在轮询完成前，浏览器无法从域名下载任何资源。  

为了更好的性能，DNS轮询会被缓存。缓存可能发生在一台特定的缓存服务器，这台服务器维护着用户的ISP或局域网。在用户本地也会有缓存，系统的DNS缓存永缓存中会保留着DNS信息，大多数浏览器也会有自己的缓存，和系统的缓存分离。只要浏览器自己的缓存中还保存着DNS记录，就不会去系统的缓存中请求。  

IE默认将DNS缓存30分钟，在`DnsCacheTimeout`注册项中指定，火狐缓存一分钟，在配置项`network.dnsCacheExpiration`中指定。  

当用户的DNS缓存是空的（包括浏览器缓存和系统缓存），DNS轮询的数量就等于网页中不同域名的数量，包括用于url、图片、样式、脚本等中的域名。减少不同域名的数量就可以减少DNS轮询的数量。  

减少不同域名的数量也会潜在地减少页面中并行下载的数量。减少DNS轮询可以缩减响应时间，然而并行下载数量的减少会增加响应时间，我的意见是将资源部署在2到4个不同域名下，这是减少DNS轮询和增加并行下载数二者的折衷。

<br/>  
#### **压缩JS、CSS**  

***  

压缩是指减少代码中多余字符来减少文件大小，当代码被压缩时，注释和不必要的空白字符（包括空格、换行、tab）都会被移除，对js而言，可以减少文件大小从而减少响应时间。流行的两个压缩js代码的工具是[JSMin](http://crockford.com/javascript/jsmin)和[YUI Compressor](https://developer.yahoo.com/yui/compressor/)，YUI compressor 也可以用于压缩CSS。 

混淆是代码优化的另一种方式，它比压缩更复杂，所以也更容易产生bug。对美国前10的网站调查发现，压缩可以减少21%的文件大小，而混淆可以减少25%。尽管混淆有更大的减少量，但风险相对压缩更大。  

除了压缩外部脚本、样式，内联的样式、脚本也应该压缩。即使你使用了Gzip，压缩仍可以再将文件大小减少5%或更多。文件越大，压缩的空间也越大 。  

<br/>

#### **避免重定向**  

*** 

重定向是通过301、302状态码实现的，下面这个栗子是一个301响应的http头：  

	HTTP/1.1 301 Moved Permanently
	Location: http://example.com/newuri
	Content-Type: text/html  

浏览器会自动将地址转到Location字段的值，重定向所需要的所有必要信息都包含在这个头中，响应体通常是空的。301和302响应都不会被缓存，除非加了额外的http头，比如Expires和Cache-Control来指定将其缓存。The meta refresh tag and JavaScript 也可实现重定向，如果必须重定向，推荐的方法是使用标准的3xx状态码，主要是为了确保后退按钮正常可用。

一种非常浪费的发生的很频繁并且开发者通常意识不到的重定向，是在url中遗忘了本该有的“/”，比如[http://astrology.yahoo.com/astrology](http://astrology.yahoo.com/astrology) 会返回301响应并重定向到[http://astrology.yahoo.com/astrology/](http://astrology.yahoo.com/astrology/)，这在Apahce中通过`Alias`或`mod_rewrite`被修复了，或者`DirectorySlash`如果你是使用Apache handlers。  

重定向常用于将旧网站迁移到新网站，使用重定向连接两个网站比较简单，不需要额外的代码。尽管这样使用重定向可以方便开发者，但是它降低了用户体验。如果两个网站的代码路径是在同一台服务器上，取而代之的方法是使用 `Alias` 和 `mod_rewrite`。如果是为了改变域名而使用重定向，替代的方法是新建CNAME 结合`Alias` 或 `mod_rewrite` 。 

<br/>  

#### **移除重复的脚本**  

***  

在同一个页面中引用两次一样的js文件会降低网页性能。这没有你想的那么少见，美国前10的网站中有2个引用了重复的脚本，在同一页面中重复引用脚本的几率和两个因素有关：团队的大小和脚本的数量。脚本重复引入会增加不必要的请求，同时浪费js的执行。

不必要的请求会发生在IE中，Firefox中不会发生。在IE中，如果脚本被引入两次并且不可缓存，它就会在页面加载过程中产生两次请求，即使脚本可以被缓存，当用户刷新页面的时候也会发生额外的请求。  

除了浪费请求，也会浪费时间多次解析js。解析时间的浪费在IE和Firefox中都会发生，无论脚本是否可被缓存。

避免意外引入相同脚本的一个方法是使用脚本模块化管理。通常引入脚本的方法是在html中增加一个script标签：  

	<script type="text/javascript" src="menu_1.0.17.js"></script>

也可以在php中创建一个`insertScript`函数：  

	<?php insertScript("menu.js") ?>   

除了防止脚本重复引入，这个函数也可以处理关于脚本的一些其他问题：比如为脚本文件名检查和增加版本号来支持Expires headers。   

<br/>   

#### **开发智能的事件处理程序**   

***   

有些网页体验上响应性不是很好，因为在不同的dom元素上绑定了太多的事件处理程序，然后处理程序频繁执行。这就是为什么使用事件代理是个好方法。如果在一个div中有10个button，只需在div上注册一个事件处理程序，而不是在每个按钮上都注册一个，事件会冒泡，所以你可以捕捉到事件来计算出它是由哪个button触发的。   

你也不必等待`onload`事件来开始操作dom。通常你需要的是确保要操作的dom元素已经在dom树中，你不必等待等待图片下载完成，你或许可以考虑使用`DOMContentLoaded`事件而不是`onload`事件。在它还没有被所有浏览器兼容之前，你可以使用 [YUI Event](https://developer.yahoo.com/yui/event/)中提供的` onAvailable`方法。  

更多相关信息可以查看 Julien Lecomte的["High Performance Ajax Applications"](http://yuiblog.com/blog/2007/12/20/video-lecomte/)

<br/>  

#### **不要在html中缩放图片**   

*** 

不要因为可以在html中设置图片宽高就使用比所需图片尺寸大的图片，如果你需要  

	<img width="100" height="100" src="mycat.jpg" alt="My Cat" />   

你就应该使用100px*100px的图片，而不是缩小了的500px*500px的图片。  

<br/>  

#### **使favicon.ico尽可能小并可缓存**   

***  

favicon.ico是存在服务器根路径下的一张图片，令人讨厌的是即使你不在意它，浏览器还是去请求这个图片，所以最好不要响应`404 NOT FOUND`。并且由于是在同一个服务器上，每次请求它时都会携带cookie。并且这个图片也会干扰资源下载顺序，比如在IE中，在onload事件中加载额外的资源，favicon.ico会在这些资源加载之前被加载。  

为了消除favico.ico带来的不好影响：   


* favico尽可能小，1k以下。  
* 设置一个你觉得合适的Expires header（因为当你想修改这个文件的时候你没法重命名），或许可以安全地将其设为几个月，可以通过查看当前favico.ico上次修改日期来决定将Expires header设置多久。  

<br/>

**相关阅读**：

* [前端性能优化相关](https://github.com/wy-ei/notebook/issues/34 https://github.com/wy-ei/notebook/issues/34)

**参考**：   

* [雅虎前端优化35条规则翻译](https://github.com/creeperyang/blog/issues/1)
