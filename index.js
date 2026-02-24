/* ===== Mobile Menu Toggle ===== */
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const ham = document.querySelector('.ham');
    navMenu.classList.toggle('open');
    ham.classList.toggle('active');
}

/* ===== Nav Link Click ===== */
function navLinkClicked(event) {
    // Close mobile menu if open
    const navMenu = document.getElementById('navMenu');
    const ham = document.querySelector('.ham');
    if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        ham.classList.remove('active');
    }
}

/* ===== Active Nav Highlighting on Scroll ===== */
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 120;

    let currentSection = '';
    sections.forEach(section => {
        if (scrollPos >= section.offsetTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

/* ===== Navbar Background on Scroll ===== */
function updateNavbar() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

/* ===== Scroll-Triggered Fade-In Animations ===== */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
}

/* ===== Contact Form Submit ===== */
function onFormSubmit(form) {
    const name = form.name.value.trim();
    const message = form.message.value.trim();

    if (name === '') {
        alert('Please enter your name!');
        return;
    }
    if (message === '') {
        alert('Please enter a message!');
        return;
    }

    const emailBody = encodeURIComponent(`Greetings,\n\n${message}`);
    const tel = form.tel.value.trim();
    const subject = encodeURIComponent(`Enquiry from ${name}${tel ? ' (' + tel + ')' : ''}`);
    window.open(
        `mailto:ayoobnazeerandassociates@gmail.com?subject=${subject}&body=${emailBody}`,
        '_self'
    );
}

/* ===== Leaflet Map ===== */
function loadMaps() {
    const target = L.latLng(9.899417911965054, 76.72045885317041);

    const map = new L.map('map').setView(target, 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = L.marker(target).addTo(map);
    marker.on('click', function () {
        window.open('https://maps.google.com/?q=9.899417911965054,76.72045885317041', '_blank');
    });
}

/* ===== Close Mobile Menu on Outside Click ===== */
document.addEventListener('click', function (e) {
    const navMenu = document.getElementById('navMenu');
    const ham = document.querySelector('.ham');
    const nav = document.getElementById('navbar');

    if (navMenu && navMenu.classList.contains('open')) {
        if (!nav.contains(e.target)) {
            navMenu.classList.remove('open');
            ham.classList.remove('active');
        }
    }
});

/* ===== Scroll Events ===== */
window.addEventListener('scroll', function () {
    updateActiveNav();
    updateNavbar();
});

/* ===== Window Load ===== */
window.addEventListener('load', function () {
    // Fade out loader
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');
    const navbar = document.getElementById('navbar');

    loader.classList.add('hidden');
    content.style.display = 'block';
    navbar.style.display = 'block';

    // Remove loader from DOM after transition
    setTimeout(() => {
        loader.style.display = 'none';
    }, 600);

    // Initialize features
    loadMaps();
    initScrollAnimations();
    updateActiveNav();
    updateNavbar();
});