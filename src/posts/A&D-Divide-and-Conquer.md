---
title: JavaScript 初探 A&D - 演算法 Divide and Conquer
tags:
 - Algorithm
 - A&D
description: 分治法在每一層遞迴上都有三個步驟，1.分解（divide）：將原問題分解為若干個規模較小，相互獨立，與原問題形式相同的子問題；2. 解決（conquer）：若子問題規模較小且易於解決時，則直接求解。3. 合併（combine）：將各子問題的解合併，合併後的結果為原問題的解。分治法在每一層遞迴上都有三個步驟：
date: 2022-05-09
scheduled: 2022-05-09
layout: layouts/post.njk
---
**分治法**在每一層遞迴上都有三個步驟：

1. 分解（divide）：將原問題分解為若干個規模較小，相互獨立，與原問題形式相同的子問題；
2. 解決（conquer）：若子問題規模較小且易於解決時，則直接求解。
3. 合併（combine）：將各子問題的解合併，合併後的結果為原問題的解。

最經典的例子即是 [Algorithm - Sort](https://www.notion.so/Algorithm-Sort-29a95580bfd74da89f5b118ce2ce73fe) 提到的 `Merge Sort` 和 `quick sort`：

以 `Merge Sort` 為例，將陣列不斷地拆分到最小（一個數字）之後，再將每個陣列合併，且同時排序：

```jsx
 function mergeSort(arr){
  if(arr.length <2){
   return arr
  }
 
  const len = arr.length
  const mid = Math.floor(len/2)
  // 以 mid 為分界拆分
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

再一個例子， [Algorithm - ****Search****](https://www.notion.so/Algorithm-Search-712e570c512146d1a40457af36d33d14) 中的 `binary search` ，也是另一種分治法，只不過不需要合併，定義一個中間數，透過不斷的確認相對位置來找到目標：

```jsx
function binarySearch(arr, target, start=0, end=arr.length-1){
  if (end >= start) {
      let mid = start + Math.floor((end - start) / 2);
      if (arr[mid] == target)
          return mid;

      if (arr[mid] > target)
     // 如果 target 小於 中位數 就將範圍限縮在 start ~ mid-1(因為 mid 已經確認不是要找的數了)
          return binarySearch(arr, target, start, mid - 1);

   // 如果 target 大於 中位數 就將範圍限縮在 mid+1 ~ end
      return binarySearch(arr, target, mid + 1, end);
  }

  return -1;
}
```

# 總結

面對已經解過的問題可以很輕易的侃侃而談，但沒解過的問題還是會找不太到核心在哪 XD，看來我抽象化的功力還要再加強。

# 參考連結

[https://chupai.github.io/posts/2009/divide_and_conquer_dp/](https://chupai.github.io/posts/2009/divide_and_conquer_dp/)

[https://yalanin.medium.com/演算法-分治法-divide-and-conquer-592145d72699](https://yalanin.medium.com/%E6%BC%94%E7%AE%97%E6%B3%95-%E5%88%86%E6%B2%BB%E6%B3%95-divide-and-conquer-592145d72699)
