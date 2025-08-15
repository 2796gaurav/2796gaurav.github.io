// Animation configuration
const ANIMATION_CONFIG = {
    duration: 0.6,
    ease: "ease-out",
    stagger: 0.1,
    threshold: 0.1
};

class AnimationController {
    constructor() {
        this.observedElements = new Set();
        this.skillBars = [];
        this.init();
    }
    
    init() {
        this.handleLoading();
        this.setupScrollAnimations();
        this.setupSkillBars();
        this.setupNavigation();
        this.setupForms();
    }
    
    handleLoading() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (!loadingScreen) return;
        
        // Hide loading screen after animation completes
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Start reveal animations
            this.startInitialAnimations();
        }, 2500);
    }
    
    startInitialAnimations() {
        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero [data-reveal]');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('revealed');
            }, index * 100);
        });
        
        // Show navigation
        const navbar = document.getElementById('navbar');
        if (navbar) {
            navbar.style.opacity = '0';
            navbar.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => {
                navbar.style.transition = 'all 0.6s ease';
                navbar.style.opacity = '1';
                navbar.style.transform = 'translateX(-50%) translateY(0)';
            }, 1000);
        }
    }
    
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.observedElements.has(entry.target)) {
                    this.observedElements.add(entry.target);
                    this.animateElement(entry.target);
                }
            });
        }, {
            threshold: ANIMATION_CONFIG.threshold,
            rootMargin: '-50px'
        });
        
        // Observe all elements with data-reveal attribute
        document.querySelectorAll('[data-reveal]').forEach(el => {
            observer.observe(el);
        });
    }
    
    animateElement(element) {
        // Add stagger delay for grid items
        const parent = element.closest('.skills-grid, .projects-grid, .blog-grid');
        if (parent) {
            const siblings = Array.from(parent.children);
            const index = siblings.indexOf(element);
            const delay = index * 100;
            
            setTimeout(() => {
                element.classList.add('revealed');
            }, delay);
        } else {
            element.classList.add('revealed');
        }
    }
    
    setupSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    const progress = progressBar?.dataset.progress;
                    
                    if (progressBar && progress) {
                        setTimeout(() => {
                            progressBar.style.width = progress + '%';
                        }, 300);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        skillItems.forEach(item => observer.observe(item));
    }
    
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        // Smooth scrolling for anchor links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
        
        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
        
        // Active link highlighting
        this.updateActiveNavLink();
        window.addEventListener('scroll', () => this.updateActiveNavLink());
    }
    
    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    setupForms() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                // Floating label animation
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        input.parentElement.classList.remove('focused');
                    }
                });
                
                // Check if input has value on load
                if (input.value) {
                    input.parentElement.classList.add('focused');
                }
            });
            
            // Form submission
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });
        });
    }
    
    handleFormSubmission(form) {
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        // Show loading state
        button.textContent = 'Sending...';
        button.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            button.textContent = 'Sent!';
            button.style.background = '#4ECDC4';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
                form.reset();
            }, 2000);
        }, 1500);
    }
    
    // Utility methods
    static easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    static lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
});

// Add scroll-triggered navbar background
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 15, 35, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }
});