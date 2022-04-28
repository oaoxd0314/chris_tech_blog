---
title: JavaScript 初探 A&D - 演算法 Sort
tags:
 - Algorithm
 - A&D
description: 在 JavaScript 的演算法
date: 2022-03-12
scheduled: 2022-03-12
layout: layouts/post.njk
---

## 氣泡排序 - bubble sort

> **Big O(n^2)**

![Bubble-sort.gif](https://i.imgur.com/Mrh5FkZ.gif)

兩兩相比，將較大的一直往後推，總共會做 (n-1)! 次

```jsx
function bubbleSort(arr){
    let len = arr.length
  // 每個數字都要比較 總共跑 len 輪
    for(let i=0;i<len;i++){
    // -i 撇除掉那些已經推到最後的數
    // -1 是為了避免比較超出範圍
        for(let j=0; j<len-1-i; j++){
      // 前面 > 後面 => 交換位置
            if(arr[j] > arr[j+1]){
                [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
            }
        }
    }

    return arr 
}
```

## 選擇排序 - select sort

> **Big O(n^2)**

[Selection-Sort-Gif.webp]()

找到最小值，移到最左邊。

```jsx
function selectionSort(arr){
  const len = arr.length;
 // 總共執行 len 輪
  for (let i = 0; i < len; i++) {
    let min = arr[i];
    let minIndex = i;

    for (let j = i; j < len; j++) {
   // 找到這一輪的最小值
      if (arr[j] < min) {
        min = arr[j];
        minIndex = j;
      }
    }
  // 這一輪比完再跟當前的預定值比較
    [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
  }
  return arr;
}
```

## ****插入排序法 - Insertion Sort****

> **Big O(n)**

![insertion.gif](https://i.imgur.com/8ScSICK.gif)

從前到後，比對每一個前方的值，如果比自己大，則交換，就跟換手牌一樣

```jsx
const insertionSort = (arr) => {
  const n = arr.length;

  // 假設第一個元素已經排好，所以從 1 開始跑
  for (let i = 1; i < n; i++) {

    // position 表示可以插入的位置
    let position = i;

    // 先把要插入的元素存起來
    const value = arr[i];

    // 開始往前找，只要符合這條件就代表這個位置是可以插入的
    // 邊找的時候就可以邊把元素往後挪，騰出空間
    while (i >= 0 && arr[position - 1] > value) {
      [arr[position], arr[position - 1]] = [arr[position - 1], arr[position]];
      position--;
    }

    // 找到適合的位置，放入元素
    arr[position] = value;
  }
  return arr;
}
```

## 合併排序 - merge sort

> **Big O(n logn)**

![Merge-sort-example-300px.gif](https://i.imgur.com/L54m2G7.gif)

將所有值拆分到最小後排序：

```jsx
//case
 let arr =[8,1,2,9,5]
 
 function mergeSort(arr){
  if(arr.length <2){
   return arr
  }
 
  const len = arr.length
  const mid = Math.floor(len/2)
  const left = arr.slice(0,mid)
  const right = arr.slice(mid)
  
  return merge(mergeSort(left),mergeSort(right))
 }
 
 function merge(left,right){
  const result = []
  let lIdx = 0,rIdx = 0
  
  // 比較每個陣列最左邊的值
  while( lIdx < left.length && rIdx < right.length ){
   if(left[lIdx] < right[rIdx]){
     result.push(left[lIdx])
     lIdx ++
   }
   else{
     result.push(right[rIdx])
     rIdx ++
   }
  }
  // 串接尚未比完的值
  // 因為陣列都有經過排序 所以剩下的一定是最大的
  return result.concat(left.slice(lIdx)).concat(right.slice(rIdx))
 }
```

## 快速排序 - quick sort

> **Big O(n logn)**

![Quicksort-example.gif](https://i.imgur.com/46RhIqx.gif)

選定一特定值，以相對大小拆分為兩邊，之後遞回此方法不斷排序

```jsx
function quickSort(arr){
  if (arr.length < 2) return arr
 const [p, ...ary] = arr
 let left = [],right = [];

 ary.forEach(c=>{
  if(c<p) left.push(c)
  else right.push(c)
 })
 
 
 return [...quickSort(left),p,...quickSort(right)]
}
```

# 總結

# 參考連結

[https://ithelp.ithome.com.tw/articles/10217933](https://ithelp.ithome.com.tw/articles/10217933)

[https://blog.techbridge.cc/2017/08/19/sotring-algorithm/](https://blog.techbridge.cc/2017/08/19/sotring-algorithm/)
