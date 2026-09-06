/* ============================================
   КРАСИВА — Студия эстетики
   JavaScript — форма записи (с диагностикой и временем)
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

    const style = document.createElement('style');
    style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);

    /* --- 2. Плавная прокрутка + подсветка при клике --- */
    let isClickScrolling = false;
    let clickScrollTimeout;

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    isClickScrolling = true;
                    clearTimeout(clickScrollTimeout);
                    clickScrollTimeout = setTimeout(() => {
                        isClickScrolling = false;
                    }, 1200);
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    /* --- 3. Подсветка активного пункта меню при скролле --- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        if (isClickScrolling) return;
        let current = '';
        const scrollPos = window.scrollY + 180;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollPos >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        if (!current && window.scrollY < 100) {
            current = 'home';
        }
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    highlightNav();

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

    if (navbar) {
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

        burger.addEventListener('click', () => {
            navbar.classList.toggle('open');
            burger.innerHTML = navbar.classList.contains('open') ? '✕' : '☰';
        });

        navbar.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('open');
                burger.innerHTML = '☰';
            });
        });
    }

    /* --- 6. Hover-эффект на пунктах меню --- */
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

    /* --- 7. Кнопка «Наверх» --- */
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.setAttribute('aria-label', 'Наверх');
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    console.log('✨ КРАСИВА — сайт загружен!');

    /* ============================================
       МОДАЛЬНОЕ ОКНО ЗАПИСИ + ОТПРАВКА В TELEGRAM
       ============================================ */

    // ⚠️ ЗАМЕНИТЕ НА СВОЙ URL (из Apps Script)
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/ВАШ_АДРЕС/exec';

    const modal = document.getElementById('bookingModal');
    const modalClose = document.getElementById('modalClose');
    const bookingForm = document.getElementById('bookingForm');
    const serviceSelect = document.getElementById('clientService');

    // Открытие модалки
    document.querySelectorAll('.js-open-modal').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const preselected = this.dataset.service;
            if (preselected && serviceSelect) {
                serviceSelect.value = preselected;
            }
            if (modal) {
                modal.style.display = 'flex';
                requestAnimationFrame(() => modal.classList.add('active'));
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Закрытие модалки
    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            if (bookingForm) {
                bookingForm.reset();
                bookingForm.style.display = 'block';
                const successMsg = modal.querySelector('.form-success');
                if (successMsg) successMsg.remove();
            }
        }, 300);
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
        });
    }

    // Универсальная функция отправки (с диагностикой и временем)
    async function submitForm(form, submitBtn, isEmbedded) {
        const originalText = submitBtn ? submitBtn.textContent : 'Записаться';

        // === ЧИТАЕМ ВСЕ ПОЛЯ, ВКЛЮЧАЯ ВРЕМЯ ===
        const name = form.querySelector('[name="name"]').value.trim();
        const phone = form.querySelector('[name="phone"]').value.trim();
        const service = form.querySelector('[name="service"]').value;
        const date = form.querySelector('[name="date"]').value;
        const timeInput = form.querySelector('[name="time"]');
        const time = timeInput ? timeInput.value : '';   // ← ЭТО ВАЖНО

        if (!name || !phone || !service) {
            alert('Пожалуйста, заполните все обязательные поля');
            return false;
        }

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
        }

        try {
            // === ДОБАВЛЯЕМ time В ОТПРАВЛЯЕМЫЕ ДАННЫЕ ===
            const formData = new URLSearchParams({ name, phone, service, date, time });
            const url = GOOGLE_SCRIPT_URL + '?t=' + Date.now();

            console.log('📤 Отправка данных на:', url);
            console.log('📦 Данные:', formData.toString());

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData,
                redirect: 'follow'
            });

            console.log('📨 Статус ответа:', response.status);

            const text = await response.text();
            console.log('📄 Текст ответа:', text);

            let result;
            try {
                result = JSON.parse(text);
            } catch {
                if (response.ok) {
                    result = { success: true };
                } else {
                    throw new Error('Сервер вернул ошибку: ' + text);
                }
            }

            if (result.success) {
                form.style.display = 'none';
                const container = isEmbedded ? form.parentElement : modal.querySelector('.modal-content');
                const successDiv = document.createElement('div');
                successDiv.className = 'form-success';
                successDiv.innerHTML = `
                    <div class="form-success-icon">✅</div>
                    <div class="form-success-text">Заявка отправлена!</div>
                    <div class="form-success-sub">Сейчас откроется Instagram...</div>
                `;
                container.appendChild(successDiv);

                setTimeout(() => {
                    window.location.href = 'https://www.instagram.com/natamirmat';
                }, 2000);
                return true;
            } else {
                alert(result.message || 'Ошибка отправки. Попробуйте позже.');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
                return false;
            }
        } catch (err) {
            console.error('❌ Ошибка при отправке:', err);
            alert('Не удалось отправить заявку. Проверьте консоль (F12) для деталей. \nОшибка: ' + err.message);
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
            return false;
        }
    }

    // Модальная форма
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = bookingForm.querySelector('button[type="submit"]');
            submitForm(bookingForm, btn, false);
        });
    }

    // Встроенная форма (для contacts.html)
    const embeddedForm = document.getElementById('embeddedBookingForm');
    if (embeddedForm) {
        embeddedForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = embeddedForm.querySelector('button[type="submit"]');
            submitForm(embeddedForm, btn, true);
        });
    }

});
