---
tags: Functional Programming
title: FP - DRY 第一哩路 抽象化
description: 當我們把一段程式碼包成一個 function 時，其實就是在作抽象化，良好的抽象化可以讓 function 更有彈性，也更容易維護、使用
date: 2022-03-22
scheduled: 2022-03-22
layout: layouts/post.njk
---
當我們把一段程式碼包成一個 function 時，其實就是在作抽象化，良好的抽象化可以讓 function 更有彈性，也更容易維護、使用，假設現在有一個需要過濾物件的 function：

```javascript
//資料
var taskArray = [
  {
    id: 1,
    userId: 1,
    userName: 'Jerry',
    complete: false,
    title: 'Write 《Think in FP》 serise article',
    content: '...',
    dueDate: '2020-05-31',
    priority: 0,
  },
  ...
];
```

如果需求是想過濾出已經完成的資料 `complete === true` 

```javascript
//過濾 function
function filterTaskArray(taskArray) {
  const result = [];
  for (let i = 0; i < taskArray.length; i++) {
    if (taskArray[i].complete) {
      result.push(taskArray[i]);
    }
  }
  return result;
}
```

這時 PM 又想新增一個過濾出某個特定的 userId，有可能就會變成下面這樣：

```javascript
function filterTaskArray(taskArray, { filterComplete = false, filterUserId = undefined } = {}) {
  const result = [];
  for (let i = 0; i < taskArray.length; i++) {
    if (
      (filterComplete && !taskArray[i].complete) ||
      (filterUserId != null && taskArray[i].userId !== filterUserId)
    ) {
      continue;
    }
    result.push(taskArray[i]);
  }
  return result;
}
```

使用方式變成這樣：

```javascript
const result = filterTaskArray(taskArray, {
  filterComplete: true,
  filterUserId: 1
});
```

所以我們可以知道，這樣的抽象是非常糟糕的，每次新增一個需求就需要多幾個條件，使用者會需要填入更多的參數，整個功能也會非常難讀懂

所以當我們希望一個 function 可以過濾出一個 array 某些特定的元素時，我們需要抽象的只有一件事情就是過濾 Array，至於是過濾什麼條件就應該由外部的使用者決定！

這樣一來，就等於把部分邏輯交由外部的使用者決定，我們要做的只需要規定使用者傳一個 function 進來，並預期這個 function 會回傳某種值就可以了

```javascript
function filter(array, fn) { // function 改名為 filter，參數改名為 array
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (fn(array[i])) { // 傳 array[i] 進去，並預期 fn(array[i]) 會回傳 Boolean。
      result.push(array[i]);
    }
  }
  return result;
}
```

使用方式就變成下面這樣：

```javascript
const result = filter(taskArray, item => item.complete && item.userId = 1)
```

## 總結

所以可以發現，當我們把抽象做得好，其實彈性是非常大的，只要是 array 都可以使用，並且邏輯可以交由使用的人依據情況決定，也幾乎不再需要再修改這個 function！