'use strict';
window.addEventListener('DOMContentLoaded', () => {
    
// Табы: 
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() { // функция, которая скрывает табы
        tabsContent.forEach(item => { 
            item.style.display = 'none'; // скрываем весь контент
        });
        tabs.forEach(item => { // удаляем активный в списке 
            item.classList.remove('tabheader__item_active');
        });
    }         
                           // i = 0 - делаем первый элем. дефолтным
    function showTabContent(i = 0) { // функ. которая показывает активный контент и табс
        tabsContent[i].style.display = 'block'; // добавляем контент под i номером
        tabs[i].classList.add('tabheader__item_active'); // делаем активномы таб под i номером
    }
    hideTabContent();
    showTabContent();
    // теперь нам нужно создать событие, чтобы по клику у нас менялся контент и активный таб
    tabsParent.addEventListener('click', (event) => {
        const target = event.target; // упростили название
        // если область куда мы кликнули tabheader__item(таб), то выполняется след.действия
        if (target && target.classList.contains('tabheader__item')) { 
            tabs.forEach((item, i) => { // перебираем табы и сравниваем с тем на который кликнули 
                if (target == item) {   // если совпадает, то мы все скрываем и показываем с i
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

// timer:
    const deadline = '2022-07-10';
    // задача функции получить разницу 
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date()); // разница будет в милляхсекундах
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 *24));
            hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((t / 1000 / 60) % 60);
            seconds = Math.floor((t / 1000 ) % 60);
        }
        return {'total': t, days, hours, minutes, seconds};
    }
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    function setClock(selector, endtime) { // задача функции вернуть разницу  в html код 
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        updateClock();
        function updateClock() { // обновляет время 
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadline);

// Modal - окно:
    const modalTrigger = document.querySelectorAll('[data-modal]'), //кнопки которые вызывают мод.окно
          modalCloseBtn = document.querySelector('[data-close]'), // крестик который закрывает мод.окно
          modalBox = document.querySelector('.modal');

    function openModal() {
        modalBox.classList.add('show');
        modalBox.classList.remove('hide');
        document.body.style.overflow = 'hidden'; // запрещаем скролить(за модальным окном)
        clearInterval(modalTimerId); // отключам таймер, если клиент уже сам окрыл мод.окно
    }

    modalTrigger.forEach(btn => { // создаем перебор, тк у нас массив с кнопками
        btn.addEventListener('click', openModal); // событие открывает моб.окно
    });

    function closeModal() {
        modalBox.classList.add('hide');
        modalBox.classList.remove('show');
        document.body.style.overflow = ''; // разрешаем скролить подефолту
    }

    modalCloseBtn.addEventListener('click', closeModal); // событие закрывает мод.окно 

    modalBox.addEventListener('click', (e) => { // если мы нажмем не на мод.окно, оно закроется
        if (e.target == modalBox) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => { // чтобы мод.окно закрывалась с "esc"
        if (e.code === "Escape" && modalBox.classList.contains('show')) { 
            closeModal();    //чтобы не всегда срабатовала, а когда открыто(show) мод.окно
        }
    });
    
    // если нужно, чтобы мод.окно срабатывало спустя какое-то врмея на сайте:
    const modalTimerId = setTimeout(openModal, 1000000);

    function showModalByScroll() { // чтобы срабатыволо, когда дойдет до конца скрола 
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll); // и больше не появлялась 
        }
    }
    window.addEventListener('scroll', showModalByScroll);

// Используем class для карточек:
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt; // если img не загрузиться, альтернативный текст какой-то
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector); // куда я буду пушить данный блок
            this.transfer = 27; // это валюта грн, тк данные приходят в доллорах
            this.changeToUAH(); 
        }

        changeToUAH() { // метод, который делает валюту в грн
            this.price = this.price * this.transfer; 
        }

        render() { // метод, который позволяет как раз верстку запушить уже с нашими данными
            const element = document.createElement('div'); //создаем див блок куда будем засовыйвать наш код

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element); //чтобы наш новосозданный объект поместили в родитель
        }
    }
    // теперь нам надо вызвать все, что сверху
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container"
    ).render();

    
});