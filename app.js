// Application data from provided JSON
const appData = {
  personal_info: {
    name: "Gaurav Chauhan",
    title: "Senior Machine Learning Engineer",
    bio: "7+ years of experience specializing in MLOps, LLMops, Generative AI, Search Infrastructure, and Cloud platforms. Leading ML teams to build high-impact, compliant, and efficient machine learning systems. Open-source contributor to LangChain, Pandas, Microsoft Qlib, and more.",
    skills: ["Python", "Machine Learning", "Deep Learning", "Generative AI", "LLMops", "MLOps", "TensorFlow/PyTorch", "Apache Airflow", "FastAPI", "AWS", "GCP", "Kubernetes", "Docker", "Typesense", "SQL", "MongoDB", "JavaScript", "Git"]
  },
  blog_posts: [
    {
      title: "Building Production-Ready LLMops Pipelines: From Development to Deployment",
      date: "2024-03-20",
      read_time: "15 min read",
      excerpt: "A comprehensive guide to implementing LLMops best practices in production environments. Learn about model versioning, streaming chatbots, guardrails, security, and compliance frameworks for LLM deployments in fintech and enterprise applications.",
      filename: "llmops_production_guide.html",
      tags: ["LLMops", "Generative AI", "Production", "Fintech", "Compliance"],
      featured: true,
      content: "llmops production deployment streaming chatbots guardrails security compliance fintech regulatory frameworks llm deployment model versioning continuous learning monitoring alerting"
    },
    {
      title: "High-Performance Search Infrastructure with Typesense: Achieving Sub-100ms Latency",
      date: "2024-03-15",
      read_time: "12 min read",
      excerpt: "Deep dive into building scalable search infrastructure that delivers 100ms latency at scale. Explore segment-level recommendations, indexing strategies, query optimization, and real-world implementation patterns used in production trading platforms.",
      filename: "search_infrastructure_typesense.html",
      tags: ["Search Infrastructure", "Typesense", "Performance", "Architecture", "Real-time"],
      featured: true,
      content: "search infrastructure typesense latency optimization indexing query optimization segment-level recommendations real-time search production architecture scalability"
    },
    {
      title: "Regulatory Frameworks for LLMs in Fintech: A Practical Implementation Guide",
      date: "2024-03-10",
      read_time: "18 min read",
      excerpt: "Learn how to implement safe and compliant LLMs for financial products. This guide covers regulatory requirements, guardrails implementation, PII masking, audit trails, and compliance strategies for deploying AI chatbots in regulated industries.",
      filename: "llm_fintech_compliance.html",
      tags: ["LLMops", "Fintech", "Compliance", "Security", "Regulatory"],
      featured: true,
      content: "llm fintech compliance regulatory frameworks guardrails security pii masking audit trails financial services safe ai deployment regulatory requirements"
    },
    {
      title: "CI/CD for Data Science: Automating ML Model Deployment",
      date: "2024-03-05",
      read_time: "14 min read",
      excerpt: "Master the art of building CI/CD pipelines specifically designed for data science teams. From automated testing to model versioning, deployment strategies, and continuous learning methodologies that ensure reliable ML model releases.",
      filename: "cicd_data_science.html",
      tags: ["MLOps", "CI/CD", "DevOps", "Automation", "Deployment"],
      featured: false,
      content: "ci cd data science mlops automation deployment github actions model versioning automated testing continuous learning data validation pipeline orchestration"
    },
    {
      title: "Building AI Trading Copilots: Real-time News Aggregation and Intelligent Assistance",
      date: "2024-02-28",
      read_time: "16 min read",
      excerpt: "Architectural patterns and implementation strategies for building AI-powered trading assistants. Covering near real-time news aggregation, document Q&A, personalized chatbot interfaces, and intelligent human agent escalation systems.",
      filename: "ai_trading_copilot.html",
      tags: ["Generative AI", "Trading", "Real-time", "Chatbots", "Architecture"],
      featured: true,
      content: "ai trading copilot real-time news aggregation chatbot document qa personalized assistance human agent escalation trading platform architecture"
    },
  ],
  portfolio_projects: [
    {
      title: "AI Trading Copilot at Upstox",
      description: "Led development of an AI-based Trading Copilot featuring near real-time news aggregation, internal documentation support, and personalized user assistance via chatbot interface with intelligent human agent escalation.",
      tech_stack: ["Python", "Generative AI", "LLMops", "FastAPI", "Real-time Systems"],
      github_url: "https://github.com/2796gaurav",
      demo_url: "https://upstox.com/contact-us/"
    },
    {
      title: "High-Performance Search Infrastructure", 
      description: "Established search infrastructure achieving 100ms latency with segment-level recommendations using Typesense. Designed for high-throughput, low-latency search operations in production trading platform.",
      tech_stack: ["Typesense", "Python", "Search Architecture", "Performance Optimization"],
      github_url: "https://github.com/2796gaurav",
      demo_url: null
    },
    {
      title: "Health Pre-Policy Digitalization System",
      description: "Engineered best-in-class health pre-policy digitalization process using AWS Textract (OCR) and custom NLP architecture, increasing bottom line by 40% and significantly improving data enrichment.",
      tech_stack: ["AWS Textract", "NLP", "OCR", "Python", "FastAPI"],
      github_url: "https://github.com/2796gaurav",
      demo_url: null
    },
    {
      title: "Fraud Detection & Knowledge Graph System",
      description: "Implemented cutting-edge fraud detection and knowledge graph architecture for motor and health claims, improving real-time fraud identification and cross-selling capabilities at Bajaj Allianz.",
      tech_stack: ["Knowledge Graphs", "Graph Neural Networks", "Python", "Machine Learning"],
      github_url: "https://github.com/2796gaurav",
      demo_url: null
    },
    {
      title: "Quantitative Analysis System for Investments",
      description: "Built custom quantitative analysis system for investments team with forecasting models, portfolio optimization, news sentiment analysis, asset class overviews, and weighting calculations.",
      tech_stack: ["Python", "Machine Learning", "Sentiment Analysis", "Portfolio Optimization"],
      github_url: "https://github.com/2796gaurav",
      demo_url: null
    },
    {
      title: "News Recommendation Engine",
      description: "Created NLP-based recommendation engine for market articles at Moneycontrol, achieving 42% conversion rate for accurately predicting users' next article interests.",
      tech_stack: ["NLP", "Recommendation Systems", "Python", "Machine Learning"],
      github_url: "https://github.com/2796gaurav",
      demo_url: null
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
  const listItem = document.createElement('li');
  listItem.className = 'project-item';

  const techTags = project.tech_stack.map(tech => 
    `<span class="tech-tag">${tech}</span>`
  ).join('');

  const demoLink = project.demo_url ? `
        <a href="${project.demo_url}" target="_blank" class="project-link" aria-label="View demo">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15,3 21,3 21,9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          <span>Demo</span>
        </a>
  ` : '';

  listItem.innerHTML = `
    <div class="project-item__header">
      <h3 class="project-item__title">${project.title}</h3>
      <div class="project-item__links">
        <a href="${project.github_url}" target="_blank" class="project-link" aria-label="View on GitHub">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          <span>GitHub</span>
        </a>
        ${demoLink}
      </div>
    </div>
    <p class="project-item__description">${project.description}</p>
    <div class="project-item__tech">${techTags}</div>
  `;

  return listItem;
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
    document.title = `${post.title} - Gaurav Chauhan`;
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
