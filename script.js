// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
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

// Search functionality
const searchBtn = document.getElementById('search-btn');
const destinationSearch = document.getElementById('destination-search');

if (searchBtn && destinationSearch) {
    searchBtn.addEventListener('click', () => {
        const query = destinationSearch.value.trim();
        if (query) {
            // Mock search functionality
            alert(`Searching for destinations related to: ${query}`);
            // In a real implementation, this would call an API or filter results
        } else {
            alert('Please enter a destination to search.');
        }
    });

    // Allow search on Enter key press
    destinationSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// Destination filtering
const regionFilter = document.getElementById('region-filter');
const budgetFilter = document.getElementById('budget-filter');
const activityFilter = document.getElementById('activity-filter');
const destinationCards = document.querySelectorAll('.destination-card');

function filterDestinations() {
    const region = regionFilter ? regionFilter.value : '';
    const budget = budgetFilter ? budgetFilter.value : '';
    const activity = activityFilter ? activityFilter.value : '';

    destinationCards.forEach(card => {
        const cardRegion = card.getAttribute('data-region');
        const cardBudget = card.getAttribute('data-budget');
        const cardActivity = card.getAttribute('data-activity');

        const regionMatch = !region || cardRegion === region;
        const budgetMatch = !budget || cardBudget === budget;
        const activityMatch = !activity || cardActivity === activity;

        if (regionMatch && budgetMatch && activityMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

if (regionFilter) regionFilter.addEventListener('change', filterDestinations);
if (budgetFilter) budgetFilter.addEventListener('change', filterDestinations);
if (activityFilter) activityFilter.addEventListener('change', filterDestinations);

// Form validation and submission
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = '#ccc';
        }
    });

    return isValid;
}

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(contactForm)) {
            // Mock form submission
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Newsletter form submission
const newsletterForm = document.getElementById('newsletter-form');
const blogNewsletterForm = document.getElementById('blog-newsletter-form');

[newsletterForm, blogNewsletterForm].forEach(form => {
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            if (email) {
                alert('Thank you for subscribing to our newsletter!');
                form.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});

// Login form submission
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(loginForm)) {
            // Mock login
            alert('Login successful! Welcome back.');
            // In a real implementation, this would authenticate the user
        } else {
            alert('Please enter your email and password.');
        }
    });
}

// Signup form submission
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(signupForm)) {
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            // Mock signup
            alert('Account created successfully! Welcome to Travel Agency.');
            // In a real implementation, this would create a user account
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Mock booking API
function mockBookingAPI(destination, dates, travelers) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockResponse = {
                success: true,
                bookingId: Math.random().toString(36).substr(2, 9),
                destination: destination,
                dates: dates,
                travelers: travelers,
                totalPrice: Math.floor(Math.random() * 2000) + 500,
                message: 'Booking confirmed!'
            };
            resolve(mockResponse);
        }, 1000); // Simulate API delay
    });
}

// Booking button functionality
const bookButtons = document.querySelectorAll('.book-btn, .service-btn');
bookButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const destination = button.closest('.deal-card, .service-card')?.querySelector('h3, h4')?.textContent || 'Selected Destination';

        // Mock booking process
        button.textContent = 'Processing...';
        button.disabled = true;

        try {
            const bookingResult = await mockBookingAPI(destination, '2023-12-01 to 2023-12-07', 2);
            alert(`${bookingResult.message}\nBooking ID: ${bookingResult.bookingId}\nTotal: $${bookingResult.totalPrice}`);
        } catch (error) {
            alert('Booking failed. Please try again.');
        } finally {
            button.textContent = button.classList.contains('book-btn') ? 'Book Now' : 'Book Service';
            button.disabled = false;
        }
    });
});

// Image lazy loading (placeholder for actual lazy loading)
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Focus management for modals (if any in the future)
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="email"], input[type="password"], select'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Initialize any modal focus trapping (placeholder for future modals)
const modals = document.querySelectorAll('.modal');
modals.forEach(modal => trapFocus(modal));

// Performance optimization: Debounce search input
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

// Apply debounce to search if needed
if (destinationSearch) {
    const debouncedSearch = debounce(() => {
        // Implement real-time search suggestions here
        console.log('Searching for:', destinationSearch.value);
    }, 300);

    destinationSearch.addEventListener('input', debouncedSearch);
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // In a production app, you might want to send this to an error tracking service
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Local storage for user preferences (example)
function saveUserPreference(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.warn('Local storage not available');
    }
}

function getUserPreference(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (e) {
        return null;
    }
}

// Example usage: Remember newsletter subscription preference
const newsletterCheckboxes = document.querySelectorAll('input[name="newsletter"]');
newsletterCheckboxes.forEach(checkbox => {
    const savedPreference = getUserPreference('newsletterSubscription');
    if (savedPreference !== null) {
        checkbox.checked = savedPreference;
    }

    checkbox.addEventListener('change', () => {
        saveUserPreference('newsletterSubscription', checkbox.checked);
    });
});
