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

    // Gallery Modal
    const galleryModal    = document.getElementById('gallery-modal');
    const galleryCloseBtn = document.getElementById('gallery-modal-close');
    const galleryMainImg  = document.getElementById('gallery-main-img');
    const galleryRoomName = document.getElementById('gallery-room-name');
    const galleryCounter  = document.getElementById('gallery-counter');
    const galleryPrev     = document.getElementById('gallery-prev');
    const galleryNext     = document.getElementById('gallery-next');
    const galleryThumbs   = document.getElementById('gallery-thumbs');

    let galleryImages = [];
    let galleryIndex  = 0;

    function openGallery(images, roomName, startIndex) {
        galleryImages = images;
        galleryIndex  = startIndex || 0;
        galleryRoomName.textContent = roomName;
        galleryThumbs.innerHTML = '';
        images.forEach((src, i) => {
            const thumb = document.createElement('img');
            thumb.src = src;
            thumb.alt = `照片 ${i + 1}`;
            thumb.className = 'gallery-thumb' + (i === galleryIndex ? ' active' : '');
            thumb.addEventListener('click', () => setGalleryIndex(i));
            galleryThumbs.appendChild(thumb);
        });
        setGalleryIndex(galleryIndex, false);
        galleryModal.classList.add('open');
        lucide.createIcons({ nodes: [galleryPrev, galleryNext] });
        document.body.style.overflow = 'hidden';
    }

    function setGalleryIndex(idx, animate) {
        if (animate === undefined) animate = true;
        galleryIndex = (idx + galleryImages.length) % galleryImages.length;
        if (animate) {
            galleryMainImg.classList.add('fade');
            setTimeout(() => {
                galleryMainImg.src = galleryImages[galleryIndex];
                galleryMainImg.classList.remove('fade');
            }, 200);
        } else {
            galleryMainImg.src = galleryImages[galleryIndex];
        }
        galleryCounter.textContent = (galleryIndex + 1) + ' / ' + galleryImages.length;
        document.querySelectorAll('.gallery-thumb').forEach((t, i) => {
            t.classList.toggle('active', i === galleryIndex);
        });
        const activeThumb = galleryThumbs.children[galleryIndex];
        if (activeThumb) activeThumb.scrollIntoView({ inline: 'nearest', behavior: 'smooth' });
    }

    function closeGallery() {
        galleryModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.card-gallery-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const images   = JSON.parse(btn.getAttribute('data-images'));
            const roomName = btn.getAttribute('data-room');
            openGallery(images, roomName, 0);
        });
    });

    if (galleryCloseBtn) galleryCloseBtn.addEventListener('click', closeGallery);
    if (galleryModal)    galleryModal.addEventListener('click', (e) => { if (e.target === galleryModal) closeGallery(); });
    if (galleryPrev)     galleryPrev.addEventListener('click', () => setGalleryIndex(galleryIndex - 1));
    if (galleryNext)     galleryNext.addEventListener('click', () => setGalleryIndex(galleryIndex + 1));

    document.addEventListener('keydown', (e) => {
        if (!galleryModal || !galleryModal.classList.contains('open')) return;
        if (e.key === 'ArrowLeft')  setGalleryIndex(galleryIndex - 1);
        if (e.key === 'ArrowRight') setGalleryIndex(galleryIndex + 1);
        if (e.key === 'Escape')     closeGallery();
    });

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

    // Language Dropdown
    const langDropdown = document.querySelector('.lang-dropdown');
    if (langDropdown) {
        const langBtn = langDropdown.querySelector('.lang-dropdown-btn');
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('open');
        });
        document.addEventListener('click', () => {
            langDropdown.classList.remove('open');
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const isOpen = btn.getAttribute('aria-expanded') === 'true';
            // Close all
            faqQuestions.forEach(q => {
                q.setAttribute('aria-expanded', 'false');
                q.nextElementSibling.classList.remove('open');
            });
            // Toggle current
            if (!isOpen) {
                btn.setAttribute('aria-expanded', 'true');
                btn.nextElementSibling.classList.add('open');
            }
        });
    });
});
