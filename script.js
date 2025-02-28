// Create the platform statistics chart
document.addEventListener('DOMContentLoaded', function() {
    const chartCanvas = document.getElementById('platformChart');
    
    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Instagram', 'Facebook', 'Twitter', 'LinkedIn'],
                datasets: [{
                    label: 'Platform Growth (%)',
                    data: [65, 45, 35, 30],
                    backgroundColor: [
                        'rgba(255, 215, 0, 0.8)',
                        'rgba(218, 165, 32, 0.8)',
                        'rgba(184, 134, 11, 0.8)',
                        'rgba(218, 165, 32, 0.6)'
                    ],
                    borderColor: [
                        'rgba(255, 215, 0, 1)',
                        'rgba(218, 165, 32, 1)',
                        'rgba(184, 134, 11, 1)',
                        'rgba(218, 165, 32, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 215, 0, 0.1)'
                        },
                        ticks: {
                            color: '#ffffff',
                            font: {
                                family: "'Raleway', sans-serif"
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 215, 0, 0.1)'
                        },
                        ticks: {
                            color: '#ffffff',
                            font: {
                                family: "'Raleway', sans-serif"
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff',
                            font: {
                                family: "'Raleway', sans-serif"
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Social Media Platform Growth',
                        color: '#FFD700',
                        font: {
                            family: "'Cinzel', serif",
                            size: 16
                        }
                    }
                }
            }
        });
    }

    // Update blog post images
    document.querySelectorAll('.blog-card').forEach(card => {
        const img = card.querySelector('img');
        const postId = card.dataset.postId;
        if (img && postId && blogImages[postId]) {
            img.src = blogImages[postId];
            img.alt = postId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
    });

    // Initialize all interactive elements
    initializeInteractiveElements();

    // Pricing Card Hover Effect
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize EmailJS
    try {
        emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
    } catch (error) {
        console.warn('EmailJS initialization failed:', error);
    }

    // Initialize stats animation when in view
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.stat-number').forEach(stat => {
                        const end = parseInt(stat.dataset.target);
                        animateValue(stat, 0, end, 2000);
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(statsSection);
    }

    // Initialize lazy loading for images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            lazyLoadObserver.observe(img);
        });
    }

    // Add modal for blog post details
    document.querySelectorAll('.blog-card .read-more').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const postId = this.closest('.blog-card').dataset.postId;
            const post = blogPosts[postId];
            
            if (post) {
                const modal = document.getElementById('blogModal');
                if (modal) {
                    const title = modal.querySelector('.modal-title');
                    const content = modal.querySelector('.modal-content');
                    
                    if (title && content) {
                        title.textContent = post.title;
                        content.innerHTML = post.content;
                        modal.classList.add('visible');
                    }
                }
            }
        });
    });

    // Close modal when clicking outside
    const modal = document.getElementById('blogModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('visible');
            }
        });
    }

    // Enhance form submission with loading states
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitButton = this.querySelector('button[type="submit"]');
            if (!submitButton) return;

            const removeLoading = loadingStates.addLoadingState(submitButton, 'Sending...');
            
            try {
                // Simulate form submission delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Here you would typically send the form data
                // For now, we'll just show a success message
                alert('Message sent successfully!');
                this.reset();
            } catch (error) {
                console.error('Form submission error:', error);
                alert('Failed to send message. Please try again.');
            } finally {
                removeLoading();
            }
        });
    }
});

// Loading state management
const loadingStates = {
    addLoadingState: (element, text = 'Loading...') => {
        element.classList.add('loading');
        const originalText = element.textContent;
        element.dataset.originalText = originalText;
        element.textContent = text;
        return () => {
            element.classList.remove('loading');
            element.textContent = element.dataset.originalText;
            delete element.dataset.originalText;
        };
    },
    
    removeLoadingState: (element) => {
        if (element.dataset.originalText) {
            element.classList.remove('loading');
            element.textContent = element.dataset.originalText;
            delete element.dataset.originalText;
        }
    }
};

