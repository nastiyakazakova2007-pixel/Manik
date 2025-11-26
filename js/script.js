// Активация текущей страницы в навигации
document.addEventListener('DOMContentLoaded', function() {
    // Подсветка активной страницы в навигации
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Плавная прокрутка для внутренних ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#top') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Учитываем фиксированную навигацию
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Валидация форм
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Проверка обязательных полей
            const requiredFields = this.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            // Проверка email
            const emailFields = this.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                if (field.value && !isValidEmail(field.value)) {
                    isValid = false;
                    field.classList.add('is-invalid');
                }
            });
            
            // Проверка телефона
            const phoneFields = this.querySelectorAll('input[type="tel"]');
            phoneFields.forEach(field => {
                if (field.value && !isValidPhone(field.value)) {
                    isValid = false;
                    field.classList.add('is-invalid');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showAlert('Пожалуйста, заполните все обязательные поля правильно.', 'danger');
            } else {
                // Для демонстрации - предотвращаем реальную отправку
                e.preventDefault();
                showAlert('Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
                
                // Очистка формы после успешной "отправки"
                setTimeout(() => {
                    form.reset();
                }, 2000);
            }
        });
    });
    
    // Функции валидации
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isValidPhone(phone) {
        const re = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return re.test(phone);
    }
    
    // Функция показа уведомлений
    function showAlert(message, type) {
        // Удаляем существующие алерты
        const existingAlerts = document.querySelectorAll('.custom-alert');
        existingAlerts.forEach(alert => alert.remove());
        
        const alertDiv = document.createElement('div');
        alertDiv.className = `custom-alert alert alert-${type} alert-dismissible fade show position-fixed`;
        alertDiv.style.cssText = `
            top: 100px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
        `;
        
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Автоматическое скрытие через 5 секунд
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
    
    // Анимация появления элементов при скролле
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .gallery-item, .portfolio-item, .review-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Запуск анимации при загрузке и скролле
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Обработка формы отзывов - динамическое обновление рейтинга
    const ratingInputs = document.querySelectorAll('.rating-input input');
    ratingInputs.forEach(input => {
        input.addEventListener('change', function() {
            const labels = this.parentElement.querySelectorAll('label');
            labels.forEach(label => {
                label.style.color = '#ddd';
            });
            
            // Подсветка выбранных звезд
            let current = this;
            while (current) {
                const label = current.nextElementSibling;
                if (label && label.tagName === 'LABEL') {
                    label.style.color = '#ffc107';
                }
                current = current.previousElementSibling;
            }
        });
    });
    
    // Инициализация рейтинга при загрузке
    ratingInputs.forEach(input => {
        if (input.checked) {
            input.dispatchEvent(new Event('change'));
        }
    });
    
    // Обработка даты в форме записи - запрет на прошедшие даты
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Динамическое обновление стоимости в форме записи
    const serviceSelect = document.getElementById('service-type');
    const nailCountInput = document.getElementById('nail-count');
    
    if (serviceSelect && nailCountInput) {
        const updatePriceEstimate = function() {
            // Здесь можно добавить логику расчета стоимости
            console.log('Service:', serviceSelect.value, 'Nail count:', nailCountInput.value);
        };
        
        serviceSelect.addEventListener('change', updatePriceEstimate);
        nailCountInput.addEventListener('input', updatePriceEstimate);
    }
});

// Дополнительные функции для сайта
// Загрузка дополнительных элементов портфолио
function loadMorePortfolioItems() {
    // Эта функция уже реализована в portfolio.html
    console.log('Load more portfolio items function is called from portfolio.html');
}

// Инициализация карты (заглушка)
function initMap() {
    console.log('Map initialization would go here');
    // В реальном проекте здесь был бы код для Google Maps или другой карты
}

    // Плавная прокрутка для внутренних ссылок и кнопки "Наверх"
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#top') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Показ/скрытие кнопки "Наверх"
    const backToTopButton = document.createElement('a');
    backToTopButton.href = '#top';
    backToTopButton.className = 'back-to-top btn btn-primary';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });