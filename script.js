// ===================================
// Navigation & Mobile Menu
// ===================================
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Smooth scroll and active link highlighting
navLinkItems.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Only intercept internal links
        if (href.startsWith('#')) {
            e.preventDefault();

            // Remove active class from all links
            navLinkItems.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            link.classList.add('active');

            // Close mobile menu if open
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');

            // Smooth scroll to section
            const targetSection = document.querySelector(href);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Update active link on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinkItems.forEach(link => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            link.classList.remove('active');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        }
    });
});

// ===================================
// Recipe Filtering
// ===================================
const filterButtons = document.querySelectorAll('.filter-btn');
const recipeCards = document.querySelectorAll('.recipe-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Get filter value
        const filterValue = button.getAttribute('data-filter');

        // Filter recipe cards
        recipeCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===================================
// Scroll Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all cards
const animatedElements = document.querySelectorAll('.glass-card');
animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===================================
// Video Card Interactions
// ===================================
const videoCards = document.querySelectorAll('.video-card');

videoCards.forEach(card => {
    card.addEventListener('click', () => {
        const videoTitle = card.querySelector('.video-title').textContent;

        // Create a simple modal effect (you can enhance this)
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 20px;
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 40px;
            border-radius: 16px;
            max-width: 600px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.2);
        `;

        modalContent.innerHTML = `
            <h2 style="font-family: 'Outfit', sans-serif; font-size: 2rem; margin-bottom: 20px; color: white;">
                ${videoTitle}
            </h2>
            <p style="color: #b4b4c8; margin-bottom: 30px;">
                Este es un demo. En producción, aquí se reproduciría el video.
            </p>
            <button id="closeModal" style="
                padding: 12px 32px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 12px;
                font-weight: 600;
                cursor: pointer;
                font-size: 1rem;
            ">
                Cerrar
            </button>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Close modal
        const closeBtn = document.getElementById('closeModal');
        closeBtn.addEventListener('click', () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        });

        // Fade in animation
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.transition = 'opacity 0.3s ease';
            modal.style.opacity = '1';
        }, 10);
    });
});

// ===================================
// Recipe Card Interactions
// ===================================
// ===================================
// Recipe Card Interactions & Modal
// ===================================
// ===================================
// Recipe Card Interactions & Modal
// ===================================
const recipeButtons = document.querySelectorAll('.recipe-btn');
// Use global data if available, otherwise empty array
let recipesData = typeof RECIPES_DATA !== 'undefined' ? RECIPES_DATA : [];

recipeButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();

        const recipeCard = button.closest('.recipe-card');
        const recipeTitle = recipeCard.querySelector('.recipe-title').textContent.trim();

        console.log('Clicked recipe:', recipeTitle);
        console.log('Available recipes:', recipesData);

        const recipe = recipesData.find(r => r.title.trim() === recipeTitle);

        if (recipe) {
            openRecipeModal(recipe);
        } else {
            console.warn('Recipe not found in data:', recipeTitle);
            // Fallback if JSON isn't loaded or match not found
            showNotification(`📖 Abriendo receta: ${recipeTitle}`);
        }
    });
});

