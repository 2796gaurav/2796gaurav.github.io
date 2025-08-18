// Application data from provided JSON
const appData = {
  personal_info: {
    name: "Gaurav Chauhan",
    title: "AI & Machine Learning",
    bio: "I'm passionate about transforming complex data into actionable insights and building intelligent systems that solve real-world problems. With expertise in machine learning, data analysis, and software engineering, I enjoy sharing my journey through detailed technical writing.",
    skills: ["Python", "Machine Learning", "Deep Learning", "Data Analysis", "TensorFlow/PyTorch", "SQL", "JavaScript", "Docker", "Git", "AWS"]
  },
  blog_posts: [
    {
      title: "Data Visualisation Analysis temp",
      date: "2024-02-15",
      read_time: "12 min read",
      excerpt: "Learn how to design and implement machine learning pipelines that scale from experimentation to production. We'll cover data validation, model versioning, automated testing, and deployment strategies using modern MLOps practices.",
      filename: "data_visualization_analysis.html",
      tags: ["Machine Learning", "MLOps", "Python", "Production"],
      featured: true,
      content: "machine learning pipeline production mlops deployment python scikit-learn tensorflow model versioning data validation automated testing ci cd docker kubernetes aws"
    },
    {
      title: "Machine learning pipeline temp",
      date: "2024-02-08",
      read_time: "8 min read",
      excerpt: "Discover advanced data visualization techniques that go beyond bar charts and scatter plots. We'll explore interactive visualizations, storytelling with data, and how to choose the right visualization for your audience and message.",
      filename: "machine_learning_pipeline.html",
      tags: ["Data Visualization", "D3.js", "Python", "Storytelling"],
      featured: true,
      content: "data visualization storytelling d3js matplotlib plotly seaborn interactive charts dashboard design principles color theory data science python javascript"
    }
  ],
  portfolio_projects: [
    {
      title: "Predictive Analytics Platform",
      description: "End-to-end machine learning platform for retail forecasting, serving real-time predictions to 50K+ daily users with 99.9% uptime.",
      tech_stack: ["Python", "TensorFlow", "Docker", "AWS", "React"],
      github_url: "https://github.com/yourusername/predictive-platform",
      demo_url: "https://demo.predictive-platform.com"
    },
    {
      title: "Real-time Data Pipeline", 
      description: "Scalable data processing system handling 1M+ events per minute, built with Apache Kafka, Spark, and modern data engineering practices.",
      tech_stack: ["Apache Kafka", "Spark", "Python", "AWS", "MongoDB"],
      github_url: "https://github.com/yourusername/data-pipeline",
      demo_url: "https://pipeline-dashboard.demo.com"
    },
    {
      title: "NLP Research Tool",
      description: "Academic research platform for natural language processing experiments, featuring transformer fine-tuning and custom evaluation metrics.",
      tech_stack: ["PyTorch", "Transformers", "FastAPI", "Vue.js", "PostgreSQL"],
      github_url: "https://github.com/yourusername/nlp-research",
      demo_url: "https://nlp-tool.research.demo.com"
    }
  ]
};

// DOM elements
let navToggle, navMenu, navLinks, sections, skillsGrid, portfolioGrid, blogPosts, searchInput, searchClear, noResults, postContent, backToBlog, blogIframe;

// State
let currentSection = 'home';
let filteredPosts = [...appData.blog_posts];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeDOMElements();
  initializeNavigation();
  loadSkills();
  loadPortfolioProjects();
  loadBlogPosts();
  initializeSearch();
  showSection('home');
});

// Initialize DOM elements
function initializeDOMElements() {
  navToggle = document.getElementById('navToggle');
  navMenu = document.getElementById('navMenu');
  navLinks = document.querySelectorAll('.nav__link');
  sections = document.querySelectorAll('.section');
  skillsGrid = document.getElementById('skillsGrid');
  portfolioGrid = document.getElementById('portfolioGrid');
  blogPosts = document.getElementById('blogPosts');
  searchInput = document.getElementById('searchInput');
  searchClear = document.getElementById('searchClear');
  noResults = document.getElementById('noResults');
  postContent = document.getElementById('postContent');
  backToBlog = document.getElementById('backToBlog');

  // Create iframe element for blog posts
  createBlogIframe();
}

