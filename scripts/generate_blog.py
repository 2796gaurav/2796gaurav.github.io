# scripts/generate_blog.py
import json
import os
from pathlib import Path
from datetime import datetime
from jinja2 import Template

def load_metadata():
    """Load posts metadata"""
    metadata_file = Path('docs/posts_metadata.json')
    if metadata_file.exists():
        with open(metadata_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def generate_index_page(posts_metadata):
    """Generate the main blog index page"""
    
    template_str = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Gaurav's Data Science Blog - Exploring data through code, visualizations, and insights. Find articles on Python, machine learning, data analysis, and more.">
    <meta name="keywords" content="data science, python, machine learning, data analysis, jupyter notebooks, plotly, seaborn, visualization">
    <meta name="author" content="Gaurav">
    <meta property="og:title" content="Gaurav's Data Science Blog">
    <meta property="og:description" content="Exploring data through code, visualizations, and insights">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://2796gaurav.github.io/">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Gaurav's Data Science Blog">
    <meta name="twitter:description" content="Exploring data through code, visualizations, and insights">
    <title>Gaurav's Data Science Blog</title>
    <link rel="canonical" href="https://2796gaurav.github.io/">
    
    <!-- JSON-LD structured data for SEO -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Gaurav's Data Science Blog",
        "description": "A blog about data science, machine learning, and data analysis",
        "url": "https://2796gaurav.github.io/",
        "author": {
            "@type": "Person",
            "name": "Gaurav"
        },
        "blogPost": [
            {% for post in posts %}
            {
                "@type": "BlogPosting",
                "headline": "{{ post.title }}",
                "description": "{{ post.description }}",
                "datePublished": "{{ post.created_date }}",
                "dateModified": "{{ post.updated_date }}",
                "url": "https://2796gaurav.github.io/{{ post.html_file }}",
                "author": {
                    "@type": "Person", 
                    "name": "Gaurav"
                }
            }{% if not loop.last %},{% endif %}
            {% endfor %}
        ]
    }
    </script>
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8f9fa;
        }
        
        .header {
            background: linear-gradient(135deg, #007acc, #0056b3);
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 3em;
            margin-bottom: 10px;
            font-weight: 300;
        }
        
        .header p {
            font-size: 1.2em;
            opacity: 0.9;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        
        .search-filter-section {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        
        .search-box {
            width: 100%;
            padding: 15px;
            font-size: 16px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            margin-bottom: 20px;
            transition: border-color 0.3s ease;
        }
        
        .search-box::placeholder {
            color: #999;
        }
        
        .search-results-info {
            margin-bottom: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            color: #666;
            font-size: 0.9em;
        }
        
        .highlight-match {
            background: #fff3cd;
            padding: 1px 3px;
            border-radius: 3px;
        }
        
        .filters {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            align-items: center;
        }
        
        .filter-group {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .filter-group label {
            font-weight: 500;
            color: #666;
        }
        
        .filter-select {
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            background: white;
        }
        
        .posts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 25px;
        }
        
        .post-card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }
        
        .post-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 15px rgba(0,0,0,0.15);
        }
        
        .post-title {
            font-size: 1.4em;
            font-weight: 600;
            color: #007acc;
            margin-bottom: 10px;
            text-decoration: none;
        }
        
        .post-title:hover {
            text-decoration: underline;
        }
        
        .post-description {
            color: #666;
            margin-bottom: 15px;
            line-height: 1.5;
        }
        
        .post-meta {
            font-size: 0.9em;
            color: #888;
            margin-bottom: 15px;
        }
        
        .post-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
        }
        
        .tag {
            background: #e3f2fd;
            color: #1976d2;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.8em;
            font-weight: 500;
        }
        
        .no-posts {
            text-align: center;
            color: #666;
            font-size: 1.2em;
            margin-top: 50px;
        }
        
        .stats {
            text-align: center;
            margin-bottom: 30px;
            color: #666;
        }
        
        @media (max-width: 768px) {
            .header h1 {
                font-size: 2em;
            }
            
            .filters {
                flex-direction: column;
                align-items: stretch;
            }
            
            .filter-group {
                justify-content: space-between;
            }
            
            .posts-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Gaurav's Data Science Blog</h1>
        <p>Exploring data through code, visualizations, and insights</p>
    </div>
    
    <div class="container">
        <div class="search-filter-section">
            <input type="text" id="searchBox" class="search-box" placeholder="Search articles by title, description, or tags..." autocomplete="off">
            
            <div class="search-results-info" id="searchInfo" style="display: none;">
                <span id="searchInfoText"></span>
            </div>
            
            <div class="filters">
                <div class="filter-group">
                    <label for="categoryFilter">Category:</label>
                    <select id="categoryFilter" class="filter-select">
                        <option value="">All Categories</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label for="sortBy">Sort by:</label>
                    <select id="sortBy" class="filter-select">
                        <option value="updated_desc">Last Updated</option>
                        <option value="created_desc">Recently Added</option>
                        <option value="title_asc">Title A-Z</option>
                        <option value="title_desc">Title Z-A</option>
                    </select>
                </div>
            </div>
        </div>
        
        <div class="stats">
            <p>Total Articles: <span id="totalCount">{{ posts|length }}</span> | Showing: <span id="showingCount">{{ posts|length }}</span></p>
        </div>
        
        <div class="posts-grid" id="postsGrid">
            {% for post in posts %}
            <div class="post-card" data-title="{{ post.title|lower }}" data-description="{{ post.description|lower }}" data-tags="{{ post.tags|join(' ')|lower }}" data-category="{{ post.category|lower }}" data-created="{{ post.created_date }}" data-updated="{{ post.updated_date }}">
                <a href="{{ post.html_file }}" class="post-title">{{ post.title }}</a>
                <div class="post-description">{{ post.description or "Click to read this data science article..." }}</div>
                <div class="post-meta">
                    {% if post.created_date != post.updated_date %}
                    Updated: {{ post.updated_date[:10] }}
                    {% else %}
                    Published: {{ post.created_date[:10] }}
                    {% endif %}
                    {% if post.category %} | Category: {{ post.category }}{% endif %}
                </div>
                {% if post.tags %}
                <div class="post-tags">
                    {% for tag in post.tags %}
                    <span class="tag">{{ tag }}</span>
                    {% endfor %}
                </div>
                {% endif %}
            </div>
            {% endfor %}
        </div>
        
        <div class="no-posts" id="noPosts" style="display: none;">
            No articles found matching your search criteria.
        </div>
    </div>
    
    <script>
        const posts = {{ posts|tojson }};
        const postsGrid = document.getElementById('postsGrid');
        const noPosts = document.getElementById('noPosts');
        const searchBox = document.getElementById('searchBox');
        const categoryFilter = document.getElementById('categoryFilter');
        const sortBy = document.getElementById('sortBy');
        const searchInfo = document.getElementById('searchInfo');
        const searchInfoText = document.getElementById('searchInfoText');
        
        // Debounce function for search
        function debounce(func, delay) {
            let timeoutId;
            return function (...args) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => func.apply(this, args), delay);
            };
        }
        
        // Highlight search terms in text
        function highlightText(text, searchTerm) {
            if (!searchTerm) return text;
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            return text.replace(regex, '<span class="highlight-match">$1</span>');
        }
        
        // Populate category filter
        const categories = [...new Set(posts.map(post => post.category).filter(cat => cat))];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.toLowerCase();
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
        
        function filterAndSortPosts() {
            const searchTerm = searchBox.value.toLowerCase().trim();
            const selectedCategory = categoryFilter.value;
            const selectedSort = sortBy.value;
            
            // Show/hide search info
            if (searchTerm) {
                searchInfo.style.display = 'block';
                searchInfoText.textContent = `Searching for: "${searchBox.value}"`;
            } else {
                searchInfo.style.display = 'none';
            }
            
            let filteredPosts = posts.filter(post => {
                const matchesSearch = !searchTerm || 
                    post.title.toLowerCase().includes(searchTerm) ||
                    (post.description && post.description.toLowerCase().includes(searchTerm)) ||
                    post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                    (post.category && post.category.toLowerCase().includes(searchTerm));
                
                const matchesCategory = !selectedCategory || 
                    (post.category && post.category.toLowerCase() === selectedCategory);
                
                return matchesSearch && matchesCategory;
            });
            
            // Sort posts
            filteredPosts.sort((a, b) => {
                switch(selectedSort) {
                    case 'updated_desc':
                        return new Date(b.updated_date) - new Date(a.updated_date);
                    case 'created_desc':
                        return new Date(b.created_date) - new Date(a.created_date);
                    case 'title_asc':
                        return a.title.localeCompare(b.title);
                    case 'title_desc':
                        return b.title.localeCompare(a.title);
                    default:
                        return new Date(b.updated_date) - new Date(a.updated_date);
                }
            });
            
            // Update display
            showingCount.textContent = filteredPosts.length;
            
            // Clear previous content
            postsGrid.innerHTML = '';
            
            if (filteredPosts.length === 0) {
                noPosts.style.display = 'block';
                postsGrid.style.display = 'none';
            } else {
                noPosts.style.display = 'none';
                postsGrid.style.display = 'grid';
                
                // Create and append filtered post cards with highlighting
                filteredPosts.forEach(post => {
                    const postCard = document.createElement('div');
                    postCard.className = 'post-card';
                    
                    const title = searchTerm ? highlightText(post.title, searchBox.value) : post.title;
                    const description = searchTerm && post.description ? 
                        highlightText(post.description, searchBox.value) : 
                        (post.description || "Click to read this data science article...");
                    
                    const dateStr = post.created_date !== post.updated_date ? 
                        `Updated: ${post.updated_date.substring(0, 10)}` : 
                        `Published: ${post.created_date.substring(0, 10)}`;
                    
                    const categoryStr = post.category ? ` | Category: ${post.category}` : '';
                    
                    const tagsHtml = post.tags && post.tags.length > 0 ? 
                        `<div class="post-tags">${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : 
                        '';
                    
                    postCard.innerHTML = `
                        <a href="${post.html_file}" class="post-title">${title}</a>
                        <div class="post-description">${description}</div>
                        <div class="post-meta">${dateStr}${categoryStr}</div>
                        ${tagsHtml}
                    `;
                    
                    // Add click handler
                    postCard.addEventListener('click', (e) => {
                        if (e.target.tagName !== 'A') {
                            const link = postCard.querySelector('a');
                            if (link) window.location.href = link.href;
                        }
                    });
                    
                    postsGrid.appendChild(postCard);
                });
            }
        }
        
        // Debounced search function
        const debouncedFilter = debounce(filterAndSortPosts, 300);
        
        // Add event listeners
        searchBox.addEventListener('input', debouncedFilter);
        categoryFilter.addEventListener('change', filterAndSortPosts);
        sortBy.addEventListener('change', filterAndSortPosts);
        
        // Initialize the page
        filterAndSortPosts();
    </script>
</body>
</html>'''
    
    template = Template(template_str)
    
    # Sort posts by updated date (newest first) by default
    sorted_posts = sorted(posts_metadata, 
                         key=lambda x: x.get('updated_date', x.get('created_date', '')), 
                         reverse=True)
    
    html_content = template.render(posts=sorted_posts)
    
    # Write to docs/index.html
    output_path = Path('docs/index.html')
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"Generated index page with {len(posts_metadata)} posts")

def main():
    """Main function to generate blog"""
    posts_metadata = load_metadata()
    generate_index_page(posts_metadata)
    
    # Create a simple 404 page
    error_404 = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Not Found - Gaurav's Blog</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            text-align: center;
            padding: 100px 20px;
            color: #333;
        }
        h1 { color: #007acc; font-size: 3em; margin-bottom: 20px; }
        p { font-size: 1.2em; margin-bottom: 30px; }
        a { color: #007acc; text-decoration: none; font-weight: bold; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <h1>404</h1>
    <p>Page not found</p>
    <a href="/">← Back to Blog</a>
</body>
</html>'''
    
    with open('docs/404.html', 'w', encoding='utf-8') as f:
        f.write(error_404)

if __name__ == '__main__':
    main()