class BlogSearch {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.blogGrid = document.getElementById('blogGrid');
        this.allPosts = [];
        this.filteredPosts = [];
        
        if (this.searchInput && this.blogGrid) {
            this.init();
        }
    }
    
    init() {
        this.loadSearchData();
        this.setupSearch();
        this.setupFilters();
    }
    
    async loadSearchData() {
        try {
            const response = await fetch('/search.json');
            const data = await response.json();
            this.allPosts = data;
            this.filteredPosts = [...this.allPosts];
        } catch (error) {
            console.warn('Search data not available:', error);
            // Fall back to DOM-based search
            this.setupDOMSearch();
        }
    }
    
    setupDOMSearch() {
        this.allPosts = Array.from(document.querySelectorAll('.blog-card')).map(card => ({
            title: card.dataset.title || '',
            category: card.dataset.category || '',
            tags: card.dataset.tags || '',
            content: card.dataset.content || '',
            element: card
        }));
    }
    
    setupSearch() {
        let searchTimeout;
        
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });
        
        // Search suggestions
        this.searchInput.addEventListener('focus', () => {
            this.showSearchSuggestions();
        });
        
        this.searchInput.addEventListener('blur', () => {
            setTimeout(() => this.hideSearchSuggestions(), 200);
        });
    }
    
    performSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (!searchTerm) {
            this.showAllPosts();
            return;
        }
        
        this.filteredPosts = this.allPosts.filter(post => {
            return (
                post.title.toLowerCase().includes(searchTerm) ||
                post.category.toLowerCase().includes(searchTerm) ||
                post.tags.toLowerCase().includes(searchTerm) ||
                post.content.toLowerCase().includes(searchTerm)
            );
        });
        
        this.displayResults();
    }
    
    displayResults() {
        const cards = document.querySelectorAll('.blog-card');
        
        // Hide all cards first
        cards.forEach(card => {
            card.style.display = 'none';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        });
        
        if (this.filteredPosts.length === 0) {
            this.showNoResults();
            return;
        }
        
        this.hideNoResults();
        
        // Show filtered cards with animation
        this.filteredPosts.forEach((post, index) => {
            const card = post.element || document.querySelector(`[data-title="${post.title}"]`);
            if (card) {
                card.style.display = 'block';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
            }
        });
        
        this.updateResultsCount();
    }
    
    showAllPosts() {
        const cards = document.querySelectorAll('.blog-card');
        
        cards.forEach((card, index) => {
            card.style.display = 'block';
            
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 30);
        });
        
        this.hideNoResults();
        this.updateResultsCount();
    }
    
    showNoResults() {
        let noResults = document.getElementById('noResults');
        
        if (!noResults) {
            noResults = this.createNoResultsElement();
            this.blogGrid.parentNode.appendChild(noResults);
        }
        
        noResults.style.display = 'block';
        setTimeout(() => {
            noResults.style.opacity = '1';
            noResults.style.transform = 'translateY(0)';
        }, 100);
    }
    
    hideNoResults() {
        const noResults = document.getElementById('noResults');
        if (noResults) {
            noResults.style.opacity = '0';
            noResults.style.transform = 'translateY(20px)';
            setTimeout(() => {
                noResults.style.display = 'none';
            }, 300);
        }
    }
    
    createNoResultsElement() {
        const noResults = document.createElement('div');
        noResults.id = 'noResults';
        noResults.className = 'no-results';
        noResults.style.opacity = '0';
        noResults.style.transform = 'translateY(20px)';
        noResults.style.transition = 'all 0.3s ease';
        noResults.style.display = 'none';
        
        noResults.innerHTML = `
            <div class="no-results-content">
                <div class="empty-icon">🔍</div>
                <h3>No articles found</h3>
                <p>Try adjusting your search terms or browse all categories</p>
                <button id="clearSearch" class="btn btn-outline">Clear Search</button>
            </div>
        `;
        
        // Add clear search functionality
        noResults.querySelector('#clearSearch').addEventListener('click', () => {
            this.searchInput.value = '';
            this.showAllPosts();
        });
        
        return noResults;
    }
    
    updateResultsCount() {
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            const count = this.filteredPosts.length || document.querySelectorAll('.blog-card:not([style*="display: none"])').length;
            resultsCount.textContent = `${count} article${count !== 1 ? 's' : ''}`;
        }
    }
    
    showSearchSuggestions() {
        // Implementation for search suggestions
        // This could show popular tags, recent searches, etc.
    }
    
    hideSearchSuggestions() {
        // Implementation to hide search suggestions
    }
    
    setupFilters() {
        const categoryFilter = document.getElementById('categoryFilter');
        const sortFilter = document.getElementById('sortFilter');
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => {
                this.applyFilters();
            });
        }
        
        if (sortFilter) {
            sortFilter.addEventListener('change', () => {
                this.applySorting();
            });
        }
    }
    
    applyFilters() {
        // Implementation for category filtering
        const categoryFilter = document.getElementById('categoryFilter');
        const selectedCategory = categoryFilter?.value.toLowerCase();
        
        if (!selectedCategory) {
            this.performSearch(this.searchInput.value);
            return;
        }
        
        this.filteredPosts = this.allPosts.filter(post => {
            const matchesSearch = !this.searchInput.value || 
                post.title.toLowerCase().includes(this.searchInput.value.toLowerCase()) ||
                post.content.toLowerCase().includes(this.searchInput.value.toLowerCase());
            
            const matchesCategory = post.category.toLowerCase() === selectedCategory;
            
            return matchesSearch && matchesCategory;
        });
        
        this.displayResults();
    }
    
    applySorting() {
        // Implementation for sorting (date, title, etc.)
        const sortFilter = document.getElementById('sortFilter');
        const sortBy = sortFilter?.value;
        
        if (!sortBy) return;
        
        // This would require additional data structure for sorting
        // For now, we'll just re-display the current results
        this.displayResults();
    }
}

// Initialize blog search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.blog-page')) {
        new BlogSearch();
    }
});