// Create responsive iframe for blog posts
function createBlogIframe() {
  if (!postContent) return;

  // Clear existing content
  postContent.innerHTML = '';

  // Create iframe container for responsive design
  const iframeContainer = document.createElement('div');
  iframeContainer.className = 'iframe-container';

  // Create the iframe
  blogIframe = document.createElement('iframe');
  blogIframe.id = 'blogIframe';
  blogIframe.className = 'blog-iframe';
  blogIframe.setAttribute('frameborder', '0');
  blogIframe.setAttribute('scrolling', 'auto');
  blogIframe.setAttribute('allowfullscreen', '');

  // Add loading message
  const loadingMessage = document.createElement('div');
  loadingMessage.className = 'iframe-loading';
  loadingMessage.innerHTML = '<div class="loading-spinner"></div><p>Loading blog post...</p>';

  iframeContainer.appendChild(loadingMessage);
  iframeContainer.appendChild(blogIframe);
  postContent.appendChild(iframeContainer);

  // Handle iframe load events
  blogIframe.addEventListener('load', function() {
    // Hide loading message
    loadingMessage.style.display = 'none';
    blogIframe.style.display = 'block';

    // Try to adjust iframe height automatically (for same-origin content)
    try {
      adjustIframeHeight();
    } catch (e) {
      console.log('Cannot adjust iframe height (different origin)');
    }
  });

  blogIframe.addEventListener('error', function() {
    loadingMessage.innerHTML = '<p style="color: #ff4444;">Failed to load blog post</p>';
  });
}

// Adjust iframe height to content (works for same-origin only)
function adjustIframeHeight() {
  try {
    if (blogIframe && blogIframe.contentWindow && blogIframe.contentWindow.document) {
      const iframeDoc = blogIframe.contentWindow.document;
      const body = iframeDoc.body;
      const html = iframeDoc.documentElement;

      const height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );

      // Set minimum and maximum heights
      const minHeight = 600;
      const maxHeight = Math.max(window.innerHeight * 0.8, 800);
      const finalHeight = Math.min(Math.max(height + 50, minHeight), maxHeight);

      blogIframe.style.height = finalHeight + 'px';
    }
  } catch (e) {
    // Fallback height for cross-origin or other errors
    blogIframe.style.height = '800px';
  }
}

// Navigation functionality
function initializeNavigation() {
  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  // Navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const section = this.getAttribute('data-section');
      if (section) {
        showSection(section);
        // Close mobile menu
        if (navMenu && navToggle) {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
        }
      }
    });
  });

  // Back to blog button
  if (backToBlog) {
    backToBlog.addEventListener('click', function(e) {
      e.preventDefault();
      showSection('blog');
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navToggle && navMenu && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
}

// Show specific section
function showSection(sectionName) {
  // Hide all sections
  sections.forEach(section => {
    section.classList.remove('active');
  });

  // Show target section
  const targetSection = document.getElementById(sectionName);
  if (targetSection) {
    targetSection.classList.add('active');
    currentSection = sectionName;
  }

  // Update navigation
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === sectionName) {
      link.classList.add('active');
    }
  });

  // Clear search when switching to blog
  if (sectionName === 'blog') {
    clearSearch();
  }

  // Scroll to top
  window.scrollTo(0, 0);
}

// Load skills
function loadSkills() {
  if (!skillsGrid) return;

  skillsGrid.innerHTML = '';
  appData.personal_info.skills.forEach(skill => {
    const skillElement = document.createElement('span');
    skillElement.className = 'skill-tag';
    skillElement.textContent = skill;
    skillsGrid.appendChild(skillElement);
  });
}

// Load portfolio projects
function loadPortfolioProjects() {
  if (!portfolioGrid) return;

  portfolioGrid.innerHTML = '';
  appData.portfolio_projects.forEach(project => {
    const projectCard = createProjectCard(project);
    portfolioGrid.appendChild(projectCard);
  });
}

