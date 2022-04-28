---
layout: 'layouts/base.njk'
pagination:
    data: posts
    size: 1
    alias: post
permalink: 'posts/{{post.title | slug}}/'
---
<div>
    <h2>
        <a href="/posts/{{post.title | slug}}/"> 
            {{post.id}}-{{post.title}}
        </a>
    </h2>
    <p>{{post.body}}</p>
</div>

<a href="/posts">Back</a>