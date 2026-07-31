/* ============================================
   КРАСИВА — Студия эстетики
   JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* --- 1. Анимация появления элементов при скролле --- */
    const revealElements = document.querySelectorAll(
        '.service-card, .review-card, .feature-card, .about-card, ' +
        '.gallery-item, .contact-card, .social-card, .cta-box'
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

    // CSS-класс для revealed элементов (добавляем динамически)
    const style = document.createElement('style');
    style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);

    /* --- 2. Плавная прокрутка для якорных ссылок --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* --- 3. Обработка ошибок загрузки изображений --- */
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function () {
            // Если фото не загрузилось — показываем цветной плейсхолдер
            this.style.background = 'linear-gradient(135deg, #e8ddd0, #d4c4b0)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.minHeight = '200px';
            this.alt = 'Фото скоро появится';
        });
    });

    /* --- 4. Мобильное меню (бургер) --- */
    const navbar = document.querySelector('.nav-container');
    const nav = document.querySelector('.navbar');

    if (navbar && window.innerWidth <= 768) {
        // Создаём кнопку бургер
        const burger = document.createElement('button');
        burger.className = 'nav-burger';
        burger.innerHTML = '☰';
        burger.setAttribute('aria-label', 'Открыть меню');

        // Вставляем перед навигацией
        nav.insertBefore(burger, navbar);

        // Стили для бургера (добавляем динамически)
        const burgerStyle = document.createElement('style');
        burgerStyle.textContent = `
            .nav-burger {
                display: block;
                width: 100%;
                padding: 12px;
                background: transparent;
                border: none;
                font-size: 20px;
                color: var(--color-primary);
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

    /* --- 5. Подсветка текущего пункта меню (если скролл на одной странице) --- */
    // Для многостраничника активный класс уже проставлен в HTML,
    // но добавим небольшой эффект при наведении через JS для старых браузеров
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