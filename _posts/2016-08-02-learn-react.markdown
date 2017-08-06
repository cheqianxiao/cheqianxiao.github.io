---
layout: post
title: react入门学习笔记
header-img: other-bg.jpg
date: 2017-08-02 09:00:30 +0800
tags: react 
---


learn-react 过程中遇到的坑，记录之。

*** 


Some Concepts:  

>react中的任何东西都可以看作组件  

>严格的单向数据流是 Redux 架构的设计核心。  

>组件就是拥有独立功能的视图模块，许多小的组件组成一个大的组件，整个页面就是由一个个组件组合而成。它的好处是利于重复利用和维护。  

>当我们使用组件< Main />时，其实是对Main类的实例化——new Main，只不过react对这个过程进行了封装，让它看起来更像是标签。  

>react采用setState来控制视图的更新。setState会自动调用render函数，触发视图的重新渲染，如果仅仅只是state数据的变化而没有调用setState，并不会触发更新。 

知识点：  

* 发送请求的时候dispatch一个action，接收到返回数据又dispatch一个action  

坑：  

1. 使用jsx中标签时报语法错误： 使用`babel-prest-react` 
2. 添加路由时出现： `Uncaught TypeError: Cannot read property 'location' of undefined`   
google之，有人说是版本问题，我安装的版本是react@15.4.2 和 react-router@2.0.0，换了版本还是没用，后来发现是Link的引入问题，
Link是从`react-router`引入，而不是`react-router-dom`。 
3. windows 下node-sass安装失败  

		set SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/  
		npm install node-sass

    感谢作者：[https://github.com/lmk123/blog/issues/28](https://github.com/lmk123/blog/issues/28)
 




