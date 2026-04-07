// =====================================
// GSAP Initialization
// =====================================
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// =====================================
// Site-Wide Animations
// =====================================
window.addEventListener('load', () => {
    // Selectors
    const preloader = document.getElementById('preloader');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroGlassCard = document.getElementById('heroGlassCard');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const logoImg = document.querySelector('.logo-img');
    const logoText = document.querySelector('.logo-text-wrapper');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    document.body.classList.add('preloader-active');

    // Fail-safe: Force show page if something stalls
    const failSafe = setTimeout(() => {
        if (preloader && preloader.style.visibility !== 'hidden') {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.visibility = 'hidden';
                document.body.classList.remove('preloader-active');
                gsap.set([heroTitle, heroSubtitle, heroButtons, navbar], { autoAlpha: 1 });
                ScrollTrigger.refresh();
            }, 600);
        }
    }, 4000);

    // 1. Entrance Timeline
    const mainTl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onStart: () => clearTimeout(failSafe)
    });

    mainTl.to(preloader, {
        opacity: 0,
        duration: 1,
        delay: 1.2,
        onComplete: () => {
            preloader.style.visibility = 'hidden';
            document.body.classList.remove('preloader-active');
            ScrollTrigger.refresh();
        }
    })
    .fromTo(navbar, { y: -50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2 }, "-=0.5")
    .fromTo(logoImg, { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1 }, "-=1")
    .fromTo(logoText, { x: -20, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1 }, "-=0.8")
    .fromTo(navLinks, { y: -20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1 }, "-=1")
    .fromTo(heroGlassCard, { scale: 0.9, autoAlpha: 0, y: 50 }, { scale: 1, autoAlpha: 1, y: 0, duration: 1.5, ease: "elastic.out(1, 0.8)" }, "-=0.8")
    .fromTo(heroTitle, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 }, "-=1")
    .fromTo(heroSubtitle, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 }, "-=0.8")
    .fromTo(heroButtons, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 }, "-=0.8")
    .fromTo(scrollIndicator, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, "-=0.5");

    // 2. Navbar Scroll Style
    if (navbar) {
        ScrollTrigger.create({
            start: "top -50",
            onUpdate: (self) => {
                if (self.direction === 1) navbar.classList.add('scrolled');
                else if (self.scroll() < 50) navbar.classList.remove('scrolled');
            }
        });
    }

    // 3. Parallax
    gsap.to(".hero-image-wrapper img", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });
    document.querySelectorAll('.orb').forEach((orb, i) => {
        gsap.to(orb, {
            yPercent: (i + 1) * 20,
            ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
        });
    });

    // 4. Section Staggered Reveals
    const aboutTl = gsap.timeline({ scrollTrigger: { trigger: ".about", start: "top 75%", toggleActions: "play none none none" } });
    aboutTl.fromTo(".about-badge", { x: -30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8 })
           .fromTo(".about-header h2", { x: -30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8 }, "-=0.6")
           .fromTo(".about-description", { x: -30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8 }, "-=0.6")
           .fromTo(".feature-card", { x: 50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8, stagger: 0.2 }, "-=0.4");

    const reviewsEntranceTl = gsap.timeline({ scrollTrigger: { trigger: ".reviews", start: "top 75%", toggleActions: "play none none none" } });
    reviewsEntranceTl.fromTo(".reviews-tag", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 })
                     .fromTo(".reviews-header h2", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, "-=0.6")
                     .fromTo(".review-card", { scale: 0.95, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1, stagger: 0.2 }, "-=0.4")
                     .fromTo(".carousel-nav, .carousel-progress-container", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, "-=0.6");

    const contactTl = gsap.timeline({ scrollTrigger: { trigger: ".contact", start: "top 75%", toggleActions: "play none none none" } });
    contactTl.fromTo(".contact-header", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 })
             .fromTo(".input-group", { x: -30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8, stagger: 0.15 }, "-=0.8")
             .fromTo(".btn-full", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, "-=0.4")
             .fromTo(".contact-info-box", { x: 30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8 }, "-=1")
             .fromTo(".social-box", { x: 30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8 }, "-=0.6");

    const footerTl = gsap.timeline({ scrollTrigger: { trigger: ".footer", start: "top 90%", toggleActions: "play none none none" } });
    footerTl.fromTo(".footer-brand-section", { x: -30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1 })
            .fromTo(".footer-column", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.2 }, "-=0.8")
            .fromTo(".footer-bottom", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, "-=0.4");

    // 5. 3D Tilt
    if (heroGlassCard) {
        const heroSection = document.querySelector('.hero');
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const xPos = (e.clientX - rect.left) / rect.width - 0.5;
            const yPos = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(heroGlassCard, { rotationY: xPos * 10, rotationX: yPos * -10, duration: 0.6 });
        });
        heroSection.addEventListener('mouseleave', () => {
            gsap.to(heroGlassCard, { rotationY: 0, rotationX: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" });
        });
    }

    // 6. Mobile Nav
    const hamburgerBtn = document.getElementById('hamburger');
    const navMenuEl = document.getElementById('navMenu');
    if (hamburgerBtn && navMenuEl) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navMenuEl.classList.toggle('active');
        });
        document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            navMenuEl.classList.remove('active');
        }));
    }

    // 7. Reviews Section Detailed Logic
    const reviewData = [
        { name: "Jessica Martinez", role: "Owner, Urban Style Boutique", body: "CIEL transformed our online presence completely. Their Instagram and Facebook ad campaigns brought us customers we never thought we could reach.", metrics: [{ label: "Online Sales", value: 350, suffix: "%" }, { label: "New Customers", value: 2.5, suffix: "k" }, { label: "ROAS", value: 5.8, suffix: "x" }] },
        { name: "Michael Chen", role: "CMO, Velocity", body: "The level of transparency and data-driven decision making CIEL brings to the table is refreshing. We've seen a 280% increase in revenue in just 45 days.", metrics: [{ label: "Revenue Growth", value: 280, suffix: "%" }, { label: "ROAS", value: 4.2, suffix: "x" }, { label: "New Customers", value: 12, suffix: "k" }] },
        { name: "Dr. Elena Rodriguez", role: "Director, PureHealth", body: "Transitioning our local advertising to CIEL was the best move we made this year. We are fully booked for the next two months. Amazing ROI.", metrics: [{ label: "Booked Out", value: 8, suffix: " Weeks" }, { label: "Appt Increase", value: 150, suffix: "%" }, { label: "Retention Rate", value: 92, suffix: "%" }] }
    ];

    let currentReviewIdx = 0;
    const reviewRotateInterval = 6000;
    let rotationTimer = null;
    let isCarouselPaused = false;
    const progressBar = document.getElementById('progressBar');
    const reviewsWrapper = document.querySelector('.reviews-wrapper');

    function updateReviewCarousel(index) {
        currentReviewIdx = index;
        
        const slides = document.querySelectorAll('.review-slide');
        const dots = document.querySelectorAll('.dot');
        
        slides.forEach((slide, i) => {
            if (i === index) {
                // Fade in active slide
                slide.classList.add('active');
                gsap.to(slide, { autoAlpha: 1, scale: 1, duration: 0.8, ease: "power2.out" });
                // Make sure internal card is visible too
                gsap.set(slide.querySelectorAll('.review-card'), { autoAlpha: 1 });
            } else {
                // Fade out inactive slides
                slide.classList.remove('active');
                gsap.to(slide, { autoAlpha: 0, scale: 0.95, duration: 0.8, ease: "power2.out" });
            }
        });
        
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        
        if (progressBar) {
            gsap.killTweensOf(progressBar);
            gsap.fromTo(progressBar, { width: 0 }, { width: "100%", duration: reviewRotateInterval / 1000, ease: "none" });
        }
    }

    function startAutoRotation() {
        if (rotationTimer) clearInterval(rotationTimer);
        rotationTimer = setInterval(() => {
            if (!isCarouselPaused) {
                currentReviewIdx = (currentReviewIdx + 1) % reviewData.length;
                updateReviewCarousel(currentReviewIdx);
            }
        }, reviewRotateInterval);
    }

    // Interaction Handlers
    document.querySelectorAll('.dot').forEach((dot, i) => dot.addEventListener('click', () => { updateReviewCarousel(i); startAutoRotation(); }));
    const prevReviewBtn = document.getElementById('prevReview');
    const nextReviewBtn = document.getElementById('nextReview');
    if (prevReviewBtn) prevReviewBtn.addEventListener('click', () => { currentReviewIdx = (currentReviewIdx - 1 + reviewData.length) % reviewData.length; updateReviewCarousel(currentReviewIdx); startAutoRotation(); });
    if (nextReviewBtn) nextReviewBtn.addEventListener('click', () => { currentReviewIdx = (currentReviewIdx + 1) % reviewData.length; updateReviewCarousel(currentReviewIdx); startAutoRotation(); });

    if (reviewsWrapper) {
        reviewsWrapper.addEventListener('mouseenter', () => { isCarouselPaused = true; if(progressBar) gsap.getTweensOf(progressBar).forEach(t => t.pause()); });
        reviewsWrapper.addEventListener('mouseleave', () => { isCarouselPaused = false; if(progressBar) gsap.getTweensOf(progressBar).forEach(t => t.resume()); });
    }

    // Setup ONCE on scroll entry
    ScrollTrigger.create({ trigger: "#reviews", start: "top 80%", once: true, onEnter: () => { updateReviewCarousel(0); startAutoRotation(); } });

    // Premium Modal
    window.openReview = (index) => {
        const data = reviewData[index];
        const revModal = document.getElementById('reviewModal');
        const revModalBody = document.getElementById('reviewModalBody');
        if (revModalBody) {
            revModalBody.innerHTML = `
                <div class="review-modal-header">
                    <div class="author-img"><img src="logo_img-removebg-preview.png" alt="${data.name}"></div>
                    <div class="author-info"><h4 class="author-name">${data.name}</h4><p class="author-role">${data.role}</p></div>
                </div>
                <div class="review-modal-content">
                    <blockquote>"${data.body}"</blockquote>
                    <div class="review-modal-metrics"><h5>Campaign Performance</h5><div class="metrics-grid">
                        ${data.metrics.map((m, i) => `<div class="metric-item"><div class="metric-value" id="modal-metric-${i}">0${m.suffix}</div><div class="metric-label">${m.label}</div></div>`).join('')}
                    </div></div>
                </div>`;
            data.metrics.forEach((m, i) => {
                const counter = { val: 0 };
                gsap.to(counter, { val: m.value, duration: 1.5, delay: 0.4 + (i * 0.1), ease: "power2.out", onUpdate: () => {
                    const el = document.getElementById(`modal-metric-${i}`);
                    if (el) el.innerText = (m.value % 1 === 0 ? Math.floor(counter.val) : counter.val.toFixed(1)) + m.suffix;
                }});
            });
        }
        if (revModal) { revModal.classList.add('active'); document.body.style.overflow = 'hidden'; gsap.fromTo(".modal-container", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }); }
    };

    if (document.getElementById('closeReviewModal')) document.getElementById('closeReviewModal').onclick = () => { const revModal = document.getElementById('reviewModal'); if(revModal) revModal.classList.remove('active'); document.body.style.overflow = ''; };

    // 8. Contact logic
    const contactForm = document.getElementById('simpleContactForm');
    const formSuccess = document.getElementById('simpleFormSuccess');
    window.resetContactForm = () => { if(contactForm) { contactForm.style.display='block'; contactForm.reset(); } if(formSuccess) formSuccess.style.display='none'; };
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('contactSubmitBtn');
            btn.innerText = 'Sending...'; btn.disabled = true;
            setTimeout(() => { if(contactForm) contactForm.style.display = 'none'; if(formSuccess) formSuccess.style.display = 'block'; btn.innerText = 'Send Message'; btn.disabled = false; }, 1500);
        });
    }

    // 9. Smooth Scroll Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) gsap.to(window, { scrollTo: { y: target.offsetTop - 80 }, duration: 1.5, ease: "power4.inOut" });
        });
    });
});
