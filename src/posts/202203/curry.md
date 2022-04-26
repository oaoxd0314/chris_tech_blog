---
title: FP - Curry, 不是吃的也不會射三分
description: 柯里化 (Currying) 是指，將接受 n 個參數的 function 轉變成 n 個只接受一個參數的 function 的過程。
date: 2022-03-12
scheduled: 2022-03-12
tags: Functional Programming
image: https://i.imgur.com/8aoyqbg.png
imageAlt: 'curry image'
layout: layouts/post.njk
---
![an image](https://i.imgur.com/8aoyqbg.png)
柯里化 (Currying) 是指，將接受 n 個參數的 function 轉變成 n 個只接受一個參數的 function 的過程。

```js/2/4
const plus = (a,b) =>{
    return a + b
}

// curry
const plus = (a) =>{
    return function(b){
        return a+b
    }
}
```

我們可以運用[閉包（closuer）](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Closures)的特性傳入第一個固定參數，讓 currying 的 function `plus` 記住，之後就可以重複運用:

```js/2/4
const plusTEN = plus(10)

let a = plusTEN(plusTEN(1)) //21
```

同時，為了能更快的使用 curry，我們可以透過 loadsh 來達成

```js/2/4
import _ from 'loadsh'

const plusCurry = _.curry(function(a,b){
    return a+b
})

const plusTEN = plusCurry(10)

let a = plusTEN(1) // 11

//還可以這樣用
let b = plusCurry(2)(3) //5
let c = plusCurry(2,3)  //5
```

### what for

當然，知道了這個酷酷的新東西後，一定要知道他實際上可以怎麼運用，以下就來舉個案例：

我們需要能夠從一大堆資料當中，快速找到特定幾個我們想要的資料

```js/2/4
// data
const messData = ['12','1 2','1-2','3 4']
```

首先，搞清楚目的，我們要從 array 中，找到符合的特定字串（假設是 `' '` 和 `'-'` ），因此我們就可以創造以下兩個 curry function:

```js/2/4

const matchStr = (target)=>{
    return function(text){
        return text.match(target)
    }
}

const filter = (fun)=>{
    return function(arr){
        return arr.filter(fun)
    }
}

// 或是你可以用 lodash 更優雅的寫 curry
const matchStr = _.curry(function(target,text){
    return text.match(target)
})

const filter = _.curry(function(func,arr){
    return arr.filter(func)
})
```

接著，假設我們要從這一堆東西中，找到含有 `' '` 和 `'-'` 的字串，就可以快速透過我們剛剛定義好的 curry function 達成:

```js/2/4
const matchSpace = matchStr(/\s+/g)
const matchDash = matchStr(/\-/g)

const findSpace = filter(matchSpace)
const findDash = filter(matchDash)

let hasSpace = findSpace(messData) // ['1 2','3 4']
let hasDash = findDash(messData) //['1-2']
```

### 總結

從以上的實作中，我們可以知道 curry 其實就是一個創造樣板程式碼的方法。

我們可以透過抽象 function 來創造一個又一個的 curry function，如此一來就可以寫出簡潔又快速的程式碼。

* 閉包（colsure） 是一個可以將參數封裝在 function 內，藉此讓 function 可以重複帶入固定值的技術（可以讓 function 像線行工廠般作用），延伸閱讀[閉包](https://superficial-trumpet-b43.notion.site/Closure-b8e0ab2ca48844649bc8115ff772818e)。
* curry 一次只傳入一個參數 => 提高程式的彈性與可讀性，一次傳入多個的方法叫做「區域性應用（Partial application）」，當抽象的 curry function 有多個參數時可以考慮使用，可大幅減少樣板程式碼（但同時底層可重複利用的邏輯也變少了）
* one input, one output 超級符合 pure function 的定義。

更多詳細的參考與詳細描述在[這裡](https://superficial-trumpet-b43.notion.site/FP-Curry-fc3b4828410f484f9fc8576e65d69756)。
