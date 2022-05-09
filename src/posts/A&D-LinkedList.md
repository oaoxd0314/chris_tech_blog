---
title: JavaScript 初探 A&D - 資料結構 Linked List
tags: 
 - A&D
 - data-structor
 - JavaScript
description: Linked List 是動態且具有指向性的資料結構，不需要連續的記憶體空間儲存，而是每一個 node 之間都會有一個屬性 next 去指向下一個 node，來構成連結。
date: 2022-05-09
scheduled: 2022-05-09
layout: layouts/post.njk
---

![source from ****[Linked List — In typescript and C#****](https://medium.com/@konduruharish/linked-list-in-typescript-and-c-be96732b9854) ](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/099dabe9-a6ed-4b2a-9443-9b85f2249480/Untitled.png)

source from ****[Linked List — In typescript and C#****](https://medium.com/@konduruharish/linked-list-in-typescript-and-c-be96732b9854)

Linked List 是動態且具有指向性的資料結構，不需要連續的記憶體空間儲存，而是每一個 node 之間都會有一個屬性 next 去指向下一個 node，來構成連結。

Linked List 有以下幾個特點：

1. 不具有 index，點跟點之間透過 next 連結
2. 節點的操作成本偏低，只需改變 next 連結的 node 就可以輕易插入 / 刪除 資料。
3. 查詢的成本偏高，因為不具有 index 和排序性，不能像 array 使用 binary search 快速找到，只能透過 `node.next` 去逐步找到那一筆資料 。

<aside>
💡 只有 Doubly Linked List 具有雙項指標： pre & next，但也因為如此 Doubly Linked List 的function 實作會較為複雜，且記憶體耗損將會可觀的增加

因此本篇的 Linked List 將以 Singly Linked List 為標準談論。
</aside>

## Vs Array

Linked List 常常被拿來跟 array 比較，以下就來看看他們彼此差異和使用時機

|  | Linked List | Array |
| --- | --- | --- |
| 查詢成本 | O(N) | O(1) |
| 操作成本 | O(1) | O(N) |

以下就來說明上述表格：

- 以**查詢成本**來說：Linked List 需要遍歷整個 List 靠著 next 才有可能找到，因此是 O(N) ; array 具有 index 所以只需要到指定的 index 即可得到，因此是 O(1)。
- 以**操作成本**來說：Linked List 只需要改變當前後節點的連結，所以是 O(1) ; 但 array 因為具備 index ，在中途插入 / 刪除資料，都回連帶著整個 array 每一個 element 的 index 變動，所以是 O(n)。
- 以**記憶體成本**來說：如果不考慮 array 在 JS 的**運作機制**（如下方註解）單純以儲存大小來說，Linked List 在儲存同樣數量的情況下因為會多一個屬性 next 去指向下一個 node，因此是高於array。

<aside>
💡 **小知識補充**： array 在 JavaScript 是依靠翻倍來擴增記憶體

也就是說當一個 array 目前有 8 個 element ，但他想要新增第 9 個的時候，因為記憶體不夠的原因，就會再擴增一倍，如此一來才能放得下第 9 個 element，

以此類推  array 的操作記憶體大小為 1 → 2 → 4 → 8 → 16 → 32 →  ... 成長，因此會說 array 的動態操作成本高於 Linked List。

且因為 array 是連續性記憶體，因此關於記憶體的浪費也會高於 Linked List。

</aside>

### Linked List 使用情境

但實際上，如果是需要操作中間的元素， Linked List 需要查詢成本 ; array 需要操作成本，因此效能可說是不相上下。

因此可以總結出以下 Linked List 的使用情境：

1. 當需要頻繁操作資料時
2. 當需要具有指向性的操作時( ex leetcode **206 )

> 所以如果是單純的儲存資料，或是沒有需要極端得條件限制時，就可以使用 array。
>

## 操作方式

首先我們要先定義 Linked List 和 Node 兩個物件：

**Linked List**

```jsx
class LinkedList {
  constructor() {
    this.head = null // 第一個節點
    this.length = 0 // 總長度
  }
}
```

**node**

```jsx
class Node {
  constructor(val) {
    this.next = null; // 指向下一個 node
  this.val = val; // 值
  }
}
```

**size**

輔助用，方便拿出 length

```jsx
size() {
    return this.length
 }
```

### push

```jsx
// 新增一個節點
  push(val) {
    const newNode = new Node(val)
    if (this.head === null) {
      this.head = newNode
    } else {
      let currNode = this.head
      while (currNode.next !== null) {
        currNode = currNode.next
      }
      currNode.next = newNode
    }
    this.length++
  }
```

### pop

```jsx
// 移除最後一個
pop() {
    if (!this.head) {
      return null
    } else if (this.length === 1) {
      const temp = this.head
      this.head = null
      this.length = 0
      return temp
    } else {
      let currNode = this.head
      for (let i = 1; i <= this.length - 2; i++) {
        currNode = currNode.next
      }
      const temp = currNode.next
      currNode.next = null
      this.length--
      return temp
    }
  }
```

### shift

```jsx
// 移除第一個
shift() {
    if (!this.head) return null
    else if (this.length === 1) {
      const temp = this.head
      this.head = null
      this.length = 0
    } else {
      const temp = this.head
      this.head = this.head.next
      this.length--
      return temp
    }
  }
```

### unshift

```jsx
// 加入第一個
unShift(val) {
    if (!this.head) {
      this.head = new Node(val)
    } else {
      const temp = this.head
      this.head = new Node(val)
      this.head.next = temp
    }
    this.length++
  }
```

### insertAt

```jsx
insertAt(index, val) {
    if (index > this.size() || index < 0) {
      return null
    } else if (index === 0) {
      this.unShift(val)
      return
    } else if (index === this.length) {
      this.push(val)
      return
    }

    let currNode = this.head
    const newNode = new Node(val)
    for (let i = 1; i < index; i++) {
      currNode = currNode.next
    }

    newNode.next = currNode.next
    currNode.next = newNode
    this.length++
    return
  }
```

### removeAt

```jsx
removeAt(index) {
    if (index < 0 || index > this.size() - 1) {
      return null
    } else if (index === 0) {
      return this.shift()
    } else if (index === this.size() - 1) {
      return this.pop()
    }

    let currentNode = this.head

    for (let i = 1; i < index; i++) {
        console.log(i)
        console.log(index)
      currentNode = currentNode.next
    }
    const temp = currentNode.next
    currentNode.next = currentNode.next.next
    this.length--
    return temp
  }
```

### get

```jsx
get(index){
      if(index >= this.length || index <0) return null

      let currNode = this.head;
      for(let i = 0;i<index ;i++){
        currNode = currNode.next
      }

      return currNode.val
  }
```

### printAll

```jsx
// 看到目前儲存的全部資料
printAll() {
    if (this.length === 0) {
      console.log('no node in this list')
      return
    }
    const nodes = []
    let currNode = this.head

    while (currNode !== null) {
      nodes.push(currNode.val)
      currNode = currNode.next
    }
    console.log(nodes)
  }
```

# 總結

# 參考連結

[https://ithelp.ithome.com.tw/articles/10216257](https://ithelp.ithome.com.tw/articles/10216257)

[https://pjchender.blogspot.com/2020/05/linked-list.html](https://pjchender.blogspot.com/2020/05/linked-list.html)

[https://medium.com/@nchuuu/linked-list-es6-javascript實作及leet-code題目解析-4afcd9a67b3d](https://medium.com/@nchuuu/linked-list-es6-javascript%E5%AF%A6%E4%BD%9C%E5%8F%8Aleet-code%E9%A1%8C%E7%9B%AE%E8%A7%A3%E6%9E%90-4afcd9a67b3d)

[https://dev.to/satishnaikawadi2001/build-a-linked-list-in-javascript-with-all-operations-4867](https://dev.to/satishnaikawadi2001/build-a-linked-list-in-javascript-with-all-operations-4867)

[https://medium.com/@konduruharish/linked-list-in-typescript-and-c-be96732b9854](https://medium.com/@konduruharish/linked-list-in-typescript-and-c-be96732b9854)
