// Unified observer options
const observerOptions = {
    root: null,
    rootMargin: '20px',
    threshold: 0.1
};

// Single IntersectionObserver instance
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('section, .service-card, .skill-category, .project-card, .experience-card, .contact-card').forEach((el) => {
    observer.observe(el);
});

// Mobile Menu Handler
document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const progressBar = document.querySelector('.progress-bar');
    const skipLink = document.querySelector('.skip-link');

    // Set animation duration
    document.documentElement.style.setProperty('--animate-duration', '0.5s');

    // Scroll Progress
    const updateProgress = () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = `${scrolled}%`;
    };

    // Scroll Handling
    const handleScroll = () => {
        // Update navbar background
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update progress bar
        updateProgress();

        // Update active link based on scroll position
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    };

    // Smooth Scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - navbar.offsetHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });

        // Add tooltips
        const text = link.textContent.trim();
        const tooltip = document.createElement('span');
        tooltip.className = 'nav-tooltip';
        tooltip.textContent = text;
        link.appendChild(tooltip);
    });

    // Skip Link
    skipLink?.addEventListener('click', (e) => {
        e.preventDefault();
        const main = document.querySelector('main');
        if (main) {
            main.tabIndex = -1;
            main.focus();
        }
    });

    // Event Listeners
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', (e) => {
        // Add keyboard navigation
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });

    // Initialize
    handleScroll();

    // Performance optimization
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                handleScroll();
                scrollTimeout = null;
            }, 10);
        }
    }, { passive: true });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('.submit-btn');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Add sending animation
    submitBtn.classList.add('sending');
    submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';

    // Simulate form submission (replace with actual form submission)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Show success message
    submitBtn.classList.remove('sending');
    submitBtn.innerHTML = '<span>Sent Successfully!</span> <i class="fas fa-check"></i>';
    submitBtn.style.background = '#4CAF50';

    // Reset form
    setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
        submitBtn.style.background = '';
    }, 3000);
});

// Responsive Image Loading
function handleResponsiveImages() {
    const profileImage = document.querySelector('.profile-image img');
    if (profileImage) {
        const currentSrc = profileImage.getAttribute('src');
        if (window.innerWidth <= 768) {
            // Only change if not already using small image
            if (!currentSrc.includes('-small')) {
                profileImage.setAttribute('src', currentSrc.replace(/(\.[^.]+)$/, '-small$1'));
            }
        } else {
            // Revert to original image for larger screens
            if (currentSrc.includes('-small')) {
                profileImage.setAttribute('src', currentSrc.replace('-small', ''));
            }
        }
    }
}

// Debounced window resize handler
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResponsiveImages, 250);
});

// Initialize responsive features
document.addEventListener('DOMContentLoaded', () => {
    handleResponsiveImages();
    
    // Add smooth scroll behavior for contact section links
    document.querySelectorAll('.contact-info a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('mailto:') || href.startsWith('tel:')) {
                return; // Allow default behavior for email and phone links
            }
            e.preventDefault();
        });
    });

    // Initialize animations for elements in viewport on load
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .experience-card, .contact-card');
    animatedElements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('animate');
        }
    });
});

// Performance optimization for animations on mobile
if (window.matchMedia('(max-width: 768px)').matches) {
    document.documentElement.style.setProperty('--animate-duration', '0.5s');
}

// Add hover effect for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Animate stats when in view
const stats = document.querySelectorAll('.stat-number');
stats.forEach(stat => {
    const target = parseInt(stat.textContent);
    let current = 0;
    const increment = target / 50; // Adjust speed of counting

    function updateCount() {
        if (current < target) {
            current += increment;
            stat.textContent = Math.ceil(current) + '+';
            requestAnimationFrame(updateCount);
        } else {
            stat.textContent = target + '+';
        }
    }

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            updateCount();
            statsObserver.unobserve(entries[0].target);
        }
    });

    statsObserver.observe(stat);
});

