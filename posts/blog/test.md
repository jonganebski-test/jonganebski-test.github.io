---
title: "객체를 복사하는 방법, JSON.parse(JSON.stringify(Object)) vs 깊은 복사"
date: "2021-02-15"
coverUrl: "https://images.unsplash.com/flagged/photo-1582733265415-a0740c8a82fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
---

<img src="https://images.unsplash.com/flagged/photo-1582733265415-a0740c8a82fd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="Stairs" title="Stairs" />
<span class="photo-reference">Photo by <a href="https://unsplash.com/@seimesa?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Mario Mesaglio</a> on <a href="https://unsplash.com/s/photos/recursive?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noopener">Unsplash</a></span>

## 왜 이러지??

```js
const test = [1, 2, 3, 4, 5];

const copied = test;

test.pop();

console.log(copied);
// 기대한 copied의 값
// [1, 2, 3, 4, 5]
// 출력되는 copied의 값
// [1, 2, 3, 4]
```
