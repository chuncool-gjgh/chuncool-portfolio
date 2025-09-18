/**
 * Main JavaScript file for Chuncool Portfolio Website
 * Handles animations, interactions, and dynamic effects
 */

// ==========================================================================
// Global Variables and Configuration
// ==========================================================================

let isLoaded = false;
let particles = [];
let animationFrame;

const config = {
  particles: {
    count: 50,
    speed: 0.5,
    size: { min: 1, max: 3 },
    opacity: { min: 0.3, max: 0.8 },
    colors: ['#00f5ff', '#8b5cf6', '#f59e0b']
  },
  animations: {
    observerOptions: {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  }
};

// ==========================================================================
// Utility Functions
// ==========================================================================

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Get random number between min and max
 */
function random(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Smooth scroll to target element
 */
function smoothScrollTo(target) {
  const element = document.querySelector(target);
  if (element) {
    const offsetTop = element.offsetTop - 70; // Account for navbar height
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

// ==========================================================================
// Particle System
// ==========================================================================

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }

  reset() {
    this.x = random(0, this.canvas.width);
    this.y = random(0, this.canvas.height);
    this.vx = random(-config.particles.speed, config.particles.speed);
    this.vy = random(-config.particles.speed, config.particles.speed);
    this.size = random(config.particles.size.min, config.particles.size.max);
    this.opacity = random(config.particles.opacity.min, config.particles.opacity.max);
    this.color = config.particles.colors[Math.floor(random(0, config.particles.colors.length))];
    this.life = 1;
    this.decay = random(0.001, 0.003);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;

    // Reset particle if it goes off screen or dies
    if (this.x < 0 || this.x > this.canvas.width || 
        this.y < 0 || this.y > this.canvas.height || 
        this.life <= 0) {
      this.reset();
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity * this.life;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function initParticles() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const container = document.getElementById('particles');
  
  if (!container) return;

  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '1';
  
  container.appendChild(canvas);

  function resize() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw(ctx);
    });

    animationFrame = requestAnimationFrame(animate);
  }

  // Initialize particles
  for (let i = 0; i < config.particles.count; i++) {
    particles.push(new Particle(canvas));
  }

  resize();
  animate();

  window.addEventListener('resize', debounce(resize, 100));
}

// ==========================================================================
// Navigation
// ==========================================================================

function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Smooth scroll for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');
      
      // Close mobile menu
      if (navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
      
      smoothScrollTo(target);
    });
  });

  // Navbar background on scroll
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(15, 15, 35, 0.95)';
    } else {
      navbar.style.background = 'rgba(15, 15, 35, 0.9)';
    }
  }

  window.addEventListener('scroll', debounce(handleScroll, 10));

  // Active navigation link
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', debounce(updateActiveLink, 100));
}

// ==========================================================================
// Animations and Interactions
// ==========================================================================

function initScrollAnimations() {
  const observerOptions = config.animations.observerOptions;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Animate skill level bars
        if (entry.target.classList.contains('skill-card')) {
          const levelBar = entry.target.querySelector('.level-bar');
          if (levelBar) {
            const level = levelBar.getAttribute('data-level');
            setTimeout(() => {
              levelBar.style.width = `${level}%`;
            }, 300);
          }
        }
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll(`
    .section-title,
    .section-subtitle,
    .about-image,
    .about-info,
    .timeline-item,
    .skill-card,
    .contact-item,
    .contact-form
  `);

  animatedElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
}

function initInteractiveElements() {
  // Add hover effects to cards
  const cards = document.querySelectorAll('.skill-card, .info-item, .contact-item, .timeline-content');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Parallax effect for hero section
  function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }

  window.addEventListener('scroll', debounce(handleParallax, 16));

  // Typing effect for hero title (optional enhancement)
  function initTypingEffect() {
    const titleLines = document.querySelectorAll('.title-line');
    let delay = 0;
    
    titleLines.forEach((line, index) => {
      setTimeout(() => {
        line.style.animation = `fadeInUp 0.8s ease ${delay}s forwards`;
        delay += 0.2;
      }, index * 200);
    });
  }

  // Call typing effect after page load
  setTimeout(initTypingEffect, 500);
}

// ==========================================================================
// Form Handling
// ==========================================================================