// Blog post images
const blogImages = {
    'social-media-strategy': `data:image/svg+xml;base64,${btoa(`
        <svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#FFD700;stop-opacity:0.2" />
                    <stop offset="100%" style="stop-color:#B8860B;stop-opacity:0.2" />
                </linearGradient>
                <filter id="shadow">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#FFD700" flood-opacity="0.3"/>
                </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#grad1)"/>
            <g transform="translate(400,225)" filter="url(#shadow)">
                <circle r="60" fill="#FFD700" opacity="0.2"/>
                <g fill="#FFD700" opacity="0.8">
                    <circle r="15" cx="-40" cy="-40"/>
                    <circle r="15" cx="40" cy="-40"/>
                    <circle r="15" cx="40" cy="40"/>
                    <circle r="15" cx="-40" cy="40"/>
                    <path d="M-40,-40 L40,-40 L40,40 L-40,40 Z" fill="none" stroke="#FFD700" stroke-width="2"/>
                </g>
                <text x="0" y="80" font-family="Arial" font-size="24" fill="#FFD700" text-anchor="middle">Social Strategy</text>
            </g>
        </svg>
    `)}`,
    'content-creation': `data:image/svg+xml;base64,${btoa(`
        <svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#DAA520;stop-opacity:0.2" />
                    <stop offset="100%" style="stop-color:#B8860B;stop-opacity:0.2" />
                </linearGradient>
                <filter id="shadow2">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#DAA520" flood-opacity="0.3"/>
                </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#grad2)"/>
            <g transform="translate(400,225)" filter="url(#shadow2)">
                <rect x="-100" y="-60" width="200" height="120" rx="10" fill="#DAA520" opacity="0.2"/>
                <g fill="#DAA520" opacity="0.8">
                    <rect x="-80" y="-40" width="160" height="20" rx="5"/>
                    <rect x="-80" y="0" width="120" height="20" rx="5"/>
                    <rect x="-80" y="40" width="160" height="20" rx="5"/>
                </g>
                <text x="0" y="80" font-family="Arial" font-size="24" fill="#DAA520" text-anchor="middle">Content Creation</text>
            </g>
        </svg>
    `)}`,
    'brand-growth': `data:image/svg+xml;base64,${btoa(`
        <svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#FFD700;stop-opacity:0.2" />
                    <stop offset="100%" style="stop-color:#DAA520;stop-opacity:0.2" />
                </linearGradient>
                <filter id="shadow3">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#FFD700" flood-opacity="0.3"/>
                </filter>
            </defs>
            <rect width="100%" height="100%" fill="url(#grad3)"/>
            <g transform="translate(400,225)" filter="url(#shadow3)">
                <path d="M0,-80 L80,0 L0,80 L-80,0 Z" fill="#FFD700" opacity="0.2"/>
                <g fill="#FFD700" opacity="0.8">
                    <circle r="10" cx="0" cy="-40"/>
                    <circle r="10" cx="40" cy="0"/>
                    <circle r="10" cx="0" cy="40"/>
                    <circle r="10" cx="-40" cy="0"/>
                    <path d="M0,-40 L40,0 L0,40 L-40,0 Z" fill="none" stroke="#FFD700" stroke-width="2"/>
                </g>
                <text x="0" y="100" font-family="Arial" font-size="24" fill="#FFD700" text-anchor="middle">Brand Growth</text>
            </g>
        </svg>
    `)}`
};

// Blog post content
const blogPosts = {
    'social-media-strategy': {
        title: 'Mastering Social Media in 2024',
        content: `
            <h2>Mastering Social Media in 2024: Complete Guide</h2>

            <h3>1. Platform-Specific Strategies</h3>
            <p>Optimize your presence across different platforms:</p>
            <ul>
                <li>Instagram: Visual storytelling and Reels</li>
                <li>TikTok: Trending content and challenges</li>
                <li>LinkedIn: Professional networking and thought leadership</li>
                <li>Twitter: Real-time engagement and trending topics</li>
            </ul>

            <h3>2. Content Strategy</h3>
            <p>Create engaging content that resonates:</p>
            <ul>
                <li>Short-form video content</li>
                <li>Interactive stories and polls</li>
                <li>User-generated content campaigns</li>
                <li>Behind-the-scenes content</li>
            </ul>

            <h3>3. Engagement Techniques</h3>
            <p>Build meaningful connections:</p>
            <ul>
                <li>Community management best practices</li>
                <li>Response time optimization</li>
                <li>Hashtag strategy</li>
                <li>Influencer collaborations</li>
            </ul>

            <h3>4. Analytics and Optimization</h3>
            <p>Measure and improve performance:</p>
            <ul>
                <li>Key performance indicators (KPIs)</li>
                <li>Content performance analysis</li>
                <li>Audience insights</li>
                <li>ROI tracking</li>
            </ul>
        `
    },
    'content-creation': {
        title: 'Content Creation That Converts',
        content: `
            <h2>Content Creation That Converts: Strategic Approaches</h2>

            <h3>1. Understanding Your Audience</h3>
            <p>Creating converting content starts with audience analysis:</p>
            <ul>
                <li>Demographic profiling</li>
                <li>Behavioral analysis</li>
                <li>Content preferences</li>
                <li>Platform usage patterns</li>
            </ul>

            <h3>2. Content Formats That Drive Engagement</h3>
            <p>High-converting content types:</p>
            <ul>
                <li>Video tutorials</li>
                <li>Interactive stories</li>
                <li>User testimonials</li>
                <li>Behind-the-scenes content</li>
            </ul>

            <h3>3. Optimization Strategies</h3>
            <p>Key optimization techniques:</p>
            <ul>
                <li>SEO best practices</li>
                <li>Mobile optimization</li>
                <li>Loading speed improvement</li>
                <li>Call-to-action placement</li>
            </ul>

            <h3>4. Measuring Success</h3>
            <p>Essential conversion metrics:</p>
            <ul>
                <li>Conversion rates</li>
                <li>Engagement metrics</li>
                <li>ROI analysis</li>
                <li>A/B testing results</li>
            </ul>
        `
    },
    'brand-growth': {
        title: 'Building a Strong Brand Identity',
        content: `
            <h2>Building a Strong Brand Identity: Comprehensive Guide</h2>

            <h3>1. Brand Foundation</h3>
            <p>Essential elements of brand identity:</p>
            <ul>
                <li>Brand values and mission</li>
                <li>Visual identity guidelines</li>
                <li>Brand voice and tone</li>
                <li>Target audience definition</li>
            </ul>

            <h3>2. Visual Branding</h3>
            <p>Key visual elements:</p>
            <ul>
                <li>Logo design principles</li>
                <li>Color psychology</li>
                <li>Typography selection</li>
                <li>Image style guidelines</li>
            </ul>

            <h3>3. Brand Communication</h3>
            <p>Effective communication strategies:</p>
            <ul>
                <li>Messaging framework</li>
                <li>Content strategy</li>
                <li>Social media presence</li>
                <li>Customer interaction guidelines</li>
            </ul>

            <h3>4. Brand Growth Metrics</h3>
            <p>Measuring brand success:</p>
            <ul>
                <li>Brand awareness metrics</li>
                <li>Engagement rates</li>
                <li>Customer loyalty measures</li>
                <li>Market position analysis</li>
            </ul>
        `
    }
};

