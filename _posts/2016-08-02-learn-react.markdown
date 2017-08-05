---
layout: post
title: react入门学习笔记
header-img: other-bg.jpg
date: 2017-08-02 09:00:30 +0800
tags: react 
---


learn-react 过程中遇到的坑，记录之。
***
总体概念： react中的任何东西都可以看作组件
>严格的单向数据流是 Redux 架构的设计核心。

大括号中可以包含一段可执行的js代码或表达式
坑： 
不支持jsx中的html标签出现语法错误： 增加babel prest react
Link从react-route中获得
添加路由时出现Router.js?b709:31 Uncaught TypeError: Cannot read property 'location' of undefined
听说换成npm install react-router@3.0.5就好了 没用 Link form react-router就好了
windows 下node-sass安装失败
set SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/
npm install node-sass
https://github.com/lmk123/blog/issues/28

发送请求的时候dispatch一个action，接收到返回数据又dispatch一个action

>react采用setState来控制视图的更新。setState会自动调用render函数，触发视图的重新渲染，如果仅仅只是state数据的变化而没有调用setState，并不会触发更新。 组件就是拥有独立功能的视图模块，许多小的组件组成一个大的组件，整个页面就是由一个个组件组合而成。它的好处是利于重复利用和维护。

>当我们使用组件< Main />时，其实是对Main类的实例化——new Main，只不过react对这个过程进行了封装，让它看起来更像是标签。