window.addEventListener('DOMContentLoaded', () => {
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


});