function initializeInteractiveElements() {
    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navbar = document.querySelector('.navbar');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            
            // Animate menu button
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transform = mobileMenu.classList.contains('active') 
                    ? index === 1 ? 'scale(0)' : index === 0 ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(-45deg) translate(5px, -5px)'
                    : '';
            });
        });

        // Close menu when clicking on a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                
                // Reset menu button
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans.forEach(span => span.style.transform = '');
            });
        });
    }

    // Scroll to Top Button
    const scrollToTopButton = document.getElementById('scrollToTop');
    if (scrollToTopButton) {
        // Show button when user scrolls down 300px
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        });

        // Smooth scroll to top when button is clicked
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const btnText = submitBtn?.querySelector('.btn-text');
            const loadingSpinner = submitBtn?.querySelector('.loading-spinner');
            
            if (!submitBtn || !btnText || !loadingSpinner) return;

            try {
                // Show loading state
                btnText.style.display = 'none';
                loadingSpinner.style.display = 'inline-block';
                submitBtn.disabled = true;

                // Get form data
                const formData = {
                    name: document.getElementById('name')?.value || '',
                    email: document.getElementById('email')?.value || '',
                    package: document.getElementById('package')?.value || '',
                    message: document.getElementById('message')?.value || ''
                };

                // Simulate form submission delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Send email using EmailJS
                if (window.emailjs) {
                    await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData);
                }
                
                // Show success message
                alert('Message sent successfully! We will contact you soon.');
                
                // Reset form
                this.reset();
            } catch (error) {
                console.error('Form submission error:', error);
                alert('Failed to send message. Please try again later.');
            } finally {
                // Reset button state
                btnText.style.display = 'inline-block';
                loadingSpinner.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
    }

    // Blog Modal
    const readMoreButtons = document.querySelectorAll('.read-more');
    const modal = document.getElementById('blogModal');
    const closeModal = document.querySelector('.close-modal');

    if (readMoreButtons.length && !modal) {
        // Add modal HTML if it doesn't exist
        document.body.insertAdjacentHTML('beforeend', `
            <div id="blogModal" class="modal">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <div id="modalContent"></div>
                </div>
            </div>
        `);
    }

    // Initialize modal events
    if (modal) {
        // Close modal button
        closeModal?.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Read More button clicks
        readMoreButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                const article = button.closest('.blog-card');
                const postTitle = article?.querySelector('h3')?.textContent;
                
                if (postTitle) {
                    const postId = Object.keys(blogPosts).find(key => 
                        blogPosts[key].title === postTitle
                    );
                    
                    if (postId && blogPosts[postId]) {
                        const modalContent = document.getElementById('modalContent');
                        if (modalContent) {
                            modalContent.innerHTML = blogPosts[postId].content;
                            modal.style.display = 'block';
                            document.body.style.overflow = 'hidden';
                        }
                    }
                }
            });
        });
    }

    // Initialize animations
    initializeAnimations();
}

