/* ============================================
   КРАСИВА — Студия эстетики
   JavaScript — одностраничный сайт
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* --- 1. Анимация появления элементов при скролле --- */
    const revealElements = document.querySelectorAll(
        '.service-card, .review-card, .feature-card, .about-card, ' +
        '.gallery-item, .contact-card, .social-card, .cta-box, .promo-banner'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // CSS-класс для revealed элементов
    const style = document.createElement('style');
    style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);

    /* --- 2. Плавная прокрутка для навигации --- */
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    /* --- 3. Подсветка активного пункта меню при скролле --- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    highlightNav(); // проверить сразу при загрузке

    /* --- 4. Обработка ошибок загрузки изображений --- */
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function () {
            this.style.background = 'linear-gradient(135deg, #e8ddd0, #d4c4b0)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.minHeight = '200px';
            this.alt = 'Фото скоро появится';
        });
    });

    /* --- 5. Мобильное меню (бургер) --- */
    const navbar = document.querySelector('.nav-container');
    const nav = document.querySelector('.navbar');

    if (navbar && window.innerWidth <= 768) {
        const burger = document.createElement('button');
        burger.className = 'nav-burger';
        burger.innerHTML = '☰';
        burger.setAttribute('aria-label', 'Открыть меню');

        nav.insertBefore(burger, navbar);

        const burgerStyle = document.createElement('style');
        burgerStyle.textContent = `
            .nav-burger {
                display: block;
                width: 100%;
                padding: 12px;
                background: transparent;
                border: none;
                font-size: 20px;
                color: #6b5b4f;
                cursor: pointer;
                text-align: center;
            }
            .nav-container {
                display: none;
                flex-direction: column;
                gap: 6px;
                padding: 10px;
            }
            .nav-container.open {
                display: flex;
            }
            .nav-link {
                width: 100%;
                text-align: center;
            }
            @media (min-width: 769px) {
                .nav-burger { display: none !important; }
                .nav-container { display: flex !important; flex-direction: row; }
            }
        `;
        document.head.appendChild(burgerStyle);

        // Переключение меню
        burger.addEventListener('click', () => {
            navbar.classList.toggle('open');
            burger.innerHTML = navbar.classList.contains('open') ? '✕' : '☰';
        });

        // Закрытие меню при клике на ссылку
        navbar.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('open');
                burger.innerHTML = '☰';
            });
        });
    }

    /* --- 6. Эффект при наведении на пункты меню --- */
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', function () {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-1px)';
            }
        });
        link.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    console.log('✨ КРАСИВА — сайт загружен!');
});
