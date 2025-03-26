// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.site-header');
const stickyCta = document.querySelector('.sticky-cta');

// Toggle mobile menu
mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.setAttribute('aria-expanded', 
        mobileMenuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
    );
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Handle sticky CTA visibility
let lastScrollTop = 0;
const scrollThreshold = 100;
const stickyCTA = document.querySelector('.sticky-cta');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
    
    // Show CTA after scrolling past threshold
    if (scrollTop > scrollThreshold) {
        stickyCTA.classList.add('visible');
    } else {
        stickyCTA.classList.remove('visible');
    }
    
    // Hide CTA when scrolling down, show when scrolling up
    if (scrollDirection === 'down' && scrollTop > scrollThreshold) {
        stickyCTA.classList.remove('visible');
    } else if (scrollDirection === 'up') {
        stickyCTA.classList.add('visible');
    }
    
    lastScrollTop = scrollTop;
});

// Smooth scroll for anchor links
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

// Form validation
const validateField = (field, errorElement, rules) => {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (rules.required && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }

    if (rules.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    }

    if (rules.minLength && value.length < rules.minLength) {
        isValid = false;
        errorMessage = `Must be at least ${rules.minLength} characters`;
    }

    if (isValid) {
        errorElement.style.display = 'none';
        field.classList.remove('error');
    } else {
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
        field.classList.add('error');
    }

    return isValid;
};

// Form submission handling
const waitlistForm = document.getElementById('waitlistForm');
const formSuccess = document.getElementById('formSuccess');

if (waitlistForm) {
    const formFields = {
        name: { required: true, minLength: 2 },
        email: { required: true, email: true },
        company: { required: true, minLength: 2 },
        role: { required: true },
        team_size: { required: true }
    };

    waitlistForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Validate all fields
        Object.keys(formFields).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            const errorElement = document.getElementById(`${fieldName}Error`);
            if (!validateField(field, errorElement, formFields[fieldName])) {
                isValid = false;
            }
        });

        if (isValid) {
            // Show success message
            waitlistForm.style.display = 'none';
            formSuccess.classList.add('visible');
            
            // Reset form
            waitlistForm.reset();
        }
    });

    // Real-time validation
    Object.keys(formFields).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}Error`);
        
        field.addEventListener('input', () => {
            validateField(field, errorElement, formFields[fieldName]);
        });

        field.addEventListener('blur', () => {
            validateField(field, errorElement, formFields[fieldName]);
        });
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Initialize tooltips
const tooltips = document.querySelectorAll('[data-tooltip]');
tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseenter', (e) => {
        const tooltipText = e.target.getAttribute('data-tooltip');
        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'tooltip';
        tooltipElement.textContent = tooltipText;
        document.body.appendChild(tooltipElement);
        
        const rect = e.target.getBoundingClientRect();
        tooltipElement.style.top = `${rect.top - tooltipElement.offsetHeight - 10}px`;
        tooltipElement.style.left = `${rect.left + (rect.width - tooltipElement.offsetWidth) / 2}px`;
    });
    
    tooltip.addEventListener('mouseleave', () => {
        const tooltipElement = document.querySelector('.tooltip');
        if (tooltipElement) {
            tooltipElement.remove();
        }
    });
}); 