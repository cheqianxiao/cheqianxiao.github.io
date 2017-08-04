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
redux是单向数据流

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