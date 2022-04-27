---
layout: 'layouts/base.njk'
pagination:
    data: posts
    size: 1
    alias: post
permalink: 'posts/{{post.title | slug}}'
---

<h1>fake post </h1>

{%- for post in posts -%}

<div>
    <h2>
        <a> 
            {{post.id}}{{post.title}}
        </a>
    </h2>
    <p>{{post.body}}</p>
</div>

<a href="/">Back</a>