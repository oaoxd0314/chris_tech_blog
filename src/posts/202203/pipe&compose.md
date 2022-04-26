---
title: FP - 組合函數 Compose vs Pipe
description: 接續上篇 curry，我們講解了如何將一個函式拆解成一個個可重複利用的 curry function。但連結過多的 function 將會讓可看性大幅度下低，就如同下面的例子：目前有一個會抓取物件名稱的 function...
date: 2022-03-18
scheduled: 2022-03-18
layout: layouts/post.njk
tags: Functional Programming
---
## 為什麼需要組合函數

接續上篇 [curry](https://hackmd.io/@ChrisW/SJNNgcyWq)，我們講解了如何將一個函式拆解成一個個可重複利用的 curry function，[very beautiful,very powerful]((https://www.youtube.com/watch?v=Z-TxcpB6yNY))。

但連結過多的 function 將會讓可看性大幅度下低，就如同下面的例子：

目前有一個會抓取物件名稱的 function

```javascript
const getName = (person) => person.name;
```

另一個會將字型變成大寫：

```javascript
const uppercase = (string) => string.toUpperCase();
```

如果想要拿取一個資料內的名字，並將他轉為大寫，就會像這樣：

```javascript
const data = {name:'chriswang'}
uppercase(getName(data)) //CHRISWANG
```

現在我只想要抓到前5個字元：

```javascript
const get5Characters = (string)=>string.substring(0,5)
get5Characters(uppercase(getName(data))) //CHRIS
```

接下來隨著需求擴張，我可能還需要 A、Ｂ、Ｃ、Ｄ... 等功能：

```javascript
A(B(C(...(get5Characters(uppercase(getName(data)))))) // ....
```

這樣一來別說你同事會想貓你一拳，連你自己都會想把這行刪掉。

> curry 其實就只是一個將 function [抽象化](https://hackmd.io/MZvwMweFR-Sv1RMTXRvXkg)的過程，重複可使用的 function 能大幅提高程式的簡潔度，更有降低耦合提高內聚的良好功用。
>以上內容都會在說明 [Functional Programming](https://hackmd.io/NeQCFGazQ3i4FC1UtGrP6w) 時詳細說明，你可以先把他暫時想成另一種相比於 OOP 的另一種 Design Pattern 就好 。

## Compose

開門見山的說，這就是 compose :

```javascript
const compose = function(g, f) {
  return function(x) {
    return g(f(x));
  };
};

// 或者採用 arrow function 的寫法 會更加整潔
const compose = (g,f) => x => g(f(x));
```

我們可以藉由 compose 將兩個 function 結合，達到讓程式碼簡化的目的。

可以注意到的是，在 compose 的定義中，f 會在 g 之前執行，而建立一個**由右至左的資料流**，也可以稱為左傾（left direction），注意是由右至左，而非由內而外。

![其實 compose 這概念也是從數學來的 photo by medium](https://i.imgur.com/TCOs2DZ.png)

現在將上述的例子使用 compose 實作看看：

```javascript
const data = {name:'FrankChou'}
// 將要先執行的 function 放在右邊
const uppercaseName = compose(uppercase,getName)

uppercaseName(data) // FRANKCHOU
```

那麼問題來了，要如何串接 2 個以上的 function 呢？

## 合成 n 個 function

### 結合律

前面也提到 compose 這個概念來自於數學，因此他擁有一般計算的特性 — 結合律，意思就是說：

```javascript
// 結合律（associativity）
// 不管我是先將哪個 fumction 組合，其結果都會是一樣的
const associative = compose(g, compose(f, h)) === compose(compose(g, f), h);
```

因此我們就能透過 compose 不斷的組合，不過還有更好的選項。

### 可變量參數

透過展開運算子(...) 和 reduceRight() 重新定義 compose 來達成 2 個以上的任意組合：

```javascript
const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);
```

接下來我們將上述例子中全部的 function 組合再一起：

```javascript
const uppercaseName = compose(get5Characters,uppercase,getName)
const data = {name:'FrankChou'}

uppercaseName(data) // FRANK
```

這邊需要在注意一次順序，由於 compose 是由右至左的運算過程，因此會將最需要先執行 `getName` 放在第一個。

## Pipe

pipe 和 compose 唯一的差別就是執行順序（ `reduce` ＆ `reduceRight`），因此可以說 pipe 就像是反向的 compose：

```javascript
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
```

pipe是由左至右的運算方式，所以在使用 pipe 時，會像這樣：

```javascript
const uppercaseName = pipe(getName,uppercase,get5Characters)
const data = {name:'FrankChou'}

uppercaseName(data) // FRANK
```

### Point free

> Pointfree style means never having to say your data

意思是指，function 不必提及要操作的資料是什麼樣的。`First Class Function` ( 將 function 當作參數傳送)、 [FP - 柯里化 (Curry)](https://hackmd.io/@ChrisW/SJNNgcyWq)  及 `compose` / `pipe` 協作起來非常有助於建立這種模式。

先來看個沒有 point free 的版本吧：

```javascript
const snakeCase = function(word) {
  return word.toLowerCase().replace(/\s+/ig, '_');
};
```

在這個 function 中，一定要先定義一個參數 `word`，才能繼續設定後續的操作，聽起來很正常吧，那現在來看看 point free 的做法：

```javascript
const snakeCase = compose(replace(/\s+/ig, '_'), toLowerCase);
```

這兩者的差別就在於，當需要實做 function 時，要不要提及參數本身。

Pointfree 幫助我們移除不必要的命名，讓程式碼保持簡潔和通用

同時 Pointfree 對於 functional 來說也是個很好的試金石，因為這能幫助我們了解一個 function 是否為接受回傳回來的下一個 function，例如 `compose` 無法用於 `while` 。

並不需要特意去追求 Pointfree —— 就跟 PureFunction 一樣，該用的時候使用，不該用的時候回歸原本就好了。

> PureFunction 意指相同的輸入，永遠會得到相同的輸出，而且沒有任何顯著的副作用

### DeBug

先看個範例：

```javascript
const R = require('ramda');
const data =['frog', 'eyes']

let reverse = R.reduce((acc, x) => [x].concat(acc), []);

let exclaim = (x) => x + '!'
let toUpperCase = (x) => x.toUpperCase()

let angry = compose(exclaim, toUpperCase);
```

接著我們來看看以下這個有什麼問題：

```javascript
const latin = compose(angry ,reverse);
latin(data)
```

首先我們知道 compose 是由右至左( <- )的運算方式：

- `reverse()` 接收 array 並無問題
- 但 `angry()` 內的兩個 function 都只接受 string ⇒ `angry()` 拿到的資料卻是 array ⇒ 出事啦 阿北

於是我們發現問題了，我們將 angry 包裹上 map，讓他接收到 array 內的 string， 問題解決

```javascript
const latin = compose(R.map(angry) ,reverse);
latin(data) //[ 'EYES!', 'FROG!' ]
```

但是，這並不好找誒，所以我們必須想出一個辦法

## Trace

我們不可能有這麼多的時間，在出錯時一步一步往回推，所以需要一個機制來幫助快速找到問題點

定義一個會產生 log 的 function，以下只有設置提醒的 'tag' 和目前傳進來的資料：

```javascript
const trace = curry(function(tag, x) {
  console.log(tag, x);
  return x;
});
```

以上個例子來講，我們將 function 放置在我們覺得沒問題的 function 之後：

```javascript
const latin = compose(angry,trace('after reverse data :'),reverse);
latin(data) 
// after reverse data : [ 'eyes', 'frog' ]
// error message : ...
```

可以輕易地發現問題出在哪裡 — 我需要 string 但卻傳送了 array 進來。

> 這個 trace function 可以算是一個簡單的示範，如果 compose 之中有更多複雜的資料流，就可以使用更多的監控方式。    

## 總結

事實上 pipe compose 等實用的功能都有人整理成函式庫，例如：[ramda](https://www.npmjs.com/package/ramda)、[lodash](https://www.npmjs.com/package/lodash)、[underscore](https://www.npmjs.com/package/underscore)。

他們的作用都是大神們整理好的實用 function，讓人不用費心理解底層實作就能立即使用。

## 參考連結

知乎 [https://zhuanlan.zhihu.com/p/52207982](https://zhuanlan.zhihu.com/p/52207982)
freecodecamp [https://www.freecodecamp.org/news/pipe-and-compose-in-javascript-5b04004ac937/](https://www.freecodecamp.org/news/pipe-and-compose-in-javascript-5b04004ac937/)

medium [https://betterprogramming.pub/compose-and-pipe-in-javascript-medium-d1e1b2b21f83](https://betterprogramming.pub/compose-and-pipe-in-javascript-medium-d1e1b2b21f83)

 gitbook [https://jigsawye.gitbooks.io/mostly-adequate-guide/content/ch5.html](https://jigsawye.gitbooks.io/mostly-adequate-guide/content/ch5.html)