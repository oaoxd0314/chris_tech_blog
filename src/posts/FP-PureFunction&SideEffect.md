---
title: FP - Pure Function & Side Effect
tags: 
 - "Functional Programming"
description: Pure function 意指相同的輸入，永遠會得到相同的輸出，而且沒有任何顯著的副作用 (side effect)。在 FP 的最小單位就是一個 function，舉凡像是 curry、compose、pipe 都是不斷重複 function 去達成需求。所以必須確保每一個最小單位，都是可以預測的（沒有任何副作用），這樣才能放心使用這些功能。
date: 2022-04-24
scheduled: 2022-04-24
image: https://i.imgur.com/4l6649U.png
imageAlt: 'pure function'
layout: layouts/post.njk
---

在理解了一些 FP 的小技巧，像是 [compose & pipe](https://hackmd.io/@ChrisW/rJkCui-Gq) 和 [curry](/T2ODjTcrTJW9Z2xExurFsg) 之後，為了能夠更好的運用這些技巧，我們要來好好說說在 FP 的核心觀念 - Pure Function。

## 什麼是 Pure Function

![pure function 示意圖](https://i.imgur.com/4l6649U.png)

Pure function **意指相同的輸入，永遠會得到相同的輸出**，而且沒有任何顯著的副作用 (side effect)。

在 FP 的最小單位就是一個 function，舉凡像是 curry、compose、pipe 都是不斷重複 function 去達成需求。

所以必須確保每一個最小單位，都是可以預測的（沒有任何副作用），這樣才能放心使用這些功能。

## 副作用 Side Effect

side effect 可以理解成 **在運算的過程中，改變了狀態或是對外部區塊進行交戶**。

但 JS 是指令式程式（Imperative Languages），Function 幾乎不可避免地會有 side effect，常見的 side effect 如下：

---

- **修改外部的 state** ⇒ 例如狀態控制：假設下拉式選單選了某個值，因此我們需要儲存那個值，來完成後續動作（view、call request）
- **發送 HTTP Request** ⇒ 只要不是靜態頁面幾乎都會碰到
- **Rendering screen** ⇒ 這就不用說了，切換tab，基本上就會 render，更不要說其他觸發動作了
- **使用會改變原陣列/物件的 JS method** (eg. arr.splice) ⇒ 透過使用 [Persistent Data Structure](https://fuzhe1989.github.io/2017/11/07/persistent-data-structure/) 或使用 [不會改變資料本身的方法](https://hackmd.io/@ChrisW/SkaKvvAEc)，或更直接一點，直接創立新物件再來更改。
- **修改任何外部變數** ⇒ 可盡量避免啦。
- **DOM 操作** ⇒ 原則上 js 任何動作都是需要操作 dom 的，所以 :P。
- **Changing DB value** ⇒ 除非只有單純的 select 不然就算是送表單也會碰到。
- **logging & console**: 改變了系統狀態 ⇒ debug 完記得刪掉就好。

---

總歸一句話來講，跟 output 沒關係的動作都會被視為 side effect(只要跟 function 以外產生交互作用就算)。

但 side effect 只是可能會造成 BUG 的原因，不代表我們要禁止使用一切的 side effect，而是說要讓他們在**可控制的範圍**內發生，就例如：

### 1. 使用 immutable data 或 避免改變資料本身

意思是說，**避免去改變原本的資料**，如上面所提到的使用 [Persistent Data Structure](https://fuzhe1989.github.io/2017/11/07/persistent-data-structure/) 或使用 [不會改變資料本身的方法](https://hackmd.io/@ChrisW/SkaKvvAEc) 都可以有效的避免 side effect。

例如，你想從 array 取出某一段，與其用 `splice` 不如用 `slice`：

```jsx
let data = [5,1,2,3,4]

console.log(data.slice(2,3)) // 2
console.log(data) // 5 1 2 3 4 => 不被影響
// --- 

console.log(data.splice(2,3)) //2
console.log(data) // 5 1 3 4 => 被影響

```

或者，你想使用 `push` `shift` `pop` 去改變/取得資料，不如使用解構賦值 `...` ：

```jsx
const arr = [1, 2, 3];

const arr4 = [0, ...arr, 4]; // 取代 push 跟 unshift
const [head, ...rest] = arr; // 取代 shift
const { [arr.length - 1]: last  } = arr; // 取代 pop
```

### 2. 依賴注入（Dependency injection）

把問題丟給別人，我們可以把 impure function ( 會造成 side effect ) 在別的地方做完之後再傳進 pure function 就好，簡單來講就是切的細一點：

```jsx
function logSomething(something) {
    const dt = (new Date()).toISOString(); // new Date 每次產生的值不一樣
    console.log(`${dt}: ${something}`); // 會造成輸出 output 以外的影響
    return something;
}
```

如果我們希望保留 `console` 並採用依賴注入的話，會變成這樣：

```jsx

function formatMessage(dt, something) {
    return `${dt}: ${something}`;
}

const something = 'Hannah';
const d = new Date();
console.log(formatMessage(d, something));
```

> 看到這裡可能會發現 “誒這樣程式碼裡面還是會有 impure function 啊“，但FP真正要追求的，不是整個程式都是 Pure，而是 Pure 與 Impure 有明顯的界線。

## Pure 的好處

- **可預測** => same input same output

- **容易理解** => 不用去管外部因素（不會影響），只需要著重在 function 就好

- **可組合，可分割，可重用** => [Curry](/T2ODjTcrTJW9Z2xExurFsg) 、 [Compose vs Pipe](/p0NIKWclR_qOfPibQC_q9w)

- **更容易 DeBug** => 沒有 side effect 可以很快找出問題在哪

- **可快取 (Cache)** => 因為 same input same output ，所以在做類似動態規劃的問題時可以用 cache 大大減少記憶體空間，例：經典的費氏數列

```jsx
function fibMemo (n, cache = []) {
 // 透過遞回不斷存入 callstack 的 function 都共用最上層定義的 cache 參數 => closure
  if (cache[n]) {
  // 如果存在 直接 return 
    return cache[n]
  } else {
    if (n <= 2) {
      cache[n] = 1
    } else {
   // 將計算後的結果存入 cache
      cache[n] = fibMemo(n-1, cache) + fibMemo(n-2, cache)
    }
  // 拿出需要的第 n 個解答
    return cache[n]
  }
}
```

- **可延遲運算 (Lazy Evaluation)** => 將會有 side effect 的 `fetch` function 用 [curry](https://hackmd.io/T2ODjTcrTJW9Z2xExurFsg) 的方式包裝起來，

```jsx
const pureHttpCall = function(url) {
  return function(params) {
    return fetch(url, params);
  };
};
```

> 我們並沒有真正的發送 http 請求，只是回傳了一個 function，當呼叫它的時候才會發送請求。

這個 function 之所以 pure 是因為它會根據相同的輸入回傳相同的輸出：給定了 url 及 params 後，它只會回傳同一個 http 請求的 function。

我們可以 cache 任何一個我們想要的 function 讓他可以很 pure 的重複使用。

> Lazy Evaluation 的說明其實不只如此，想了解的人可以先點[這裡](https://gist.github.com/ldong/39eff87048d54dbdb8ea) 知道更詳細一點。

- **可並行運算 (Parallelization)** =>
因為 Pure Function 不會依賴外部狀態，也就是不需要共享記憶體，同時也不會有其他任何副作用，也因此不會有競爭危害 (race condition)的問題。

>延伸閱讀與應用 [compose & pipe](https://hackmd.io/@ChrisW/rJkCui-Gq)

# 總結

Pure Function 是一種 design pattern，重點是在區分出 pure 和 impure function 而不是達成完全的 "pure" ( 不然什麼事都做不了 )。

另外 Pure Function 不會去影響到外部變數 / 環境，所以可以放心的持續重複使用。

# 參考連結

<https://blog.jerry-hong.com/series/fp/think-in-fp-04/>
[https://jigsawye.gitbooks.io/mostly-adequate-guide/content/ch4.html](https://jigsawye.gitbooks.io/mostly-adequate-guide/content/ch4.html)

[https://totoroliu.medium.com/javascript-functional-programming-函式編程概念-e8f4e778fc08](https://totoroliu.medium.com/javascript-functional-programming-%E5%87%BD%E5%BC%8F%E7%B7%A8%E7%A8%8B%E6%A6%82%E5%BF%B5-e8f4e778fc08)

[https://ithelp.ithome.com.tw/articles/10233399](https://ithelp.ithome.com.tw/articles/10233399)

[https://developer.mozilla.org/zh-TW/docs/Glossary/First-class_Function](https://developer.mozilla.org/zh-TW/docs/Glossary/First-class_Function)

[https://medium.com/一個小小工程師的隨手筆記/javascript-functional-programming-一文到底全紀錄-95ff19d9892](https://medium.com/%E4%B8%80%E5%80%8B%E5%B0%8F%E5%B0%8F%E5%B7%A5%E7%A8%8B%E5%B8%AB%E7%9A%84%E9%9A%A8%E6%89%8B%E7%AD%86%E8%A8%98/javascript-functional-programming-%E4%B8%80%E6%96%87%E5%88%B0%E5%BA%95%E5%85%A8%E7%B4%80%E9%8C%84-95ff19d9892)