function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';

  const techTags = project.tech_stack.map(tech => 
    `<span class="tech-tag">${tech}</span>`
  ).join('');

  card.innerHTML = `
    <div class="project-card__content">
      <h3 class="project-card__title">${project.title}</h3>
      <p class="project-card__description">${project.description}</p>
      <div class="project-card__tech">${techTags}</div>
      <div class="project-card__links">
        <a href="${project.github_url}" target="_blank" class="project-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          GitHub
        </a>
        <a href="${project.demo_url}" target="_blank" class="project-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15,3 21,3 21,9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          Demo
        </a>
      </div>
    </div>
  `;

  return card;
}

// Load blog posts
function loadBlogPosts() {
  if (!blogPosts) return;

  renderBlogPosts(filteredPosts);
}

function renderBlogPosts(posts) {
  if (!blogPosts) return;

  blogPosts.innerHTML = '';

  if (posts.length === 0) {
    showNoResults(true);
    return;
  }

  showNoResults(false);
  posts.forEach(post => {
    const postCard = createBlogPostCard(post);
    blogPosts.appendChild(postCard);
  });
}

function createBlogPostCard(post) {
  const card = document.createElement('article');
  card.className = 'article-card';

  const tags = post.tags.map(tag => 
    `<span class="article-tag">${tag}</span>`
  ).join('');

  card.innerHTML = `
    <div class="article-meta">
      <span class="article-date">${formatDate(post.date)}</span>
      <span>•</span>
      <span class="article-read-time">${post.read_time}</span>
    </div>
    <h2 class="article-title">${post.title}</h2>
    <p class="article-excerpt">${post.excerpt}</p>
    <div class="article-tags">${tags}</div>
  `;

  // Add click handler to show individual blog post
  card.addEventListener('click', function() {
    showBlogPost(post);
  });

  return card;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });
}

// IMPROVED: Show blog post using iframe instead of innerHTML
function showBlogPost(post) {
  if (!blogIframe) {
    createBlogIframe();
  }

  // Show loading state
  const loadingMessage = document.querySelector('.iframe-loading');
  if (loadingMessage) {
    loadingMessage.style.display = 'flex';
  }

  // Hide iframe initially
  blogIframe.style.display = 'none';

  // Set iframe source to load the complete HTML file
  const blogPath = `blog/${post.filename}`;

  // Add timestamp to prevent caching issues during development
  const timestamp = new Date().getTime();
  blogIframe.src = `${blogPath}?t=${timestamp}`;

  // Show blog post section
  showSection("blogPost");

  // Update page title (optional)
  if (post.title) {
    document.title = `${post.title} - Your Blog Name`;
  }
}

// Search functionality
function initializeSearch() {
  if (!searchInput || !searchClear) return;

  searchInput.addEventListener('input', handleSearch);
  searchInput.addEventListener('keyup', handleSearchKeyup);
  searchClear.addEventListener('click', clearSearch);
}

function handleSearch() {
  const query = searchInput.value.toLowerCase().trim();

  if (query.length === 0) {
    filteredPosts = [...appData.blog_posts];
    searchClear.classList.remove('show');
  } else {
    filteredPosts = appData.blog_posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query)) ||
      post.content.toLowerCase().includes(query)
    );
    searchClear.classList.add('show');
  }

  renderBlogPosts(filteredPosts);
}

function handleSearchKeyup(e) {
  if (e.key === 'Escape') {
    clearSearch();
  }
}

function clearSearch() {
  searchInput.value = '';
  searchClear.classList.remove('show');
  filteredPosts = [...appData.blog_posts];
  renderBlogPosts(filteredPosts);
}

function showNoResults(show) {
  if (!noResults) return;

  if (show) {
    noResults.classList.remove('hidden');
  } else {
    noResults.classList.add('hidden');
  }
}

// Utility function for responsive iframe handling
function handleIframeResize() {
  if (blogIframe && currentSection === 'blogPost') {
    adjustIframeHeight();
  }
}

// Listen for window resize to adjust iframe
window.addEventListener('resize', function() {
  setTimeout(handleIframeResize, 100);
});

// Message handler for iframe communication (if needed)
window.addEventListener('message', function(event) {
  // Handle messages from iframe if needed
  if (event.data && event.data.height && blogIframe) {
    const height = parseInt(event.data.height);
    if (height > 0) {
      blogIframe.style.height = Math.max(height, 600) + 'px';
    }
  }
});
