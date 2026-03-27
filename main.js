document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // GSAP Scroll Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Parallax
    gsap.to('.hero-bg img', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 100,
        scale: 1.2
    });

    // Fade Up Animation
    const fadeUpElements = document.querySelectorAll('.fade-up');
    fadeUpElements.forEach((el) => {
        const delay = el.getAttribute('data-delay') || 0;
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                once: true
            },
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: delay,
            ease: "power2.out"
        });
    });

    // Water Background Parallax
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const waterBg = document.getElementById('water-bg');
        if (waterBg) {
            waterBg.style.transform = `translateY(${scrolled * 0.15}px)`;
        }

        // Navbar scrolled state
        const nav = document.querySelector('.navbar');
        if (scrolled > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Horizontal Scroll with Mouse Wheel (for Rooms)
    const roomContainer = document.querySelector('.horizontal-scroll');
    if (roomContainer) {
        roomContainer.addEventListener('wheel', (evt) => {
            evt.preventDefault();
            roomContainer.scrollLeft += evt.deltaY;
        }, { passive: false });
    }

    // Interactive Social Buttons Effect
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0, 0)`;
        });
    });

    // Lightbox / Image Gallery Simulation
    const triggers = document.querySelectorAll('.gallery-trigger');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const roomType = trigger.getAttribute('data-room');
            const imgSrc = trigger.closest('.room-card').querySelector('img').src;
            if (lightbox && lightboxImg) {
                lightboxImg.src = imgSrc;
                lightbox.style.display = 'flex';
                gsap.fromTo('.lightbox-content', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5 });
            }
        });
    });

    if (closeBtn && lightbox) {
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.style.display = 'none';
        });
    }

    // 3D Tilt Effect on Room Cards
    const cards = document.querySelectorAll('.room-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xRotation = ((y - rect.height / 2) / (rect.height / 2)) * -5;
            const yRotation = ((x - rect.width / 2) / (rect.width / 2)) * 5;
            card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) translateY(-10px) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });

    // Mobile Hamburger Menu
    const menuBtn = document.getElementById('menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (menuBtn && mobileNav) {
        menuBtn.addEventListener('click', () => {
            mobileNav.classList.add('open');
        });
    }

    if (mobileNavClose && mobileNav) {
        mobileNavClose.addEventListener('click', () => {
            mobileNav.classList.remove('open');
        });
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
        });
    });
});
