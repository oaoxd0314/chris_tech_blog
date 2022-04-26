---
title: Defi 解析大補帖
description: 去中心化金融（Decentralized Finance 以下簡稱 DeFi ）是指金融交易不需要任何中介第三方來承認、監督就能完成交易的金融。
date: 2022-03-18
scheduled: 2022-03-18
layout: layouts/post.njk
image: https://i.imgur.com/E5exCA4.png
imageAlt: 'Defi img'
tags: 
    # - WEB 3.0
    - DeFi
    # - 加密貨幣 
    # - NFT
---
### 投資加密貨幣有賺有賠，以下內容均不構成投資建議

去中心化金融（Decentralized Finance 以下簡稱 DeFi ）是指金融交易不需要任何中介第三方來承認、監督就能完成交易的金融。

![CeFi vs DeFi](https://i.imgur.com/E5exCA4.png)

### 信任機制

作為一個金融中心，需要有監管機關，且有法律規範，才能真正讓大眾信服並落地使用。

### [智能合約](https://superficial-trumpet-b43.notion.site/83dab70d806f40eaa29ecc815126039e)

* ERC-20 (加密貨幣)
* ERC-721 (NFT)

## TVL

TVL (Total Locked Value)，是用來代表該 DeFi 市值有多大，越多的 TVL 代表該 DeFi 項目受到的信任與流通性就越多，來源來自於流通在該平台上的加密貨幣總量。

## [流動性挖礦](https://www.youtube.com/watch?v=vrBylnQ5Cqc)

流動性挖礦(Yield Farming)，是指將加密貨幣資產質押或出借，以產生額外加密貨幣形式的高回報或回報的做法。由於各種創新，這種去中心化金融的應用最近大受歡迎。流動性挖礦是當前DeFi行業最大的增長驅動力。

### 搓合交易

交易是雙向，如果沒有人願意當你的買/賣家，交易就不會成立。

### 流動性問題

DeFi 市場沒有造市商，也因此就需要有人來提供貨品當你的買/賣家，而許多平台看到了這個幾會，於是，就有了流動性挖礦。

你將抵押一個交易對（例如 USDT / BTC），進入這個平台的資金池，提供這個交易對的流動性，由於你提供流動性，因此將可以獲得平台提供給你的抵押收益。

> 補充，[腦哥的講解](https://www.youtube.com/watch?v=XjXGgY5elE0)
> 補充，[另一個我覺得不錯的](https://www.youtube.com/watch?v=GWMoPlPC_Eo)

## 質押

質押源自於 [PoS(proof of stack)](https://golden.com/wiki/Proof-of-stake-8Y9VVJ) 這個機制，而常聽到的挖礦，也就是 [PoW(proof of work)](https://golden.com/wiki/Proof_of_work-ANXPA9Z)，而 PoS 是 PoW 的替代方案，目的是減少大量運算所造成的資源消耗。

>由於這邊只是要知道質押有什麼影響力，所以詳細的 PoS 機制可以在[這裡知道更多](https://cryptowesearch.com/blog/all/staking)

他跟流動性挖礦**不一樣**，其主要目的不是為平台提供流動性，你可以想像成是一般銀行的定存，這麼做的原因除了是為了讓平台提升 TVL，且通過提高區塊鏈網絡的安全性來確保其安全。用戶質押越多，區塊鏈就越分散，因此更難被攻擊。

常見的質押 DeFi 項目有

* [ETH](https://finance.technews.tw/2022/01/14/ethereum-2-0-stake-30billion/)
* [ADA](https://cardano.org/)
* [PancakeSwap](https://earning.tw/what-is-pancakeswap/)

## 去中心化借貸（加密貨幣放貸）

就像傳統金融的借貸，不過更安全，利率更低，這我沒興趣，想玩自己研究。

# DeFi 平台

> [Top 10 Defi portocal](https://www.techtimes.com/articles/271407/20220203/top-10-lending-protocols-based-on-tvl-terras-anchor-falls-just-behind-ethereums-aave.htm
)

## [Aave](https://to-coin.com/what-is-aave/)

目前市值(TVL) 最大的 DeFi 平台，過去2年間憑著誇張的[研發技術](https://docs.aave.com/developers/getting-started/v3-overview) 超車許多競爭對手，其中的特點功能例如：

### 閃電貸

閃電貸是不需要抵押品就可以借錢的服務。

條件是貸款方需要在 15 秒內完成所有交易動作（包含借款與還款）。

可以這麼做的原因是因為，因以太坊每個區塊出塊時間大約是 15-20 秒，所以只需要在這段時間內還回並支付利息，其實對區塊鏈來說貸款方只是短暫地使用它並沒有真正持有。

這樣的條件讓閃電貸變得可行，使用方並沒有真正持有該資產所以借出資金的人也不要貸款方提供抵押品來確保資產安全。

### RWA（real world item)

Aave 與 Centrifuge 合作 發掘新市場 RWA 也就是將現實世界的資產抵押換成加密貨幣
<https://news.cnyes.com/news/id/4794103>

### Aave 跨鏈

* Polygon
* 其他新鍊...

>[跨練治理](https://news.cnyes.com/news/id/4717043)

## Anchor

主要運行在 Terry Chain 的 DeFi 平台，主打 20% 年化報酬率吸引超多用戶進入，前陣子平台的儲備金差點見底，但在大東家的強力贊助下重獲新生。

有興趣可以參考 terry 的 yt

* <https://www.youtube.com/watch?v=P6XYXfePAsA>
* <https://www.youtube.com/watch?v=qefEi0grWeA>

其他還有更多就不多一一贅述：

* [MKR](https://coinmarketcap.com/zh-tw/currencies/maker/)
* [COMP](https://coinmarketcap.com/zh-tw/currencies/compound/)

# [預言機](https://blockcast.it/2020/09/01/star-bit-is-chainlink-a-bubble/)

區塊鏈是封閉系統，也因此，區塊鏈上運行的智能合約無法直接獲取區塊鏈外的資訊，區塊鏈世界也會與我們的現實世界脫節，完全無法獲得大規模的採用與落地實現的可能

因此，就需要預言機這個服務，來幫助區塊鏈獲取外部資訊

單一外部數據不可靠，又容易有安全疑慮，如果能確保數據來源的完整性與真實性，又能維持數據來源的去中心化，使這一系統不會發生單點失效的問題，是不是就能解決區塊鏈連接真實世界的難題?

## Chain link

Chainlink 所打造的「去中心化預言機」，為的就是確保區塊鏈對接外部的資料，不會發生單點失效的問題，以及能確保數據可信度。

Chainlink 所做的事情，用最簡單的話來說就是「智能合約的智能合約」，只不過 Chainlink 的智能合約是從多個外部數據獲取資料，整合後再上傳到用戶的智能合約中。是區塊鏈與現實世界的橋樑。

### Chain 的 token - Link

1. 使用代幣 LINK 向 ChainLink 節點運營商付款，用於取得鏈下數據，將格式化為區塊鏈的可寫入格式。
2. 成為節點營運商須抵押一定數量的 LINK，道理與其他 PoS 系統雷同。

# 參考連結

[https://www.bnext.com.tw/article/64212/defi](https://www.bnext.com.tw/article/64212/defi)

[https://rich01.com/what-is-defi/](https://rich01.com/what-is-defi/)

[https://www.edigest.hk/投資/去中心化金融-defi-鏈新聞-331929/5/](https://www.edigest.hk/%e6%8a%95%e8%b3%87/%e5%8e%bb%e4%b8%ad%e5%bf%83%e5%8c%96%e9%87%91%e8%9e%8d-defi-%e9%8f%88%e6%96%b0%e8%81%9e-331929/5/)

[https://technews.tw/2020/09/15/what-is-defi-and-why-so-risky/](https://technews.tw/2020/09/15/what-is-defi-and-why-so-risky/)

[https://www.blocktempo.com/understanding-total-value-locked/](https://www.blocktempo.com/understanding-total-value-locked/)

[https://www.youtube.com/watch?v=vrBylnQ5Cqc](https://www.youtube.com/watch?v=vrBylnQ5Cqc)

[https://www.youtube.com/watch?v=ti0r4DtZPnw](https://www.youtube.com/watch?v=ti0r4DtZPnw)

[https://inf.news/zh-tw/economy/05a13ba5421c55a480c054c2788333f3.html](https://inf.news/zh-tw/economy/05a13ba5421c55a480c054c2788333f3.html)

<https://earning.tw/defi-in-investing/#DeFi%E6%98%AF%E4%BB%80%E9%BA%BC%EF%BC%9F%E7%8D%B2%E5%88%A9%E5%8E%9F%E7%90%86%E7%82%BA%E4%BD%95%EF%BC%9F>

<https://cryptowesearch.com/blog/all/staking>

<https://www.kraken.com/learn/what-is-aave-lend>

<https://coinmarketcap.com/zh-tw/currencies/aave/>

<https://101blockchains.com/solana-vs-polygon-vs-ethereum/>

<https://www.youtube.com/watch?v=XjXGgY5elE0>

<https://www.youtube.com/watch?v=GWMoPlPC_Eo>
