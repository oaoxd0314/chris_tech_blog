---
title: GraphQL - 所見即所得
description: GraphQL 是一個 API 的查詢語言，他的主要目的在於能夠讓 client 以更為輕便彈性的方式去獲取資料。
date: 2022-03-12
scheduled: 2022-03-12
image: https://i.imgur.com/OyROw1o.png
imageAlt: 'graphql img'
tags: graphQl
layout: layouts/post.njk
---

![main image](https://i.imgur.com/OyROw1o.png)

GraphQL 是一個 API 的查詢語言，他的主要目的在於能夠讓 client 以更為輕便彈性的方式去獲取資料。

### 所見即所得

GraphQL 的資料結構很易於理解，你可以把想要拿取的資料當作一張圖（ Graph ），而你下的 query 則是幫助 GraphQL 去理解你要怎麼拿取資料。

假設我們想要拿取 user 的資料，就會下這樣的 query

```graphql
query{
    allUser{
        id
        firstName
        age
    }
}
```

然後我們就可以拿到這樣的資料

```json
{
  "data": {
    "allUser": [
      {
        "id": "40",
        "firstName": "Alex",
        "age": 40
      },
      {
        "id": "41",
        "firstName": "Barney",
        "age": 42
      },
      {
        "id": "ej6TJGI",
        "firstName": "喇叭詹",
        "age": 23
      },
     //...
    ]
  }
}
```

你不需要了解 server 做了什麼事或定義什麼，就可以預測從 query 拿取到的資料，因此才會說**所見即所得**。

#### 精準拿取需要的資料

GraphQL 可以客製化你想要拿到的資料欄位，例如，我這次只想要拿到全部 user 的 firstname:

```graphql
query{
  allUser{
    firstName
  }
}
```

那我就只會收到含有 firstName 的一組資料

```json
{
  "data": {
    "allUser": [
      {
        "firstName": "Alex"
      },
      {
        "firstName": "Barney"
      },
      {
        "firstName": "喇叭詹"
      },
      // ...
    ]
  }
}
```

#### 強型別

說到 GraphQL 的特點之一，就是他的**型別系統**，GraphQL 可以自定義物件，例如我們前面使用到的 user 物件:

```graphql
type user{
    id: ID!
    firstName : String
    age: Int
    company: [Company]
}

type allUser{
    user:[user]
}
```

而這些定義好的物件也就是 **schema**，可以說是 GraphQL 的基石之一，所有針對 GraphQL 的操作都是圍繞著 Schema 展開的。

順帶一提 GraphQL 本身就有以下幾種基本型別：

1. Int: 整數
1. Float: 浮點數
1. String: UTF‐8 字串
1. Boolean: True or False.
1. ID: 識別碼

而型別後面的 `！` 則是表示此欄位不可為空。

#### 程式即文檔

得益於 graphQL 本身的型別系統，我們會拿到什麼資料，該送出什麼變數，都會在 schema 寫得清清處處，所以基本上不需要文件去額外描述該怎麼使用。

另外，graphQL 本身自帶 playground，只需要進入 `你的 host url /graphql`，就可以看到一旁的 document（你所定義的 schema）。

![](https://i.imgur.com/SxIfYSh.png)

#### 不綁定任和語言和資料庫

GraphQL [支援多種語言](https://graphql.org/code/)，因此我們可以使用自己熟悉的語言來上手 GraphQL。
![](https://i.imgur.com/pmFGVXa.png)

同時，GraphQL 擁有自由的實作方式，你可以使用任何方式獲取你的資料，而這時就不得不提到 GraphQL 的另一個基石 **resolver**( 以下使用在 js 的 graphql package實作 ):

```js/2/4=
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        //...
        user:{
            type:UserType,
            args:{id:{type:GraphQLString}},
            resolve(parentValue,args){
                // 這邊可以採用任何方式去拿取資料
                // 這裡採用的是一個叫做 json-server 的假資料庫
                return axios.get(`http://localhost:3000/users/${args.id}`).then(res=>{
                    return res.data
                })
            }
        },
        //...
    }
})

