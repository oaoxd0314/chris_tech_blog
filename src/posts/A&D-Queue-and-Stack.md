---
title: JavaScript 初探 A&D - 資料結構 Stack and Queue
tags: 
 - A&D
 - data-structor
 - JavaScript
description: Linked List 是動態且具有指向性的資料結構，不需要連續的記憶體空間儲存，而是每一個 node 之間都會有一個屬性 next 去指向下一個 node，來構成連結。
date: 2022-05-09
scheduled: 2022-05-09
layout: layouts/post.njk
image: https://i.imgur.com/v7FB0cQ.png
imageAlt: 'stack image'
---

stack 和 queue 兩種資料結構並沒有具體的實作方式，更像是一種概念，只要能夠符合這種概念，不管是用哪種資料結構實現都可以，以下就來看看各自的差異和用法。

## Stack

> LIFO (Last in first out) - 後進先出

![stack](https://i.imgur.com/v7FB0cQ.png)

stack 最著名的例子就是 JS runtime 裡的 [call stack](https://www.notion.so/JS-Event-Loop-702726fa814b4b38aeda1df466601ad3) ，任務是一個一個疊加進去的，並永遠只會操作位於 stack 最頂層的一筆，就是後進先出。

stack 可以用很多種方式實作，只要這種資料結構是具有排序性的（可以遵守後進先出），都可以實作，例如 map、array、linked List 都可以。

💡 以 Linked List 來說，如果要以 stack 的方式撰寫，就只能使用 `pop` 和 `push`，這兩個只對頂層操作的 function。

### Stack 的特點

- 後進先出
- 沒有 index
- 只能操作最頂端的元素

## Queue

> FIFO( First in First out) - 先進先出

![queue](https://i.imgur.com/n1AaycL.png)

Queue 主要是用在實現 FIFO 這種概念。

最著名的例子就是排隊，第一個先到的人就會先進去執行，就像 [JS 底層實作 - Event Loop](https://www.notion.so/JS-Event-Loop-702726fa814b4b38aeda1df466601ad3) 中 Web API 處理完之後回傳回來，等待 call stack 呼叫的 callback queue 一樣就是 FIFO 的經典例子。

### Queue 的特點

queue 一樣可以使用任何具有排序性的資料結構實現，只要能夠實現 FIFO 就可以：

1. 符合先進先出
2. 不具有 index
3. 只能從最尾端加入，且只能從最前面移除

💡 `enqueue` ⇒ 新增 queue 的一個元素 ; `dequeue` ⇒ 移除 queue 的一個元素

## Deque

`Deque` 就是 double-ended-queue，這是一個 queue 和 [DS - Stack](https://www.notion.so/DS-Stack-aa1eb4d2dd614b788b73309e355974d0) 的合體，這種資料結構的概念就是，可以對最前面 / 最後面 的元素進行刪除、新增，但不能操作中間的元素。

以 [DS - Linked List](https://www.notion.so/DS-Linked-List-2e3616aea6144bddb411b8b78b1e136c) 來說的話，就是只能使用 `pop` `push` `shift` `unshift` 等動作。