// Animate contact cards on scroll
const contactCards = document.querySelectorAll('.contact-card');
const socialLinks = document.querySelector('.social-links-container');

const contactObserverOptions = {
    threshold: 0.2
};

const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, contactObserverOptions);

// Initial setup for animations
[...contactCards, contactForm, socialLinks].forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    contactObserver.observe(element);
});

// Hover effects for contact icons
const contactIcons = document.querySelectorAll('.contact-item i');

contactIcons.forEach(icon => {
    icon.addEventListener('mouseover', () => {
        icon.style.transform = 'scale(1.2) rotate(360deg)';
    });

    icon.addEventListener('mouseout', () => {
        icon.style.transform = 'scale(1) rotate(0)';
    });
});

// Social buttons hover effect
const socialBtns = document.querySelectorAll('.social-btn');

socialBtns.forEach(btn => {
    btn.addEventListener('mouseover', () => {
        btn.style.transform = 'translateY(-5px)';
    });

    btn.addEventListener('mouseout', () => {
        btn.style.transform = 'translateY(0)';
    });
});

// Add ripple effect to submit button
submitBtn.addEventListener('click', function(e) {
    let ripple = document.createElement('span');
    ripple.classList.add('ripple');
    this.appendChild(ripple);
    
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;
    
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// Responsive Contact Section Handling
function handleContactResponsive() {
    const contactGrid = document.querySelector('.contact-grid');
    const contactForm = document.querySelector('.contact-form');
    const contactInfo = document.querySelector('.contact-info');
    const socialLinksContainer = document.querySelector('.social-links-container');
    
    function updateLayout() {
        if (window.innerWidth <= 768) {
            // Mobile layout
            contactGrid.style.gridTemplateColumns = '1fr';
            contactGrid.style.gap = '2rem';
            
            // Adjust form and info spacing
            contactForm.style.marginBottom = '2rem';
            contactInfo.style.marginTop = '0';
            
            // Adjust social links container
            socialLinksContainer.style.marginTop = '2rem';
            socialLinksContainer.style.padding = '1.5rem';
            
            // Adjust contact cards
            document.querySelectorAll('.contact-card').forEach(card => {
                card.style.padding = '1.2rem';
            });
            
            // Adjust form elements
            document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
                input.style.padding = '0.7rem 0.8rem';
            });
            
            // Adjust submit button
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.style.padding = '0.8rem';
            submitBtn.style.fontSize = '0.9rem';
            
        } else {
            // Desktop layout
            contactGrid.style.gridTemplateColumns = '1fr 1fr';
            contactGrid.style.gap = '4rem';
            
            // Reset form and info spacing
            contactForm.style.marginBottom = '0';
            contactInfo.style.marginTop = '0';
            
            // Reset social links container
            socialLinksContainer.style.marginTop = '2rem';
            socialLinksContainer.style.padding = '2rem';
            
            // Reset contact cards
            document.querySelectorAll('.contact-card').forEach(card => {
                card.style.padding = '1.5rem';
            });
            
            // Reset form elements
            document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
                input.style.padding = '0.8rem 1rem';
            });
            
            // Reset submit button
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.style.padding = '1rem';
            submitBtn.style.fontSize = '1rem';
        }
    }

    // Initial call
    updateLayout();

    // Update on window resize
    window.addEventListener('resize', updateLayout);
}

// Add responsive animations for contact section
function addContactAnimations() {
    const contactElements = document.querySelectorAll('.contact-form, .contact-card, .social-links-container');
    
    contactElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
        
        // Stagger the animations
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

// Initialize contact section responsiveness
document.addEventListener('DOMContentLoaded', () => {
    handleContactResponsive();
    addContactAnimations();
    
    // Add smooth scroll behavior for contact section links
    document.querySelectorAll('.contact-info a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.closest('a');
            if (target) {
                const href = target.getAttribute('href');
                if (href.startsWith('mailto:') || href.startsWith('tel:')) {
                    window.location.href = href;
                }
            }
        });
    });
}); 