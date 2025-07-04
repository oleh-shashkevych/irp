document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector('.header');

    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                header.classList.add('fixed');
            } else {
                header.classList.remove('fixed');
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }

    // --- НАЧАЛО: Код для инициализации 3D-слайдера ---
    const evolutionSlider = new Swiper('.evolution-slider', {
        loop: true,
        effect: 'creative',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',

        // Настройки 3D-эффекта
        creativeEffect: {
            prev: {
                shadow: true,
                translate: ['-62%', 0, -150],
            },
            next: {
                shadow: true,
                translate: ['62%', 0, -150],
            },
        },

        // Навигация
        navigation: {
            nextEl: '.evolution .swiper-button-next',
            prevEl: '.evolution .swiper-button-prev',
        },
    });
    // --- КОНЕЦ: Код для инициализации 3D-слайдера ---

    // --- НАЧАЛО: Код для инициализации слайдера новостей ---
    const newsSlider = new Swiper('.news-slider', {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 20, // Расстояние между слайдами
        grabCursor: true,

        // Навигация
        navigation: {
            nextEl: '.news .swiper-button-next',
            prevEl: '.news .swiper-button-prev',
        },

        // Адаптивность
        breakpoints: {
            // когда ширина экрана меньше 768px
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            // когда ширина экрана больше 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            }
        }
    });
    // --- КОНЕЦ: Код для инициализации слайдера новостей ---

    // --- НАЧАЛО: Код для инициализации слайдера галереи ---
    const gallerySlider = new Swiper('.gallery-slider', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        grabCursor: true,

        // Навигация
        navigation: {
            nextEl: '.gallery .swiper-button-next',
            prevEl: '.gallery .swiper-button-prev',
        },
    });
    // --- КОНЕЦ: Код для инициализации слайдера галереи ---

    // --- НАЧАЛО: Код для списка с анимацией ---
    const listItems = document.querySelectorAll('.download__content-list li');

    // Если на странице нет таких элементов, выходим
    if (listItems.length === 0) {
        return;
    }

    let currentIndex = 0;
    let intervalId = null;
    let isUserInteracting = false; // Флаг для отслеживания клика или ховера
    let clickedIndex = -1; // Индекс кликнутого элемента, -1 означает, что клика не было

    // Функция для установки активного класса
    const setActiveItem = (index) => {
        listItems.forEach(item => item.classList.remove('active'));
        if (listItems[index]) {
            listItems[index].classList.add('active');
            currentIndex = index;
        }
    };

    // Функция для запуска таймера
    const startTimer = () => {
        // Запускаем таймер только если не было клика
        if (clickedIndex !== -1) return;

        stopTimer(); // Сначала останавливаем предыдущий таймер, если он есть
        intervalId = setInterval(() => {
            // Если пользователь взаимодействует, не меняем слайд
            if (isUserInteracting) return;

            const nextIndex = (currentIndex + 1) % listItems.length;
            setActiveItem(nextIndex);
        }, 5000); // 5000 мс = 5 секунд
    };

    // Функция для остановки таймера
    const stopTimer = () => {
        clearInterval(intervalId);
    };

    // Добавляем обработчики событий на каждый элемент списка
    listItems.forEach((item, index) => {
        // 1. При наведении мыши
        item.addEventListener('mouseover', () => {
            if (clickedIndex !== -1) return; // Если был клик, ничего не делаем на ховер
            isUserInteracting = true;
            stopTimer();
            setActiveItem(index);
        });

        // 2. Когда мышь уходит
        item.addEventListener('mouseout', () => {
            if (clickedIndex !== -1) return; // Если был клик, таймер не запускаем
            isUserInteracting = false;
            startTimer();
        });

        // 3. При клике
        item.addEventListener('click', () => {
            clickedIndex = index; // Запоминаем, по какому элементу кликнули
            isUserInteracting = true;
            stopTimer();
            setActiveItem(index);
        });
    });

    // Устанавливаем первый элемент активным при загрузке
    setActiveItem(0);
    // Запускаем таймер
    startTimer();
    // --- КОНЕЦ: Код для списка с анимацией ---

    // --- НАЧАЛО: Код для аккордеона ---
    const accordionItems = document.querySelectorAll('.accordion__item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion__item-header');

        header.addEventListener('click', () => {
            // Проверяем, был ли уже открыт текущий элемент
            const wasActive = item.classList.contains('active');

            // Сначала закрываем все элементы
            accordionItems.forEach(i => {
                i.classList.remove('active');
            });

            // Если элемент не был активен, открываем его
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });
    // --- КОНЕЦ: Код для аккордеона ---

    // --- НАЧАЛО: Код для кастомного попапа в галерее ---
    const galleryGrids = document.querySelectorAll('.gallery-grid');
    const popup = document.getElementById('gallery-popup');
    const popupImg = popup.querySelector('.popup__img');
    const popupClose = popup.querySelector('.popup__close');
    const popupOverlay = popup.querySelector('.popup__overlay');

    if (galleryGrids.length > 0 && popup) {
        const openPopup = (imgSrc) => {
            popupImg.setAttribute('src', imgSrc);
            popup.classList.add('active');
            document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
        };

        const closePopup = () => {
            popup.classList.remove('active');
            document.body.style.overflow = ''; // Возвращаем скролл
        };

        galleryGrids.forEach(grid => {
            grid.addEventListener('click', function (event) {
                const link = event.target.closest('.gallery-item');
                if (!link) return;

                event.preventDefault();
                const imageSrc = link.getAttribute('href');
                openPopup(imageSrc);
            });
        });

        // Закрытие по клику на крестик
        popupClose.addEventListener('click', closePopup);

        // Закрытие по клику на оверлей
        popupOverlay.addEventListener('click', closePopup);

        // Закрытие по нажатию на Escape
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && popup.classList.contains('active')) {
                closePopup();
            }
        });
    }
    // --- КОНЕЦ: Код для кастомного попапа в галерее ---

    // --- НАЧАЛО: Код для бургер-меню ---
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    if (burgerMenu && mobileMenu) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            body.classList.toggle('body-no-scroll');
        });
    }
    // --- КОНЕЦ: Код для бургер-меню ---
});