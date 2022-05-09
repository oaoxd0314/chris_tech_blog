---
title: JavaScript 初探 A&D - 資料結構 Map
tags: 
 - A&D
 - data-structor
 - JavaScript
description: Map 是 JavaScript 在 ES6 推出的新物件，讓 JavaScript 工程師有合適的工具可以表達其他語言中 Map 的資料結構。
date: 2022-03-12
scheduled: 2022-03-12
layout: layouts/post.njk
---

`Map` 是 JavaScript 在 ES6 推出的新物件，讓 JavaScript 工程師有合適的工具可以表達其他語言中 `Map` 的資料結構。

## Baisc Usage

`Map` 可以透過 `new Map()` 建構出來:

```jsx
let m = new Map()
```

設定初始化資料：

```jsx
const m = new Map([['b', 2],['c',3]])
```

透過 `.set()` `.get()` `.has()` `.delete()`去存取、確認、刪除資料：

```jsx
m.set('a',1) // m.set(key,val) , Map(1) { 'a' => 1}
m.get('a') // m.get(key) ,1
m.has('a') // m.has(key) ,true
m.delete('a') //m.delete(key) , true
```

也可以透過 `.clear()` 去清空資料

```jsx
m.clear() // undefined
```

.size() 取得總數

```jsx
m.size() // 0 => .clear() 全清掉了
```

此外，他跟 `Obejct` 一樣可以透過 `.keys()` `.values()` 取得全部的 key,value。

```jsx
const m = new Map([['b', 2],['c',3]])
m.keys() // [Map Iterator] { 'b', 'c' }
m.values() //[Map Iterator] { 2, 3 }

let mKeys = [...m.keys()] // 轉array [ 'b', 'c' ]
```

## vs Object

一般在 JavaScript 裡說到 key pair value 直覺就會想到 `Object`，但 `Map` 跟 `Object` 還是有一些差別的

1. `Map` 的 `keys` 可以是**任意值** ， `Object` 只能是 `string` 或 `symbols`:

```jsx
const func = ()=>{}
console.log(m.set(func,1))
console.log(m.get(func)) // 1

const obj = {
    func:1  // {'func':1} ,func 是 string 不是 function
}
```

2. `Map` 的 keys 會根據被添加的時間而有順序性，`Object` 沒有
3. `Map` 可直接迭代， `Object` 需用 `Object.keys()` 將 key 轉為 array 才能用

```jsx
//map
for (let k of m.keys()) {
  console.log(k)
}
//object => for..in.. 迭代

for(let k in Object.keys(obj)){
    console.log(k)
}
```

4. `Map` 的檢索效率高於 `Object`
5. `Map` 繼承至 `Object`（幾乎所有實體都是，包含 `array`），所以 `Map` 可以使用所有 `Object` 的功能，但反之`Object` 則不行。

```jsx
let m = new Map([[1,2],[3,4]]);
console.log(map instanceof Object); //true
let obj = new Object();
console.log(obj instanceof Map); //false
```

### `Object`、`Map` 的使用時機

#### `Map`

- 具有順序性的資料
- 經常增添刪減屬性
- 需要迭代

#### `Object`

- 簡單的資料
- 需要轉變為 `JSON`

## with Algorithm

那 `Map` 到底可以用在哪裡，用經典的 [leetcode - 1 Two sum](https://leetcode.com/problems/two-sum/) 來示範

> 題目說明：
function 接收2個參數 array 和 target
在 array 裡找到可以2個組合成 target 的 item 並回傳 index

>limit:
1.不能使用同一個 idx 組成 ex: [1,1]
2.只回傳一個答案

>example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

```jsx
// BigO(n)
const twoSum = function(nums, target) {
    
    if(nums.length <2){ 
        return []    
    }
    
    const m = new Map()
    let ans = []
    
    nums.forEach((item,idx)=>{
        let diff = target - item 
        
        if(m.has(diff)){ // 檢測這個 diff 有沒有在 map 裡
            ans = [idx,m.get(diff)] // 有的話將當下的 index 和記錄在 map 裡得 index 回傳給 ans
        }else{
            m.set(item,idx) // 沒有的話就將當前的 [item, index] 存進 map 
        }
    })
    
    return ans
}
```

另一題 [1122. Relative Sort Array](https://leetcode.com/problems/relative-sort-array/) 有採用到 `Map` 的順序性來解決問題
> 題目說明：
function 接收2個 array , arr1 和 arr2
將 arr1 裡的值依照 arr2 的順序排序

>limit:
1.arr2 的值不會重複
2.如果 arr1 值不在 arr2 裡 將依大小排到最後面

>example:
Input: arr1 = [28,6,22,8,44,17], arr2 = [22,28,8,6]
Output: [22,28,8,6,17,44]

```jsx
// BigO(2n)
var relativeSortArray = function(arr1, arr2) {
    // 將 Map 依照 arr2 的順序建立
    const count = new Map(arr2.reduce((acc,curr)=>[...acc,[curr,0]],[])); 
    const result = [];
  
    // 將 arr1 小 -> 大排序
    arr1.sort((a, b) => a - b); 

    // Map 計算 item count
    arr1.forEach(item => count.has(item) ? count.set(item, count.get(item) + 1) : count.set(item, 1)) 
    
    // 將結果輸出到 result
    count.forEach((val, key) => {
      for(let i = 0; i< val; i++){
        result.push(key)
      }
    })
   
    return result;
};

```

# 參考資料
<https://flaviocopes.com/javascript-data-structures-map/>
<https://pjchender.dev/javascript/js-map/>
<https://medium.com/front-end-weekly/es6-map-vs-object-what-and-when-b80621932373>
<https://ithelp.ithome.com.tw/articles/10227715>
