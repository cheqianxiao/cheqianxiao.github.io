---
layout: post
title: 前端面试题——JavaScript
header-img: other-bg.jpg
date:   2017-07-30 08:00:30 +0800
tags:  前端面试 
---

搜集自己面试中遇到的、没遇到的、理解的、不理解的面试题。


* * *
### **js数据类型**


原始类型： number string boolean null undefined symbol

引用类型： object

本质上，js中所有的数据都属于对象（广义）  

**symbol**   
ES6为防止属性名冲突引入的第七种数据类型，一种类似字符串的数据类型。
	
	var s = Symbol()
	typeof s //symbol  

每一个symbol值都是不相同的，即使传入参数相同   

	var s1 = Symbol('s')
	var s2 = Symbol('s')  
	s1 === s2 //false  

***

### **判断数据类型的方法**
             
**typeof 运算符**

	typeof "123" === "string"

	typeof 123  === "number"

	typeof false  === "boolean"

	typeof undefined === "undefined"

	typeof null === "object" //(意不意外？惊不惊喜？)

	typeof (()=>{}) === "function" 

    //其他都返回 "object"

***

### **数据类型的转换**
     
#### **强制转换**
  使用Number、String和Boolean三个构造函数

**Number**

1） **原始类型的转换**

number 本身  
string 无法转换成number就返回NaN（栗子： `Number('2b')`返回NaN）  
boolean true转1  false转0  
undefined 转NaN   
null 转0

Q： 在将string转number时，`parseInt`和`Number`的区别？  
A： 后者更严格，只要有一个字符无法转成数字就返回NaN（但是会自动过滤空格）

2） **对象的转换**

都返回`NaN`（单个数值的数组例外） 
背后的转换机制：  
使用对象本身的`valueOf`（优先）或 `toString` 方法尝试得到一个原始类型的值，再对这个值使用`Number`函数。得不到就报错。  
用代码表达就是酱紫：

	if (typeof obj.valueOf() === 'object') {
	  Number(obj.toString())
	} else {
	  Number(obj.valueOf())
	}

**String**

1）**原始类型的转换**  

  number 相应字符串  
  string 本身  
  boolean 相应字符串  
  undefined 相应字符串  
  nul 相应字符串

2）**对象的转换**

背后的转换机制：  
使用对象本身的toString（优先）或 valueOf 方法尝试得到一个原始类型的值，再对这个值使用`String`函数。得不到就报错。  
用代码表达就是酱紫： 

	if (typeof obj.toString() === 'object') {
	  Number(obj.valueOf())
	} else {
	  Number(obj.toString())
	}

**Boolean**

除`null` `undefined` `0` `+0` `-0` `''`这6个值为false外，其他都为true

#### **隐式转换**

规则： 期望什么类型的值就调用该类型的转换函数

**自动转换为布尔值**

期望为布尔值的地方：条件语句中或逻辑运算符后面

**自动转为字符串**

期望为字符串的地方：加法运算中，其中一个值为字符串，另一个为非字符串。后者将被转字符串。

**自动转为数值**

期望为字符串的地方：除加法运算符外的其他运算符前后的运算子

