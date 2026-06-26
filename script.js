/* ============================================================
   JS - Shaiyma Parveen Portfolio
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    'use strict';

    // ============================================================
    // 1. PRELOADER
    // ============================================================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function () {
        setTimeout(() => {
            preloader.classList.add('hide');
        }, 500);
    });

    // ============================================================
    // 2. AOS INIT
    // ============================================================
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic',
        disable: window.innerWidth < 768 ? 'mobile' : false
    });

    // ============================================================
    // 3. TYPED.JS
    // ============================================================
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: [
                'Flutter Developer',
                'Mobile App Developer',
                'Android Developer',
                'UI/UX Enthusiast'
            ],
            typeSpeed: 60,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            cursorChar: '|',
            smartBackspace: true
        });
    }

    // ============================================================
    // 4. SCROLL PROGRESS BAR
    // ============================================================
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', function () {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    });

    // ============================================================
    // 5. BACK TO TOP BUTTON
    // ============================================================
    const backBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            backBtn.classList.add('visible');
        } else {
            backBtn.classList.remove('visible');
        }
    });
    backBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================================
    // 6. CURSOR GLOW
    // ============================================================
    const glow = document.getElementById('cursor-glow');
    let glowX = 0,
        glowY = 0;
    let mouseX = 0,
        mouseY = 0;

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (window.innerWidth > 768) {
            glow.style.opacity = '1';
        } else {
            glow.style.opacity = '0';
        }
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // ============================================================
    // 7. DARK / LIGHT MODE
    // ============================================================
    const darkToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check saved theme
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark');
        updateDarkIcons(true);
    }

    function updateDarkIcons(isDark) {
        const iconMoon = darkToggle.querySelector('.dark-icon');
        const iconSun = darkToggle.querySelector('.light-icon');
        if (isDark) {
            iconMoon.style.display = 'none';
            iconSun.style.display = 'inline-block';
        } else {
            iconMoon.style.display = 'inline-block';
            iconSun.style.display = 'none';
        }
    }

    darkToggle.addEventListener('click', function () {
        const isDark = body.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateDarkIcons(isDark);
        // Re-trigger AOS for new styles if needed
        AOS.refresh();
    });

    // ============================================================
    // 8. MOBILE NAVBAR COLLAPSE ON LINK CLICK
    // ============================================================
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.getElementById('navMenu');
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth < 992) {
                bsCollapse.hide();
            }
        });
    });

    // ============================================================
    // 9. NAVBAR SCROLL EFFECT
    // ============================================================
    const navbar = document.querySelector('.glass-nav');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ============================================================
    // 10. ACTIVE NAV LINK ON SCROLL
    // ============================================================
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ============================================================
    // 11. SKILLS PROGRESS ANIMATION
    // ============================================================
    const skillBars = document.querySelectorAll('.skill-progress .progress-bar');
    let skillsAnimated = false;

    function animateSkills() {
        if (skillsAnimated) return;
        const triggerPoint = window.innerHeight * 0.8;
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;
        const rect = skillsSection.getBoundingClientRect();
        if (rect.top < triggerPoint) {
            skillsAnimated = true;
            skillBars.forEach(function (bar, index) {
                const width = bar.getAttribute('data-width');
                setTimeout(function () {
                    bar.style.width = width + '%';
                }, index * 120);
            });
        }
    }

    // ============================================================
    // 12. COUNTER ANIMATION
    // ============================================================
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        const triggerPoint = window.innerHeight * 0.8;
        const achievementsSection = document.getElementById('achievements');
        if (!achievementsSection) return;
        const rect = achievementsSection.getBoundingClientRect();
        if (rect.top < triggerPoint) {
            countersAnimated = true;
            counters.forEach(function (counter) {
                const target = parseFloat(counter.getAttribute('data-target'));
                const isFloat = target % 1 !== 0;
                let current = 0;
                const increment = target / 60;
                const timer = setInterval(function () {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
                }, 25);
            });
        }
    }

    // ============================================================
    // 13. PORTFOLIO FILTER
    // ============================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            // Update active button
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(function (item) {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    // Re-trigger AOS for new items
                    AOS.refresh();
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ============================================================
    // 14. CONTACT FORM VALIDATION
    // ============================================================
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        // Get fields
        const name = document.getElementById('contactName');
        const email = document.getElementById('contactEmail');
        const message = document.getElementById('contactMessage');

        // Reset validation
        [name, email, message].forEach(function (field) {
            field.classList.remove('is-invalid');
        });

        // Validate name
        if (name.value.trim() === '') {
            name.classList.add('is-invalid');
            isValid = false;
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            email.classList.add('is-invalid');
            isValid = false;
        }

        // Validate message
        if (message.value.trim() === '') {
            message.classList.add('is-invalid');
            isValid = false;
        }

        if (isValid) {
            // Simulate sending
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
            submitBtn.disabled = true;

            setTimeout(function () {
                submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Sent!';
                submitBtn.style.background = '#10b981';
                submitBtn.style.borderColor = '#10b981';

                setTimeout(function () {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2500);
            }, 1800);
        }
    });

    // ============================================================
    // 15. SCROLL LISTENERS FOR SKILLS & COUNTERS
    // ============================================================
    window.addEventListener('scroll', function () {
        animateSkills();
        animateCounters();
    });

    // Initial check after page load
    setTimeout(function () {
        animateSkills();
        animateCounters();
    }, 600);

    // ============================================================
    // 16. SMOOTH SCROLL FOR ANCHOR LINKS (optional fallback)
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ============================================================
    // 17. REFRESH AOS ON WINDOW RESIZE
    // ============================================================
    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            AOS.refresh();
        }, 250);
    });

    // ============================================================
    // 18. BOOTSTRAP CAROUSEL TESTIMONIALS - AUTO PLAY
    // ============================================================
    // Already handled by data-bs-ride="carousel"

    console.log('🚀 Shaiyma Parveen Portfolio loaded successfully.');
});