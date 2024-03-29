const modals = () => {
    let btnPressed = false;
    let modalTimer;
    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) { // closeClickOverlvay = true Если мы не будем передавать аргумент, то наше модальное окно будет закрываться при клике на подложку
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'), // Закрываем все ненужные модальные окна
              scroll = calcScroll(),
              gift = document.querySelector('.fixed-gift');

        trigger.forEach(item => { // Обрабатываем псевдомассив и навешиваем на каждый обработчик события
            item.addEventListener('click', (e) => {
                if (e.target) { // Если будет существовать этот элемент на который кликнул пользователь
                    e.preventDefault();
                }

                btnPressed = true;

                if (destroy) { // Удаляем элемент gift
                    item.remove();
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');
                });  //при нажатии на триггер все остальные мод окна закрываются
    
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // не позволяет листать страницу в модальном окне
                document.body.style.marginRight = `${scroll}px`;
                resetModalTimer()
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            }); //при нажатии на Х все остальные мод окна закрываются

            modal.style.display = 'none';
            document.body.style.overflow = '';
            // document.body.classList.remove('modal-open'); // bootstrap специальный класс modal-open
            document.body.style.marginRight = `0px`;
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) { //closeClickOverlay при наж на подложку она не закр
                windows.forEach(item => {
                    item.style.display = 'none';
                }); //при нажатии на подложку все остальные мод окна закрываются

                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
            }
        });
    }

    function showModalByTime(selector, time) {
        modalTimer = setTimeout(function() {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            });
            if (!display) { // Если не показывается ни одно модальное окно, то...
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
                
            }

        }, time);
    }
    //функция, ктр будет подсчитывать расстояние скролла в px
    function calcScroll() { // Избегаем дерганья экрана при открытии модалки
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        
        
        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            if (!btnPressed && (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
                document.querySelector(selector).click();
            }
        });
    }

    function resetModalTimer() {
        clearTimeout(modalTimer);
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    showModalByTime('.popup-consultation', 5000);
    openByScroll('.fixed-gift');
};

export default modals;