```

resolver 定義了這個欄位該如何拿取資料，我們可以透過在 query 傳送參數，讓我們能夠拿取想要的資料：

```graphql
# query
query{
  user(id:"ej6TJGI"){
    firstName
    age
  }
}
# 通常不會寫死 而是會這樣定義
# query($id:String){
#   user(id:$id){
#     firstName
#     age
#   }
# }
```

```json
// data
{
  "data": {
    "user": {
      "firstName": "喇叭詹",
      "age": 23
    }
  }
}
```

##### 巢狀資料結構

GraphQL 可以輕易拿取巢狀資料，讓我們不用透過多個 query 才能拿到所有完整資料：

```graphql
# query
query($id:String){
  user(id:$id){
    firstName
    age
    company{
      name
    }
  }
}
```

```json
// data
{
  "data": {
    "user": {
      "firstName": "喇叭詹",
      "age": 23,
      "company": {
        "name": "Apple"
      }
    }
  }
}
```

##### 向後適應 lagacy API

GraphQL 只有一個 end point `/graphql`，而拿取資料的方式端看 schema 怎麼設定。

因此就算更新了 schema 的實作方式（例如更改 resolver 怎麼拿取資料），只要還是能夠符合之前的資料格式，就不需要去更改 client 的程式碼。

### vs REST?

雖說 GraphQL 是為了解決 RESTful API 的諸多問題才開發出來的，但GraphQL 還是有一些缺點，所以與其說是為了取代 RESTful API，不如說雙方是可以共用的。

以下將稍微提出 GraphQL 的部分缺點：

##### 複雜的 query 方式

比起 RESTful 的毋須設定，只需要知道 endpoint 就可以使用，GraphQL 還是需要一些基礎設定才能在 client side 使用 `query` `mutation` 等功能。

##### server side cache 困難

由於 GraphQL 不是使用 RESTful 的方式管理 request，因此每個 request 都是使用 POST 去實作，因此很難使用 web cacahe 的方式去快速拿取大量資料。

這部分我也不太懂，所以這邊放幾篇參考文章，有興趣的人可以深入看看：
<https://hasura.io/graphql/caching/>
<https://www.digicentre.com.tw/industry_detail.php?id=44>
<https://www.apollographql.com/docs/apollo-server/performance/caching/>

##### 無法監控

RESTful 最大的好處之一就是遵循 HTTP 規範，因此只要單一 end point 有問題，就可以透過 statue code (5xx) 知道問題發生。

而 GraphQL 如果在 client 端發生問題的話，也只會回 200，所以對於錯誤捕捉可能需要花費額外的功夫，例如去監聽 client side 回傳回來的 message，但這個也需要 client 去額外處理。

##### 無法控制 request

GraphQL 的好處就是可以讓 client side 也能夠進行 query，但這也導致了萬一有某一個請求可能會造成龐大的連鎖反應（例如 call schema a => schema b => schama c 如果每個都有幾千個，伺服器主機會直接可以煎蛋），可能會造成 server 很大負擔。

##### 過於自由、規範少

由於 GraphQL 的實作方式過於自由，因此很難有一個best practice 可以參考，對於初次接觸的人來說，如果不太熟悉 schema 的定義方式，且用以往的 RESTful 方式思考的話，很容易埋下太多技術債。

##### 學習曲線

雖說 GraphQL 不是一個太難的語言，但因為 client 和 server 都會需要碰觸，且 schema 也需要額外定義，用慣了 RESTful 可能會不習慣，在公司內推行也較為困難。

### 總結

這篇只是一篇推坑文，因此沒有寫得很細，而上面這些東西我實在是漏了很多細節沒說，因此有興趣的話還是要自己去官網看 document

例如:

1. 型別與定義: <https://graphql.org/learn/schema/>
1. 對資料的操作: <https://graphql.org/learn/queries/>

或是我有寫得詳細一點的版本，這篇像是整合版，但細節的話都在這兩篇會比較多。

1. [graphQL](https://superficial-trumpet-b43.notion.site/GraphQL-ba794770e34f4e4e841aafd51df630a1)
2. [why graphql](https://superficial-trumpet-b43.notion.site/why-GraphQL-b15d61ec64ba4f3d89fe5c9d49a22ec0)

另外，關於 GraphQL 的實作方式有很多種 package 可以做選擇，目前東西最多最完整的就是 [apollo](https://www.apollographql.com/docs/)，可以看成是超值大禮包，裡面什麼東西都有。

關於本文的 demo code 在[這裡](https://github.com/oaoxd0314/pure-graphQL-server)。

### 參考
<https://graphql.org/code/>
<https://www.apollographql.com/>
[https://ithelp.ithome.com.tw/articles/10200678](https://ithelp.ithome.com.tw/articles/10200678) in frontEnd

[https://engineering.fb.com/2015/09/14/core-data/graphql-a-data-query-language/](https://engineering.fb.com/2015/09/14/core-data/graphql-a-data-query-language/) (meta engineering)

[https://www.appcoda.com.tw/graphql/](https://www.appcoda.com.tw/graphql/) in Swift(app)

[https://www.youtube.com/watch?v=ZQL7tL2S0oQ](https://www.youtube.com/watch?v=ZQL7tL2S0oQ)

<https://www.moesif.com/blog/technical/graphql/REST-vs-GraphQL-APIs-the-good-the-bad-the-ugly/>
