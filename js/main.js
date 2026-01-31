// Main Frontend JavaScript for Mangala Physiocare Website
// Handles dynamic content loading and user interactions

document.addEventListener('DOMContentLoaded', function () {
    // Initialize
    loadAllContent();
    initNavigation();
    initSmoothScroll();
});

// ============================================
// Content Loading Functions
// ============================================

function loadAllContent() {
    const data = DataService.getData();

    if (data) {
        loadSEO(data.seo);
        loadClinicInfo(data.clinic);
        loadHero(data.hero);
        loadAbout(data.about);
        loadServices(data.services);
        loadExercises(data.exercises);
        loadContact(data.contact, data.clinic);
        loadFooter(data.footer, data.clinic, data.social);
    }
}

// Load SEO Meta Tags
function loadSEO(seo) {
    if (!seo) return;

    const seoTitle = document.getElementById('seo-title');
    const seoDescription = document.getElementById('seo-description');
    const ogTitle = document.getElementById('og-title');
    const ogDescription = document.getElementById('og-description');

    if (seoTitle && seo.title) seoTitle.textContent = seo.title;
    if (seoDescription && seo.description) seoDescription.setAttribute('content', seo.description);
    if (ogTitle && seo.title) ogTitle.setAttribute('content', seo.title);
    if (ogDescription && seo.description) ogDescription.setAttribute('content', seo.description);
}

// Load Clinic Info (Logo, Name)
function loadClinicInfo(clinic) {
    if (!clinic) return;

    const headerLogo = document.getElementById('header-logo');
    const headerClinicName = document.getElementById('header-clinic-name');

    if (headerLogo && clinic.logo) {
        headerLogo.src = clinic.logo;
        headerLogo.alt = clinic.name + ' Logo';
    }

    if (headerClinicName && clinic.name) {
        headerClinicName.textContent = clinic.name;
    }
}

// Load Hero Section
function loadHero(hero) {
    if (!hero) return;

    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroCta = document.getElementById('hero-cta');

    if (heroTitle && hero.title) heroTitle.textContent = hero.title;
    if (heroSubtitle && hero.subtitle) heroSubtitle.textContent = hero.subtitle;
    if (heroCta && hero.ctaText) {
        heroCta.textContent = hero.ctaText;
        if (hero.ctaLink) heroCta.href = hero.ctaLink;
    }
}

// Load About Section
function loadAbout(about) {
    if (!about) return;

    const aboutTitle = document.getElementById('about-title');
    const aboutContent = document.getElementById('about-content');

    if (aboutTitle && about.title) aboutTitle.textContent = about.title;
    if (aboutContent && about.content) aboutContent.textContent = about.content;
}

// Load Services
function loadServices(services) {
    if (!services || !Array.isArray(services)) return;

    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) return;

    servicesGrid.innerHTML = '';

    services.forEach((service, index) => {
        const card = document.createElement('div');
        card.className = 'service-card fade-in-up';
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
      <span class="service-icon">${service.icon || '🏥'}</span>
      <h3>${service.name}</h3>
      <p>${service.description}</p>
    `;

        servicesGrid.appendChild(card);
    });
}

// Load Exercises/Treatments
function loadExercises(exercises) {
    if (!exercises || !Array.isArray(exercises)) return;

    const exercisesList = document.getElementById('exercises-list');
    if (!exercisesList) return;

    exercisesList.innerHTML = '';

    exercises.forEach((exercise, index) => {
        const item = document.createElement('div');
        item.className = 'exercise-item fade-in-up';
        item.style.animationDelay = `${index * 0.1}s`;

        item.innerHTML = `
      <h3>${exercise.name}</h3>
      <p>${exercise.description}</p>
    `;

        exercisesList.appendChild(item);
    });
}

// Load Contact Information
function loadContact(contact, clinic) {
    if (!clinic) return;

    // Phone
    const phoneElement = document.getElementById('contact-phone');
    const phoneLink = document.getElementById('contact-phone-link');
    if (phoneElement && clinic.phone) {
        phoneElement.textContent = clinic.phone;
        if (phoneLink) phoneLink.href = `tel:${clinic.phone}`;
    }

    // Email
    const emailElement = document.getElementById('contact-email');
    const emailLink = document.getElementById('contact-email-link');
    if (emailElement && clinic.email) {
        emailElement.textContent = clinic.email;
        if (emailLink) emailLink.href = `mailto:${clinic.email}`;
    }

    // Address
    const addressElement = document.getElementById('contact-address');
    if (addressElement && clinic.address) {
        addressElement.textContent = clinic.address;
    }

    // WhatsApp
    const whatsappLink = document.getElementById('whatsapp-link');
    if (whatsappLink && clinic.whatsapp) {
        const cleanNumber = clinic.whatsapp.replace(/[^0-9]/g, '');
        whatsappLink.href = `https://wa.me/${cleanNumber}`;
    }

    // Google Maps
    const mapIframe = document.getElementById('google-map');
    if (mapIframe && contact && contact.mapUrl) {
        mapIframe.src = contact.mapUrl;
    }
}

// Load Footer
function loadFooter(footer, clinic, social) {
    // Footer Clinic Name
    const footerClinicName = document.getElementById('footer-clinic-name');
    if (footerClinicName && clinic && clinic.name) {
        footerClinicName.textContent = clinic.name;
    }

    // Footer Tagline
    const footerTagline = document.getElementById('footer-tagline');
    if (footerTagline && clinic && clinic.tagline) {
        footerTagline.textContent = clinic.tagline;
    }

    // Footer Text
    const footerText = document.getElementById('footer-text');
    if (footerText && footer && footer.text) {
        footerText.textContent = footer.text;
    }

    // Copyright
    const footerCopyright = document.getElementById('footer-copyright');
    if (footerCopyright && footer && footer.copyright) {
        footerCopyright.textContent = footer.copyright;
    }

    // Social Links
    if (social) {
        loadSocialLinks(social);
    }
}

// Load Social Links
function loadSocialLinks(social) {
    const socialContainer = document.getElementById('social-links');
    if (!socialContainer) return;

    socialContainer.innerHTML = '';

    const socialPlatforms = [
        { key: 'facebook', icon: '📘', label: 'Facebook' },
        { key: 'instagram', icon: '📷', label: 'Instagram' },
        { key: 'twitter', icon: '🐦', label: 'Twitter' },
        { key: 'linkedin', icon: '💼', label: 'LinkedIn' }
    ];

    socialPlatforms.forEach(platform => {
        if (social[platform.key]) {
            const link = document.createElement('a');
            link.href = social[platform.key];
            link.className = 'social-link';
            link.setAttribute('aria-label', platform.label);
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = platform.icon;

            socialContainer.appendChild(link);
        }
    });
}

// ============================================
// Navigation Functions
// ============================================

function initNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    const overlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            overlay.classList.toggle('active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close menu when overlay is clicked
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // Close menu when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth < 768) {
                closeMenu();
            }
        });
    });

    function closeMenu() {
        if (menuToggle) menuToggle.classList.remove('active');
        if (nav) nav.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// Smooth Scrolling
// ============================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Sticky Header Effect (Optional)
// ============================================

window.addEventListener('scroll', function () {
    const header = document.getElementById('header');

    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// Auto-reload content when localStorage changes
// (Useful when admin makes changes in another tab)
// ============================================

window.addEventListener('storage', function (e) {
    if (e.key === DataService.STORAGE_KEY) {
        loadAllContent();
    }
});

// Export for debugging
window.reloadContent = loadAllContent;
