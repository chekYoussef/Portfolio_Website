// ============================================================
//  YOUSSEF CHEKKORI PORTFOLIO — JavaScript
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ── CUSTOM CURSOR ──────────────────────────────────────
    const dot  = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0;
    let ringX = 0,  ringY = 0;

    if (dot && ring) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX; mouseY = e.clientY;
            dot.style.left  = mouseX + 'px';
            dot.style.top   = mouseY + 'px';
        });
        function animateRing() {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            ring.style.left = ringX + 'px';
            ring.style.top  = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        const hoverEls = document.querySelectorAll('a, button, .skill-pills span, .project-card, .work-card');
        hoverEls.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });

        document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
        document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
    }

    // ── STICKY NAV ────────────────────────────────────────
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 30);
        }, { passive: true });
    }

    // ── MOBILE BURGER ─────────────────────────────────────
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
    }

    // ── PAGE TRANSITION ───────────────────────────────────
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('http')) return;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.href;
            document.body.style.transition = 'opacity 0.3s ease';
            document.body.style.opacity = '0';
            setTimeout(() => { window.location.href = target; }, 300);
        });
    });

    // ── SCROLL REVEAL ─────────────────────────────────────
    const revealEls = document.querySelectorAll('.reveal-up, .reveal-card');
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObs.observe(el));

    // ── ANIMATED COUNTERS ─────────────────────────────────
    const counters = document.querySelectorAll('.stat-num');
    const counterObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target, 10);
                let current = 0;
                const step = target / (1800 / 16);
                const update = () => {
                    current = Math.min(current + step, target);
                    el.textContent = Math.round(current);
                    if (current < target) requestAnimationFrame(update);
                };
                requestAnimationFrame(update);
                counterObs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObs.observe(c));

    // ── WORKS FILTER ──────────────────────────────────────
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workCards  = document.querySelectorAll('.work-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            workCards.forEach(card => {
                const cats = card.dataset.category || '';
                if (filter === 'all' || cats.includes(filter)) {
                    card.style.display = '';
                    setTimeout(() => card.classList.add('visible'), 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ── PDF HORIZONTAL CAROUSEL ────────────────────────────
    const track      = document.getElementById('pdfTrack');
    const prevBtn    = document.getElementById('pdfPrev');
    const nextBtn    = document.getElementById('pdfNext');
    const dots       = document.querySelectorAll('.pdf-dot');
    const infoSlides = document.querySelectorAll('.pdf-info-slide');
    const currentEl  = document.getElementById('pdfCurrent');
    const totalEl    = document.getElementById('pdfTotal');

    if (track && prevBtn && nextBtn) {
        let current = 0;
        const total = dots.length;
        if (totalEl) totalEl.textContent = total;

        function goTo(index) {
            current = Math.max(0, Math.min(index, total - 1));
            track.style.transform = `translateX(-${current * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
            infoSlides.forEach((s, i) => s.classList.toggle('active', i === current));
            if (currentEl) currentEl.textContent = current + 1;
        }

        prevBtn.addEventListener('click', () => goTo(current - 1));
        nextBtn.addEventListener('click', () => goTo(current + 1));
        dots.forEach(dot => {
            dot.addEventListener('click', () => goTo(parseInt(dot.dataset.index, 10)));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft')  goTo(current - 1);
            if (e.key === 'ArrowRight') goTo(current + 1);
        });

        let touchStartX = 0;
        track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
        track.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
        }, { passive: true });

        goTo(0);
    }

    // ── CONTACT FORM ──────────────────────────────────────
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.form-submit');
            const original = btn.textContent;
            btn.textContent = 'Message sent ✓';
            btn.style.background = '#22c55e';
            setTimeout(() => {
                btn.textContent = original;
                btn.style.background = '';
                form.reset();
            }, 3000);
        });
    }

});