function initializeAnimations() {
    // Service cards animation
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.service-card, .pricing-card, .stat-card').forEach(element => {
        serviceObserver.observe(element);
    });

    // Stats counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.textContent) {
                const value = parseInt(entry.target.textContent);
                if (!isNaN(value)) {
                    animateValue(entry.target, 0, value, 2000);
                    statsObserver.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-card h3').forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation to service items on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, observerOptions);

// Animate service items
document.querySelectorAll('.service-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.5s ease-out';
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
});

// Animate stat bars
document.addEventListener('DOMContentLoaded', function() {
    const statBars = document.querySelectorAll('.stat-bar');
    
    statBars.forEach((bar, index) => {
        const value = bar.querySelector('.stat-value').textContent;
        const percentage = parseInt(value);
        
        // Initial state
        bar.style.background = `linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%)`;
        
        // Animate after a delay
        setTimeout(() => {
            bar.style.transition = 'background 1.5s ease-out';
            bar.style.background = `linear-gradient(to right, 
                rgba(255,255,255,0.4) ${percentage}%, 
                rgba(255,255,255,0.1) ${percentage}%
            )`;
        }, 500 + index * 200);
    });

    // Add hover effect to service items
    document.querySelectorAll('.service-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('.emoji').style.transform = 'scale(1.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.querySelector('.emoji').style.transform = 'scale(1)';
        });
    });

    // Add smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Scroll Animation for Service Cards
const serviceObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, serviceObserverOptions);

// Observe elements with animation
document.querySelectorAll('.service-card, .pricing-card, .stat-card').forEach(element => {
    serviceObserver.observe(element);
});

// Navbar Scroll Effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Image lazy loading optimization
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        lazyImages.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            lazyLoadObserver.observe(img);
        });
    }
});

// Stats Counter Animation
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + (element.dataset.suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initialize stats animation when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const value = parseInt(entry.target.textContent);
            animateValue(entry.target, 0, value, 2000);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card h3').forEach(stat => {
    statsObserver.observe(stat);
});

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Enhance form submission with loading states
document.getElementById('contactForm')?.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loadingSpinner = submitBtn.querySelector('.loading-spinner');
    
    try {
        // Show loading state
        btnText.style.display = 'none';
        loadingSpinner.style.display = 'inline-block';
        submitBtn.disabled = true;

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            package: document.getElementById('package').value,
            message: document.getElementById('message').value
        };

        // Simulate form submission delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Send email using EmailJS
        await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData);
        
        // Show success message
        alert('Message sent successfully! We will contact you soon.');
        
        // Reset form
        this.reset();
    } catch (error) {
        console.error('EmailJS error:', error);
        alert('Failed to send message. Please try again later.');
    } finally {
        // Reset button state
        btnText.style.display = 'inline-block';
        loadingSpinner.style.display = 'none';
        submitBtn.disabled = false;
    }
});

// Add modal for blog post details
const modalHTML = `
    <div id="blogModal" class="modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div id="modalContent"></div>
        </div>
    </div>
`;

// Add modal to the page if it doesn't exist
if (!document.getElementById('blogModal')) {
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Add loading states for blog post modal
document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', async function(e) {
        e.preventDefault();
        const removeLoading = loadingStates.addLoadingState(this);
        
        try {
            const article = this.closest('.blog-card');
            const postTitle = article.querySelector('h3').textContent;
            const postId = Object.keys(blogPosts).find(key => 
                blogPosts[key].title === postTitle
            );
            
            // Simulate loading delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            if (postId && blogPosts[postId]) {
                const modal = document.getElementById('blogModal');
                const modalContent = document.getElementById('modalContent');
                modalContent.innerHTML = blogPosts[postId].content;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        } finally {
            removeLoading();
        }
    });
});

// Close modal
document.querySelector('.close-modal')?.addEventListener('click', function() {
    document.getElementById('blogModal').style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('blogModal');
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Update blog post images when the page loads
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.blog-card').forEach(card => {
        const img = card.querySelector('img');
        const postId = card.dataset.postId;
        if (img && postId && blogImages[postId]) {
            img.src = blogImages[postId];
            img.alt = postId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
    });
});

// Scroll to Top Functionality
const scrollToTopButton = document.getElementById('scrollToTop');

// Show button when user scrolls down 300px
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.classList.add('visible');
    } else {
        scrollToTopButton.classList.remove('visible');
    }
});

// Smooth scroll to top when button is clicked
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Image lazy loading optimization
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        lazyImages.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            lazyLoadObserver.observe(img);
        });
    }
}); 