参考： [http://javascript.ruanyifeng.com/grammar/conversion.html](http://javascript.ruanyifeng.com/grammar/conversion.html) 

***

### **`null` 和 `undefined`的区别**
    
null 表示空值  
undefined 表示未定义

***

### **内置对象**

数据封装类对象: Object、Array、Boolean、Number、String  
其他对象： Functiton、Arguments、Math、RegExp、Date、Error、Console

***

### **原型和原型链**

所有函数都有一个prototype属性

	function Person(){
		this.legs = 2
		this.head = 1
	}
	Person.prototype.eat = function(){
		console.log("I'm hungry!")
	}

	Person.prototype 
	{
		constructor: Person,
		_proto_: Object.prototype,
		eat: function(){}
	}
	var Coder = function(){
		Person.call(this)
	}

	Coder.prototype = new Person()
	//another way
	Coder.porototype = Object.create(Person.prototype)

	Coder.prototype.code = function(){ console.log('bug')}

	var me = new Coder()

这样就实现了构造函数和原型的方式模拟出一个Person类，并让Coder类继承了Person类，实现了类的继承，完成了oop中的“封装”、“继承”
![原型链示意图](http://7xq6lv.com1.z0.glb.clouddn.com/prototype-chain.png)  
新创建的实例foo的原型会指向Foo.prototype

***



### **创建对象的方式**
        
1. 对象字面量方式
2. 工厂方式
3. 构造函数方式
4. 原型
5. 混合

***

### **实现继承的方式**
`Object.create(Foo.prototype)`  
创造一个空对象，该对象的原型指向Foo.prototype  
Ojbect.create的ployfill 

	if(!Object.create){
	  Object.create = function(proto){
	    function F(){}
	    F.prototype = proto
	    return new F()
	  }
	}

`var foo = new Foo()`  
foo的原型指向Foo.prototype 



***

### **`eval`**

eval将js中的字符串解析成js代码并运行。  
返回值就相当于在控制台运行这段代码得到的返回值  
在函数中间接调用eval会使它工作在全局环境中，并不是在函数中。  
栗子： 

    function a(){
	  var b = 3
	  var geval = eval
	  geval('console.log(b)')
	}
    a() // thorw reference error: b is not defined

***

### **window 和 document**

window对象是指浏览器打开的窗口  
document对象是指文档对象 window对象的一个属性

***

### **数据排序（乱序、升序）、去重**

乱序

	var arr = [1,2,3,4,5,6,7,8,9,10]
	arr.sort(function(){
	  return Math.random() - 0.5
	})


升序

	var arr = [1,2,3,4,5,6,7,8,9,10]
	arr.sort(function(a,b){
	  return a - b
	})

去重

	var arr = [1,2,1]
	var uniqueArr = [...new Set(arr)]  

Set是ES6提供的一种新的数据结构，类似于数组。Set本身是个构造函数，用来生成Set数据结构。

	var s = new Set()
	//添加成员的方法
	s.add(3)  

Set函数接受一个数组（或其他具有iterable接口的其他数据结构）作为参数  
	
	var set = new Set([1,2,2])
	set.size //2  

Set实例的属性： `size` 返回成员的数量   
Set实例的方法： 
`add(value)` 添加成员  
`delete(value)` 删除成员，返回一个布尔值表示是否删除成功  
`has(value)` 是否有该成员，返回一个布尔值  
`clear()` 清除所有成员，无返回值  

Array.from()可以将Set数据结构转为数组 
	
	var set = new Set([1,2,2])
	Array.from(set) // [1,2]  


***  

### **变量声明提前**

**变量初始化阶段**  
变量对象（VO)按如下顺序填充：   
1. 函数参数（若为传入，初始化值为undefined）
2. 函数声明（若发生命名冲突，会覆盖）
3. 变量声明（初始化值为undefined，若发生命名冲突，会忽略）

**函数执行阶段**  
进行赋值

### **作用域链**

内层作用域可以访问到它外层作用域的变量，反之则不行。

***

### **闭包**

**背景**  
当一个函数执行完后，它其中的局部变量会被垃圾回收机制回收（销毁）

**垃圾回收原理** 

找出那些不再继续使用的变量，释放其占用的内存。
> 函数中局部变量的生命周期：只存在于函数的执行过程中。在此过程中，会为局部变量在栈或堆内存中分配存储空间，然后在函数中使用这些变量直到函数执行结束。 在这种情况下很容易判断是否要销毁某个变量。但并非所有情况都这么简单，所以会使用到一些策略来标记无用变量，这些策略因实现而异，具体到浏览器中，有两个常用策略： **标记清除** 和 **引用计数**（目前大多数浏览器都是采用前者）

**管理内存**  

> 分配给Web浏览器的可用内存数量通常要比分配给桌面应用程序的少，这样做的主要目的是出于安全方面的考虑，目的防止运行JavaScript的网页耗尽全部系统内存而导致系统崩溃。内存问题不仅会影响**给变量分配内存**，同时还会影响**调用栈**以及**在一个线程中能够执行的语句数量**。  

> 因此，确保占用最少的内存可以让页面获得更好的性能。而优化内存占用的最佳方式，就是为执行中的代码只保存必要的数据。一旦数据不再有用，最好通过将其值设置为null来释放其引用——这种做法就叫**“解除引用”**，这一做法适用于大多数全局变量和全局对象的属性。局部变量会在它们离开执行环境时自动被c


—— 《js高级程序设计》 4.3垃圾收集

具有first-class function特性的语言中都有闭包的概念。  
闭包可能会带来内存泄漏问题

**闭包的用处**  
1. 封装私有变量  

   一个外部函数返回一个内部函数，内部函数又引用了外部函数的局部变量。那么这个局部变量就不会在外部函数执行完后被垃圾回收机制回收，会一直存在于内存里。 只能通过返回的内部函数去操作这个变量。  
   用代码表达就是酱紫：
{% highlight javascript %}
var outer = function(){
  var localVal = 1
  return {
    get: function(){
      return localVal
    },
    add: function(){  
      return localVal + 1  
    }  
  }  
}	
{% endhighlight %}


***

### **this**

函数中的this取决于函数的执行环境而不是创建环境

1. 作为对象的方法被调用，其中的this指向该对象
2. 全局环境下的this指向window 
3. 事件处理程序中的this 指向添加该事件处理程序的dom对象，即`event.currentTarget`。（IE中的attachEvent例外，用它添加的handler中的this指向window）

`call` `apply` `bind`都可以改变函数中this的指向  

**区别：**  

`fn.call(thisArg, arg1, arg2, arg3, ...)`  `fn.apply(thisArg, [argsArray])` ：改变fn中的this指向并执行fn，二者的区别在于传递的参数不一样。   
`fn.bind(thisArg, arg1, arg2, arg3, ...)`  ：改变fn中this的指向，但并不执行fn





***

### **严格模式**

`'use strict'`: es5中添加的严格运行模式
使用它的好处：  
提高编译器效率，增加运行速度。

***

### **DOM事件流**

3个阶段： 捕获 目标 冒泡  
`event.eventPhase`用来确定当前正处于事件流的哪个阶段，捕获、目标、冒泡对应的`eventPhase`分别为1、2、3。  
多数情况下将事件处理程序添加到冒泡阶段（最大限度兼容各种浏览器） 在有特殊需求的情况下才添加到捕获阶段

***

### **this、target、currentTarget**

在事件处理程序内部， this 和 currentTarget 始终相等，都等于注册事件处理程序的元素。而target表示事件的目标元素。

***

### **跨浏览器的事件处理程序（事件侦听器）**  
{% highlight javascript %}
var EventUtil = {
getEvent: function(event){
  return event || window.event
},
getTarget: function(event){
  return event.target || event.srcElement
},
prevenetDefault: function(event){
  if(event.preventDefault){
     event.preventDefault()
  }else {
     event.returnValue = false
  }
},
stopPropagation: function(event){
  if(event.stopPropagation){
    event.stopPropagation()
  }else {
	event.cancelBubble = true
  }

},
removeHandler: function(){
  if(el.removeEventListener){
  el.removeEventListener(type,handler,false)
    }else if(el.detachEvent){
      el.detachEvent('on'+type,handler)
    }else {
      el['on'+type] = null
    }
},
addHandler: function(el,type,handler){
  if(el.addEventListener){
	el.addEventListener(type,handler,false)
  }else if(el.attachEvent){
    el.attachEvent('on'+type,handler)
  }else {
    el['on'+type] = handler
  }

},

}
{% endhighlight %}

### `["1", "2", "3"].map(parseInt)`返回结果

[1,NaN,NaN]

***

### **js延迟加载的方式**

defer和async   
动态创建DOM方式  
按需异步载入js  

***

### `setTimeout` 和 `setInterval`
       
**setTimeout**

第一种语法 `setTimeout(function[,delay])`  
第二种语法 `setTimeout(code[,delay])`  code是要执行的代码字符串，不推荐此语法，原因和不推荐eval一样  
（ps：某次面试中出题人用了这样的语法，还怀疑他写错了ORZ） 

返回值： 一个定时器编号（整数）

另：

	var a = function(){
	   console.log(1)
	}
	setTimeout(a,1000) //1秒后输出1
	setTimeout('a()',1000) //同上 （第二种语法）
	setTimeout(a(),1000) //立即输出1

***
### **offsetWidth clientWidth scrollWidth** 


参考：
1. [前端面试题](https://github.com/markyun/My-blog/tree/master/Front-end-Developer-Questions/Questions-and-Answers)