function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = form?.querySelector('.submit-btn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Disable submit button
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';
    }

    try {
      // Here you would typically send the form data to a server
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      showNotification('메시지가 성공적으로 전송되었습니다!', 'success');
      form.reset();
      
    } catch (error) {
      showNotification('메시지 전송에 실패했습니다. 다시 시도해 주세요.', 'error');
    } finally {
      // Re-enable submit button
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span>Send Message</span>
          <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22,2 15,22 11,13 2,9 22,2"/>
          </svg>
        `;
      }
    }
  });

  // Form validation and styling
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', validateField);
  });

  function validateField(e) {
    const field = e.target;
    const isValid = field.checkValidity();
    
    if (field.value.length > 0) {
      if (isValid) {
        field.style.borderColor = '#00f5ff';
      } else {
        field.style.borderColor = '#ef4444';
      }
    } else {
      field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    }
  }
}

// ==========================================================================
// Notification System
// ==========================================================================

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 3000;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    transform: translateX(400px);
    transition: transform 0.3s ease;
  `;

  document.body.appendChild(notification);

  // Slide in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Auto remove
  setTimeout(() => {
    removeNotification(notification);
  }, 5000);

  // Close button
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn?.addEventListener('click', () => removeNotification(notification));

  function removeNotification(notif) {
    notif.style.transform = 'translateX(400px)';
    setTimeout(() => {
      notif.remove();
    }, 300);
  }
}

// ==========================================================================
// Performance Optimization
// ==========================================================================

function initPerformanceOptimizations() {
  // Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // Preload critical resources
  function preloadResource(href, as = 'style') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  }

  // Reduce motion for users who prefer it
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    document.body.classList.add('reduce-motion');
  }
}

// ==========================================================================
// Theme and Accessibility
// ==========================================================================

function initAccessibility() {
  // Keyboard navigation for interactive elements
  const interactiveElements = document.querySelectorAll('button, a, input, textarea, [tabindex]');
  
  interactiveElements.forEach(element => {
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (element.tagName === 'A' && element.getAttribute('href')?.startsWith('#')) {
          e.preventDefault();
          smoothScrollTo(element.getAttribute('href'));
        }
      }
    });
  });

  // Focus indicators
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('using-keyboard');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('using-keyboard');
  });

  // Skip to main content link
  const skipLink = document.createElement('a');
  skipLink.href = '#main';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--primary);
    color: var(--bg-primary);
    padding: 8px;
    text-decoration: none;
    z-index: 4000;
    border-radius: 4px;
    transition: top 0.3s ease;
  `;

  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
  });

  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });

  document.body.insertBefore(skipLink, document.body.firstChild);
}

// ==========================================================================
// Main Initialization
// ==========================================================================

function init() {
  // Initialize all components
  initNavigation();
  initParticles();
  initScrollAnimations();
  initInteractiveElements();
  initContactForm();
  initPerformanceOptimizations();
  initAccessibility();

  // Mark as loaded
  isLoaded = true;
  document.body.classList.add('loaded');

  console.log('✨ Chuncool Portfolio Website initialized successfully!');
}

// ==========================================================================
// Event Listeners
// ==========================================================================

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', init);

// Window Load
window.addEventListener('load', () => {
  // Hide loading screen if exists
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 500);
  }
});

// Window Resize
window.addEventListener('resize', debounce(() => {
  // Handle responsive changes
  if (window.innerWidth > 768) {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    if (navMenu && navToggle) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  }
}, 250));

// Before Unload
window.addEventListener('beforeunload', () => {
  // Cleanup
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
});

// ==========================================================================
// CSS Animations for JavaScript-triggered elements
// ==========================================================================

// Add CSS for animations that are triggered by JavaScript
const additionalStyles = `
  <style>
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .animate-on-scroll.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  .using-keyboard *:focus {
    outline: 2px solid var(--primary) !important;
    outline-offset: 2px;
  }

  .reduce-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .loaded .hero-content {
    animation: none;
  }

  .loaded .title-line {
    animation: fadeInUp 0.8s ease forwards;
  }

  .notification-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .notification-close {
    background: none;
    border: none;
    color: inherit;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 768px) {
    .notification {
      top: 10px !important;
      right: 10px !important;
      left: 10px !important;
      transform: translateY(-100px) !important;
    }
    
    .notification.show {
      transform: translateY(0) !important;
    }
  }
  </style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);