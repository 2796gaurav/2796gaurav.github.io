---
layout: default
title: "Blog"
permalink: /blog/
---

<div class="blog-page">
    <!-- Blog Header with Search -->
    <section class="blog-header">
        <div class="container">
            <h1 class="page-title" data-reveal>
                <span class="title-text">Blog</span>
                <span class="title-subtitle">Insights & Discoveries</span>
            </h1>
            
            <!-- Search Bar -->
            <div class="search-container" data-reveal>
                <div class="search-wrapper">
                    <input type="text" 
                           id="searchInput" 
                           class="search-input" 
                           placeholder="Search articles, topics, or technologies..."
                           autocomplete="off">
                    <div class="search-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="21 21l-4.35-4.35"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Blog Content -->
    <section class="blog-content">
        <div class="container">
            {% if site.posts.size > 0 %}
            <div class="blog-grid" id="blogGrid">
                {% for post in site.posts %}
                <article class="blog-card" 
                         data-title="{{ post.title | downcase }}"
                         data-category="{{ post.categories | first | downcase }}"
                         data-tags="{{ post.tags | join: ' ' | downcase }}"
                         data-content="{{ post.content | strip_html | downcase | truncate: 200 }}"
                         data-reveal>
                    
                    <div class="blog-card-content">
                        <div class="blog-meta">
                            <time class="blog-date">{{ post.date | date: "%B %d, %Y" }}</time>
                            {% if post.categories.size > 0 %}
                            <span class="blog-category">{{ post.categories | first }}</span>
                            {% endif %}
                        </div>
                        
                        <h2 class="blog-title">
                            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                        </h2>
                        
                        <p class="blog-excerpt">
                            {{ post.excerpt | strip_html | truncate: 140 }}
                        </p>
                        
                        {% if post.tags.size > 0 %}
                        <div class="blog-tags">
                            {% for tag in post.tags limit:3 %}
                            <span class="blog-tag">{{ tag }}</span>
                            {% endfor %}
                        </div>
                        {% endif %}
                        
                        <a href="{{ post.url | relative_url }}" class="read-more">
                            Continue Reading →
                        </a>
                    </div>
                </article>
                {% endfor %}
            </div>
            {% else %}
            <!-- Empty State -->
            <div class="empty-state">
                <div class="empty-content">
                    <div class="empty-icon">📓</div>
                    <h3>Blog Posts Coming Soon!</h3>
                    <p>Add your Jupyter notebooks to the <code>notebooks/</code> directory and they'll automatically become blog posts.</p>
                    <div class="jupyter-info">
                        <h4>How it works:</h4>
                        <ol>
                            <li>Add <code>.ipynb</code> files to <code>notebooks/</code> folder</li>
                            <li>Push to GitHub</li>
                            <li>GitHub Actions converts them to blog posts</li>
                            <li>Your blog is automatically updated!</li>
                        </ol>
                    </div>
                </div>
            </div>
            {% endif %}
        </div>
    </section>
</div>
