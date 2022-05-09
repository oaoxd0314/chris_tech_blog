---
title: JavaScript 初探 A&D - 演算法 Recursive
tags:
 - Algorithm
 - A&D
description: 在數學上有一個數列，稱為費氏數列（Fibonacci） 或稱 斐波那契數列，這個數列由 0 和 1 開始，之後的數是由之前的兩數相加而得出
date: 2022-05-09
scheduled: 2022-05-09
layout: layouts/post.njk
---

在數學上有一個數列，稱為費氏數列（Fibonacci） 或稱 斐波那契數列，這個數列由 0 和 1 開始，之後的數是由之前的兩數相加而得出。

```jsx
0 1 1 2 3 5 8 13 21 34 55 89 144 ... 
```

以數學上的定義來說：

- $f_0 = 0$ ; $f_1=1$ ;
- $f_n\;=\;f_{n-1}\;+\;f_{n-2}$

可以發現，透過推導後得出的第二項公式，就能夠將無窮級數帶入並得出結論，因此可以說成是，**將一個複雜的問題，拆分成具有相同性質的子問題**，簡單來說，就是自己定義自己，如果將上述的概念帶入程式中，就是遞迴了。

## 基本規則

遞迴有兩個條件：

- 終止條件 ⇒ 也稱作基本條件，什麼時候結束，不然就會無限輪迴
- 遞迴條件 ⇒ 呼叫自己的條件

## 範例 - 總和

講到遞迴，最淺白的反例就是正整數 n 的總和，我們先來看看如果是採用迴圈是如何做的：

```jsx
function sum(num){
 let res = 0
 for(let i=0 ; i<= num ; i++){
  res += i
 }
 return res
}

sum(100) // =>5050
```

接下來，讓我們以遞迴的方式思考，基本上可以把這個函式看成：

$S(n)=n+n−1+…+1$

- 基本條件：$S(1)=1$
- 遞迴條件：對於每個大於 1 的整數  $S(n) = n + S(n - 1)S(n)=n+S(n−1)$

最後就會變成：

```jsx
function sum(num){
 if(n === 1) return 1
 return n + sum(n-1)
}

sum(100) // =>5050
```

如果按照一步一步分解，可以看成是：

```
sum(100)
  100 + sum(99)
    99 + sum(98)
      97 + sum(96)
     ...
    2 + sum(1)
          return 1
        return 2 + 1   // 3
      return 3 + 3     // 6
    return 4 + 6       // 10
  return 5 + 10        // 15
...
```

## 範例 - 階乘

我們也可以使用遞迴創造出階乘（factorial）：

- 基本條件：$0! = 1$
- 遞迴條件：$n!=1×2×3…(n−2)×(n−1)×n$  ⇒  $n!=n×(n−1)!$

```jsx
function factorial(n){
 if( n === 0) return 1
 return n* factorial(n-1)
}
```

## 範例 - 費氏數列

- 基本條件：$f_0 = 0$ ; $f_1=1$ ;
- 遞迴條件：$f_n\;=\;f_{n-1}\;+\;f_{n-2}$

```jsx
function fibonacci(n){
 if(n < 2) return n
 return fibonacci(n-1)+fibonacci(n-2)
}
```

## 遞迴 vs 迭代

### 迭代

- 迴圈結構，是由下而上（Bottom-Up），一步步逼近答案；
- 用新值覆蓋舊值，直到滿足條件後結束，因為不保存中間值，因此不會消耗很多記憶體空間。

### 遞迴

- 選擇結構，是由上而下（Top-Down），慢慢地將問題縮小，來求得答案；
- 將問題分解成干個子問題，再回頭運算答案，因此會消耗大量記憶體空間，但程式碼簡單明瞭。

## 遞迴的優缺點

### 優點

- 大問題化為小問題，程式碼簡潔清晰，可讀性佳。

### 缺點

- 容易產生 [堆疊溢位（stack overflow）](https://zh.wikipedia.org/wiki/%E5%A0%86%E7%96%8A%E6%BA%A2%E4%BD%8D)，因此非必要，不建議使用遞迴；
- 冗餘計算，若子問題彼此非獨立的，會重複計算。

也就是說，雖然遞迴看起來比較簡潔專業，但並沒有比較快且消耗大量記憶體。

## 總結

雖然遞迴看起來簡潔有力，相比於迭代更符合 Functional Program ，但根本上的問題卻是效能差異，因此如果想使用遞迴，更好的辦法就是了解[尾遞迴](https://zhuanlan.zhihu.com/p/36587160)，或是 [Algorithm - ****動態規劃 Dynamic programming****](https://www.notion.so/Algorithm-Dynamic-programming-7ebf4e690e7e4174a7dc07d873ff933f) ，藉由 Memorize 和 cache 去優化遞回的效能。

## 參考連結

[https://chupai.github.io/posts/2008/alg_recursion/](https://chupai.github.io/posts/2008/alg_recursion/)
