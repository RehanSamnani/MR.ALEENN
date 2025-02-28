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
});

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

// Form Interaction
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.classList.add('loading');
        
        // Simulate form submission (replace with actual form submission)
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.classList.remove('loading');
            form.reset();
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
            }, 2000);
        }, 1500);
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

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

// Form submission handling
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get the submit button and its elements
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loadingSpinner = submitBtn.querySelector('.loading-spinner');
    
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

    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
        .then(function(response) {
            // Hide loading state
            btnText.style.display = 'inline-block';
            loadingSpinner.style.display = 'none';
            submitBtn.disabled = false;

            // Show success message
            alert('Message sent successfully! We will contact you soon.');
            
            // Reset form
            document.getElementById('contactForm').reset();
        })
        .catch(function(error) {
            // Hide loading state
            btnText.style.display = 'inline-block';
            loadingSpinner.style.display = 'none';
            submitBtn.disabled = false;

            // Show error message
            alert('Failed to send message. Please try again later.');
            console.error('EmailJS error:', error);
        });
}); 