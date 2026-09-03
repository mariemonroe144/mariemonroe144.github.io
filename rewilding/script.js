/* =====================================================
   REWILDING — Script
   Andy's Outings × Marie Monroe
   ===================================================== */

(function () {
    'use strict';

    // ---- NAV: darken on scroll ----
    const nav = document.getElementById('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 60);
        }, { passive: true });
    }

    // ---- HERO PARALLAX ----
    const heroImage = document.querySelector('.hero__image');
    if (heroImage && window.matchMedia('(min-width: 768px)').matches) {
        const onScroll = () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight * 1.2) {
                heroImage.style.transform = `translateY(${scrolled * 0.35}px)`;
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // ---- SECTION REVEALS ----
    const reveals = document.querySelectorAll('[data-reveal]');

    if ('IntersectionObserver' in window && reveals.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        });

        reveals.forEach(el => revealObserver.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('revealed'));
    }

    // ---- STICKY MOBILE CTA ----
    const stickyCta = document.getElementById('stickyCta');
    const heroCta   = document.getElementById('heroCta');

    if (stickyCta && heroCta) {
        const ctaObserver = new IntersectionObserver((entries) => {
            const isHeroCtaVisible = entries[0].isIntersecting;
            stickyCta.classList.toggle('visible', !isHeroCtaVisible);
            stickyCta.setAttribute('aria-hidden', String(isHeroCtaVisible));
        }, { threshold: 0 });

        ctaObserver.observe(heroCta);
    }

    // ---- SMOOTH SCROLL for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

})();
