// Dynamic gallery generation
const galleryGrid = document.querySelector('.gallery-grid');

if (galleryGrid) {
    for (let i = 1; i <= 15; i++) {
        const item = document.createElement('div');
        item.className = 'gallery-item reveal reveal-scale';
        item.innerHTML = `
            <img src="portfolio/${i}.png" alt="Realizacja ${i}" loading="lazy">
            <div class="overlay"><i class="fas fa-search-plus"></i></div>
        `;
        galleryGrid.appendChild(item);
    }
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.top-card-nav');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on link
    document.querySelectorAll('.top-card-nav a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (hero) {
        if (window.scrollY > 20) {
            hero.classList.add('scrolled');
        } else {
            hero.classList.remove('scrolled');
        }
    }
});

// Smooth scrolling for anchor links
const contactModal = document.getElementById('kontakt');
const contactCloseButton = document.querySelector('.contact-close');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#kontakt') {
            e.preventDefault();
            contactModal.classList.add('active');
            contactModal.setAttribute('aria-hidden', 'false');
            return;
        }

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

contactCloseButton.addEventListener('click', () => {
    contactModal.classList.remove('active');
    contactModal.setAttribute('aria-hidden', 'true');
});

contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        contactModal.classList.remove('active');
        contactModal.setAttribute('aria-hidden', 'true');
    }
});

// Gallery modal with navigation
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalCounter = document.getElementById('modal-counter');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.modal-prev');
const nextBtn = document.querySelector('.modal-next');
let currentImageIndex = 0;
const totalImages = 15;

function openModal(index) {
    currentImageIndex = index;
    modal.classList.add('active');
    modalImg.src = `portfolio/${index}.png`;
    modalImg.alt = `Realizacja ${index}`;
    updateCounter();
}

function updateCounter() {
    if (modalCounter) {
        modalCounter.textContent = `${currentImageIndex} / ${totalImages}`;
    }
}

function showPrev() {
    currentImageIndex = currentImageIndex > 1 ? currentImageIndex - 1 : totalImages;
    modalImg.src = `portfolio/${currentImageIndex}.png`;
    modalImg.alt = `Realizacja ${currentImageIndex}`;
    updateCounter();
}

function showNext() {
    currentImageIndex = currentImageIndex < totalImages ? currentImageIndex + 1 : 1;
    modalImg.src = `portfolio/${currentImageIndex}.png`;
    modalImg.alt = `Realizacja ${currentImageIndex}`;
    updateCounter();
}

document.querySelector('.gallery').addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    const img = item.querySelector('img');
    if (img) {
        const match = img.src.match(/portfolio\/(\d+)\.png/);
        const index = match ? parseInt(match[1]) : 1;
        openModal(index);
    }
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

if (prevBtn) prevBtn.addEventListener('click', showPrev);
if (nextBtn) nextBtn.addEventListener('click', showNext);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Keyboard navigation
window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'Escape') modal.classList.remove('active');
});

// Service modal
const serviceModal = document.getElementById('service-modal');
const serviceTitle = document.getElementById('service-title');
const serviceDescription = document.getElementById('service-description');
const serviceCloseButton = document.querySelector('.service-close');

const serviceData = {
    'Projektowanie': {
        description: `Oferujemy kompleksowe projektowanie domów w stylistyce skandynawskiej – od koncepcji architektonicznej, przez projekt wnętrz, po szczegółowe plany wykonawcze. Każdy projekt jest tworzony z myślą o Twoich potrzebach, preferencjach estetycznych oraz specyfice działki. Stawiamy na naturalne światło, funkcjonalność przestrzeni i harmonię z otoczeniem.

Nasze projekty obejmują:
• adaptację projektu do warunków terenowych
• optymalizację układu pomieszczeń
• dobór materiałów wykończeniowych i kolorystyki
• konsultacje na każdym etapie prac`
    },
    'Budowa': {
        description: `Realizujemy budowy domów od fundamentów po odbiór kluczy. Korzystamy wyłącznie z certyfikowanych materiałów budowlanych gwarantujących trwałość i bezpieczeństwo. Nasz zespół doświadczonych fachowców dba o terminowość, czystość na budowie i zgodność z projektem.

Zakres prac:
• prace ziemne i fundamentowe
• konstrukcja murowana i drewniana
• prace dachowe i dekarskie
• instalacje wewnętrzne (elektryczne, wodno-kanalizacyjne, gazowe)`
    },
    'Izolacja i efektywność': {
        description: `Specjalizujemy się w nowoczesnych systemach izolacji termicznej i akustycznej. Stosujemy rozwiązania takie jak izolacja fundamentów, ścian trójwarstwowych, stropów oraz dachów z wykorzystaniem wełny mineralnej, styropianu grafitowego i folii paroizolacyjnych.

Korzyści:
• znaczące obniżenie kosztów ogrzewania
• eliminacja mostków termicznych
• doskonała izolacja akustyczna
• zdrowy mikroklimat wewnątrz budynku`
    }
};

