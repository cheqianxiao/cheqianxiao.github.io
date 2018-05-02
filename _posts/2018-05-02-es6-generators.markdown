---
layout: post
title: The Basics Of ES6 Generators【译】
header-img: other-bg.jpg
date:   2018-05-02 09:00:30 +0800
tags: javascript
---

原文地址： [https://davidwalsh.name/es6-generators](https://davidwalsh.name/es6-generators)

ES6带来的最激动人心的特性之一是一种新函数，叫做**generator**。这个名字乍听起来有一丢丢奇怪，但是它的行为看起来更奇怪。这篇文章的目标就是解释它的基本原理，并让你理解它为何如此强大。

### 运行到完成   

当我们谈论generators的时候，第一件要注意的事情是他们与那些“run to completion"的函数是不同的。
不管你是否有意识到，你经常会对函数做一些基础的假设： 一旦函数开始运行，它就会运行到结束，然后其他代码才能运行。

栗子：

	setTimeout(function(){
	    console.log("Hello World");
	},1);

	function foo() {
	    // NOTE: don't ever do crazy long-running loops like this
	    for (var i=0; i<=1E10; i++) {
	        console.log(i);
	    }
	}

	foo();
	// 0..1E10
	// "Hello World"

   
这里，这个for循环要花费非常长的时间，远超过1ms，但我们的计时器回调中的`console.log(..)`不能中断它的执行，所以计时器回掉就被堵塞在了事件循环的尾巴上，耐心的等待轮到自己执行。

如果`foo()`可以被中断，情况会怎样呢？会给我们的程序带来灾难吗？

那对多线程来编程来说确实是<del>噩梦</del>挑战，但幸运的是，我们是在js的世界，不用担心这些事情，因为js是单线程的（在某个时间只能有一个命令/函数被执行）。

注：web workers可以让你另开一个线程，让其他的js程序跑进来，和你主线程的js程序完全并行，然而它并不会给我们带来多线程的复杂度，因为两个线程只能通过异步事件来交流。这在事件循环中的“一次一个”的行为中是被允许的。

### 跑一会儿歇一会儿  


有了generators,我们有了一种完全不同的函数，可以在中途暂停一或多次，然后继续，让其他的代码可以在这些暂停的时间里执行。

如果你曾经阅读过任何关于并发或线程编程的文章，你或许看过“协作”这个术语，它指的是一个process（在我们的例子中就是指function）自己决定什么时候允许被打断，“preemptive”和这个概念正相反，它建议一个process/function可以违反它自己的意志被打断。

Es6 generator函数在它们的并发行为里是“协作”的，在generator函数体内，你可以使用新的关键词yield来从内部终止函数的执行，没有什么可以从外部暂停一个generator的执行，当它遇到yield的时候它就会暂停自己。

所以基本上，一个generator函数可以暂停和重启任意次数。实际上，你可以用一个永不结束的无限循环来指定一个generator（就像臭名昭著的`while(true){...}`），在正常的js程序中，这通常是疯狂或错误的，然而对generator来说，这是完全ok的，甚至有时候正是你需要的。

更重要的是，这种暂停和启动不仅控制了generator函数的执行，但是它也实现了generator函数中双向信息传递。在正常的函数中，你在开始得到参数，在最后通过return得到返回值。在generator中，你通过每次yield传出信息，并在每次重启中传入信息。

### 上语法

让我们深入这个新奇的generator函数的语法！

首先是新的声明语法： 

	function *foo() {
	    // ..
	}

注意到了上面的*吗？它长点有点奇怪。对那些从其他语言过来的人来说，这看起来有点丑陋，就像函数指针。但是千万不要被迷惑了！这只是一种用来标识这种新的generator函数类型的方法。

你可能见过其他的文章/文档使用`function* foo(){ }`而不是`function *foo(){ }`(*的位置不同)。两种都是正确的，但是最近我觉得后者更准确，所以我在这选择用这种。

现在让我们谈谈generator函数的内容，从很多方面来说，generator函数只是正常的js函数，并没有太多新语法，

我们首先要玩的新玩具，就是上面提到的：yield关键词，`yield ___`被称做是yield 表达式(不是语句)， 因为当我们重启一个generator函数的时候，我们会将一个值传进去，传进去的这个值就会成为yield表达式的计算结果。

栗子：

	function *foo() {
	    var x = 1 + (yield "foo");
	    console.log(x);
	}

当暂停generator函数的时候，`yield foo`表达式会将"foo"这个值传递出来，而且无论这个generator在何时被重启，传进去的任何值都将成为这个yield表达式的结果，然后会被和1相加后赋值给x这个变量。

看到了双向沟通吗？你把"foo"传出来，暂停你自己，在某个点之后（可能是马上也可能是很久之后），generator会被重启，然后返回给你一个值，就好像yield是发送请求获取某个值。

在任何表达式位置，你可以在表达式或语句中单独使用yield，默认会yield出undefined。
所以：  

	// note: `foo(..)` here is NOT a generator!!
	function foo(x) {
	    console.log("x: " + x);
	}

	function *bar() {
	    yield; // just pause
	    foo( yield ); // pause waiting for a parameter to pass into `foo(..)`
	}


### Generator迭代器

听起来有点拗口？

迭代器是一种特殊的行为，准确说是一种设计模式，我们通过调用`next()`遍历一个有序值集合中的每一个元素。举个栗子，对一个有5个值的数组[1,2,3,4,5]使用迭代， 第一次调用`next()`会返回1，第二次调用返回2，依此类推，当所有的值都被返回后，`next()`会返回`null`或`false`或者其他的信号来告诉你迭代完了数据集合中的数据。

我们从外面控制generator函数的方法是构建并和generator 遍历器交互，听起来有有点复杂？看看这个愚蠢的例子： 

	function *foo() {
	    yield 1;
	    yield 2;
	    yield 3;
	    yield 4;
	    yield 5;
	}

为了遍历这个`*foo()`函数中的值，我们需要构造一个迭代器，怎么做？
so easy！

	var it = foo();

按正常的方法调用这个函数什么都不会执行。

这个对你来说可能有点奇怪，你也许会试图想：为什么不是`var it = new foo()` (摊手)，这个语法背后的“why”实在是太复杂了，不在本文讨论范围（微笑）。

所以现在，要遍历我们的generator函数，我们只需要： 

	var message = it.next();

这样我们从那个`yield 1`中得到了1，但这不是我们唯一得到的东西：

	console.log(message); // { value:1, done:false }

实际上我们每次调用`next()`都将得到一个对象，它有个value属性，它的值正是那个被yield出来的值，另一个属性done是一个布尔值，表示generator函数是否被遍历完了，
继续我们的遍历：  


	console.log( it.next() ); // { value:2, done:false }
	console.log( it.next() ); // { value:3, done:false }
	console.log( it.next() ); // { value:4, done:false }
	console.log( it.next() ); // { value:5, done:false }


有趣的是： 当我们得到5之后done仍旧是false，那是因为，技术上，generator函数并没有结束，我们必须调用最后一次next()，如果我们传进一个值，它会被设置为`yield 5`这个表达式的结果，直到那时generator函数才算被遍历完了。

所以现在：  

	console.log( it.next() ); // { value:undefined, done:true }

所以现在generator函数的最终结果是我们完成了这个函数，但是没有返回值（因为我们已经用光了`yield ___`语句）

这时你可能会想： 我可以在generator函数中使用`return`吗？如果我这么做，这个值会通过value属性传递出来吗？

答案是：YES！  

	function *foo() {
	    yield 1;
	    return 2;
	}

	var it = foo();

	console.log( it.next() ); // { value:1, done:false }
	console.log( it.next() ); // { value:2, done:true }

oh！不是的！

在generators中依赖return并不是一个好的idea, 因为当用`for of` 遍历generator函数的时候（见下面），最后return的值会被丢掉。

为了完整性，让我们看一下遍历generator的时候，如何传进传出messge：

	function *foo(x) {
	    var y = 2 * (yield (x + 1));
	    var z = yield (y / 3);
	    return (x + y + z);
	}

	var it = foo( 5 );

	// note: not sending anything into `next()` here
	console.log( it.next() );       // { value:6, done:false }
	console.log( it.next( 12 ) );   // { value:8, done:false }
	console.log( it.next( 13 ) );   // { value:42, done:true }

你可以看到我们仍然可以传进去参数，（栗子中的x）通过最开始的`foo(5)`遍历器实例化调用，就像调用正常的函数一样，使x的值为5。  

第一个next()调用，我们没有传任何东西，为什么？因为没有yield表达式来接收我们传进去的值。

但是如果我们确实要在第一个next()调用时传参，没有什么不好的事情会发生，
es6中规定在这种情况下，generator会忽略没有用到的值，（注：写此文的时候，FF和chrome的nightly版本都是运行ok的， 但有些浏览器可能不会完全遵守，会非常不识趣地抛出错误）

`yield (x+1)`的结果是6，第二次`next(12)`，将12传给正处于等待状态的`yield(x+1)`表达式，所以y的值变成了`12*2`，即24，然后`yield(y/3) （yield 24/3）`的结果是8.第三次`next(13)`调用将13传给处于等待状态的表达式`yield(y/3)`，使z的值变为13。

最后，`return (x+y+z)` 即 `return (5+24+13)`，所以最后返回的value是42。  

多看几遍，大多数人刚开始看的时候都有点懵逼。  

### for.. of 

ES6在语法层面也拥抱了这个遍历器模式，通过提供直接运行遍历器的方法： `for.. of`循环。  


栗子：  

	function *foo() {
	    yield 1;
	    yield 2;
	    yield 3;
	    yield 4;
	    yield 5;
	    return 6;
	}

	for (var v of foo()) {
	    console.log( v );
	}
	// 1 2 3 4 5

	console.log( v ); // still `5`, not `6` :(

如你所见，`foo()`创造的遍历器自动被`for..of`循环捕捉到，它自动为你遍历，每次遍历出一个值，直到done变为true，只要done还是false，它就会自动提取出value属性，并把它赋值给你的遍历变量（栗子中的v），一旦done变为true，遍历循环就停止了（对于最后返回的value什么也不会做，如果有的话）。

如上所述，你可以看到`for..of`循环忽略并丢掉了`reutrn 6`。 另外，因为没有暴露`next()`调用，使用`for..of`，你是没有办法像上面那样向generator传值的。  

**总结** 

这就是generators的基础，如果还有点绕，请不要方，最开始都是酱紫的。  


我们会很自然地想到这个新玩具可以用来点什么实际的事情，有很多的呢~ 只是我们现在接触到的还只是一点皮毛，要深挖才能明白它有多强大！

当你玩了上面一些代码后，下面一些问题可能会出现，

1. 如何处理错误？
2. 一个generator可以调用另一个generator吗？
3. 如何用generator做异步事情？

这些问题将在之后的文章被涉及，敬请期待！