function openRecipeModal(recipe) {
    const modal = document.createElement('div');
    modal.className = 'recipe-modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
        backdrop-filter: blur(5px);
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const modalContent = document.createElement('div');
    modalContent.className = 'recipe-modal-content';
    modalContent.style.cssText = `
        background: #ffffff;
        width: 100%;
        max-width: 800px;
        max-height: 90vh;
        border-radius: 20px;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        transform: translateY(20px);
        transition: transform 0.3s ease;
    `;

    modalContent.innerHTML = `
        <div style="position: relative; height: 300px;">
            <img src="${recipe.image}" alt="${recipe.title}" style="width: 100%; height: 100%; object-fit: cover;">
            <button class="close-modal-btn" style="
                position: absolute;
                top: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.9);
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 24px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                transition: transform 0.2s;
            ">×</button>
            <div style="
                position: absolute;
                bottom: 20px;
                left: 20px;
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 6px 16px;
                border-radius: 20px;
                font-weight: 600;
                font-size: 0.9rem;
            ">${recipe.badge}</div>
        </div>
        
        <div style="padding: 30px;">
            <h2 style="
                font-family: 'Outfit', sans-serif;
                font-size: 2rem;
                font-weight: 800;
                color: #111827;
                margin-bottom: 10px;
            ">${recipe.title}</h2>
            
            <p style="color: #6b7280; margin-bottom: 24px; font-size: 1.1rem;">${recipe.description}</p>
            
            <div style="
                display: flex;
                gap: 20px;
                margin-bottom: 30px;
                padding: 15px;
                background: #f0fdf4;
                border-radius: 12px;
                flex-wrap: wrap;
            ">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 1.2rem;">🔥</span>
                    <span style="font-weight: 600; color: #059669;">${recipe.stats.calories}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 1.2rem;">💪</span>
                    <span style="font-weight: 600; color: #059669;">${recipe.stats.protein}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 1.2rem;">⏱</span>
                    <span style="font-weight: 600; color: #059669;">${recipe.stats.time}</span>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 40px; @media (max-width: 768px) { grid-template-columns: 1fr; }">
                <div>
                    <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.5rem; margin-bottom: 16px; color: #111827;">Ingredientes</h3>
                    <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px;">
                        ${recipe.ingredients.map(ing => `
                            <li style="display: flex; align-items: flex-start; gap: 10px; color: #4b5563;">
                                <span style="color: #10b981; font-weight: bold;">•</span>
                                ${ing}
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div>
                    <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.5rem; margin-bottom: 16px; color: #111827;">Instrucciones</h3>
                    <div style="display: flex; flex-direction: column; gap: 20px;">
                        ${recipe.instructions.map((step, idx) => `
                            <div style="display: flex; gap: 16px;">
                                <div style="
                                    background: #ecfdf5;
                                    color: #059669;
                                    width: 32px;
                                    height: 32px;
                                    border-radius: 50%;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    font-weight: bold;
                                    flex-shrink: 0;
                                ">${idx + 1}</div>
                                <p style="color: #4b5563; line-height: 1.6; margin-top: 4px;">${step}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Animation entry
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'translateY(0)';
    });

    // Close handlers
    const closeBtn = modal.querySelector('.close-modal-btn');
    const closeModal = () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'translateY(20px)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on Escape key
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

// ===================================
// Exercise Card Interactions
// ===================================
const exerciseButtons = document.querySelectorAll('.exercise-btn');

exerciseButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();

        const exerciseCard = button.closest('.exercise-card');
        const exerciseTitle = exerciseCard.querySelector('.exercise-title').textContent;

        showNotification(`💪 Iniciando rutina: ${exerciseTitle}`);
    });
});

// ===================================
// Challenge Card Interactions
// ===================================
const challengeButtons = document.querySelectorAll('.challenge-btn');

challengeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();

        const challengeCard = button.closest('.challenge-card');
        const challengeTitle = challengeCard.querySelector('.challenge-title').textContent;
        const isStart = button.classList.contains('challenge-btn-start');

        if (isStart) {
            showNotification(`🎯 ¡Reto iniciado! ${challengeTitle}`);
            button.textContent = 'Continuar Reto';
            button.classList.remove('challenge-btn-start');

            // Update progress
            const progressBar = challengeCard.querySelector('.progress-fill');
            const progressValue = challengeCard.querySelector('.progress-value');
            progressBar.style.width = '5%';
            progressValue.textContent = '1/30 días';
        } else {
            showNotification(`🔥 ¡Sigue así! ${challengeTitle}`);
        }
    });
});

// ===================================
// Newsletter Form
// ===================================
const newsletterForm = document.getElementById('newsletterForm');
const emailInput = document.getElementById('emailInput');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value;

    if (email) {
        // Simulate subscription
        showNotification('✅ ¡Gracias por suscribirte! Revisa tu email.', 'success');
        emailInput.value = '';

        // Add a success animation
        const submitBtn = newsletterForm.querySelector('.newsletter-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ ¡Suscrito!';
        submitBtn.style.background = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 3000);
    }
});

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: 600;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Progress Bar Animations
// ===================================
const progressBars = document.querySelectorAll('.progress-fill');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.style.width;
            progressBar.style.width = '0%';

            setTimeout(() => {
                progressBar.style.width = width;
            }, 100);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// ===================================
// Parallax Effect for Hero
// ===================================
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// Dynamic Stats Counter
// ===================================
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element, target) => {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const targetValue = parseInt(element.textContent);
            animateCounter(element, targetValue);
            statsObserver.unobserve(element);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ===================================
// Hover Effects Enhancement
// ===================================
const cards = document.querySelectorAll('.glass-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===================================
// Initialize on Load
// ===================================
window.addEventListener('load', () => {
    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');

    // Log welcome message
    console.log('%c🏃 NutriSport - Nutrición Deportiva Profesional', 'font-size: 20px; font-weight: bold; color: #667eea;');
    console.log('%cWebsite loaded successfully!', 'font-size: 14px; color: #43e97b;');
});

// ===================================
// Performance Optimization
// ===================================
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img');
    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// Accessibility Enhancements
// ===================================
// Keyboard navigation for cards
cards.forEach(card => {
    card.setAttribute('tabindex', '0');

    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            card.click();
        }
    });
});

// Focus visible for better keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus styles
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-nav *:focus {
        outline: 2px solid #667eea;
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);