document.querySelectorAll('.service-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent.trim();
        const data = serviceData[title];
        if (data && serviceModal) {
            serviceTitle.textContent = title;
            serviceDescription.innerHTML = data.description.replace(/\n/g, '<br>');
            serviceModal.classList.add('active');
            serviceModal.setAttribute('aria-hidden', 'false');
        }
    });
});

if (serviceCloseButton) {
    serviceCloseButton.addEventListener('click', () => {
        serviceModal.classList.remove('active');
        serviceModal.setAttribute('aria-hidden', 'true');
    });
}

if (serviceModal) {
    serviceModal.addEventListener('click', (e) => {
        if (e.target === serviceModal) {
            serviceModal.classList.remove('active');
            serviceModal.setAttribute('aria-hidden', 'true');
        }
    });
}

// Contact form
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Dziękujemy za wiadomość! Skontaktujemy się wkrótce.');
    contactForm.reset();
    contactModal.classList.remove('active');
    contactModal.setAttribute('aria-hidden', 'true');
});

// Animate on scroll - reveal elements
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// Full-page scroll navigation
const scrollSections = ['#home', '#oferta', '#galeria', '#etapy', '#onas', '#kontakt-info', 'footer'];
let currentSectionIndex = 0;
let isScrolling = false;
const scrollCooldown = 200;

function getSectionIndexByScroll() {
    const scrollY = window.scrollY + window.innerHeight / 3;
    for (let i = scrollSections.length - 1; i >= 0; i--) {
        const el = document.querySelector(scrollSections[i]);
        if (el && el.offsetTop <= scrollY) {
            return i;
        }
    }
    return 0;
}

function scrollToSection(index) {
    if (index < 0 || index >= scrollSections.length) return;
    currentSectionIndex = index;
    const el = document.querySelector(scrollSections[index]);
    if (el) {
        isScrolling = true;
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => { isScrolling = false; }, scrollCooldown);
    }
}

function isAnyModalOpen() {
    return modal.classList.contains('active') ||
           (serviceModal && serviceModal.classList.contains('active')) ||
           (contactModal && contactModal.classList.contains('active'));
}

window.addEventListener('wheel', (e) => {
    if (isScrolling || isAnyModalOpen()) {
        if (isAnyModalOpen()) return;
        e.preventDefault();
        return;
    }
    e.preventDefault();
    if (e.deltaY > 30) {
        scrollToSection(currentSectionIndex + 1);
    } else if (e.deltaY < -30) {
        scrollToSection(currentSectionIndex - 1);
    }
}, { passive: false });

window.addEventListener('keydown', (e) => {
    if (isScrolling || isAnyModalOpen()) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollToSection(currentSectionIndex + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSection(currentSectionIndex - 1);
    }
});

// Update current section on manual scroll (e.g. menu click)
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        currentSectionIndex = getSectionIndexByScroll();
    }
});

// Update section index when clicking nav links
document.querySelectorAll('.top-card-nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
        const href = link.getAttribute('href');
        const idx = scrollSections.indexOf(href);
        if (idx !== -1) currentSectionIndex = idx;
    });
});

// Animated stat counters
function animateCounter(el, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    const suffix = el.textContent.replace(/[0-9]/g, '');
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * target);
        el.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = target + suffix;
        }
    }
    
    requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const target = parseInt(text.replace(/\D/g, ''));
                if (!isNaN(target)) {
                    animateCounter(stat, target, 2000);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

