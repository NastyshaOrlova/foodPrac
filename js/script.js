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
    }                                // i = 0 - делаем первый элем. дефолтным
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

});