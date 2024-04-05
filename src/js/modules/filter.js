const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
          items = menu.querySelectorAll('li'),
          btnAll = menu.querySelector('.all'),
          btnLovers = menu.querySelector('.lovers'),
          btnChef = menu.querySelector('.chef'),
          btnGirl = menu.querySelector('.girl'),
          btnGuy = menu.querySelector('.guy'),
          btnGrandmother = menu.querySelector('.grandmother'),
          btnGranddad = menu.querySelector('.granddad'),
          wrapper = document.querySelector('.portfolio-wrapper'),
          markAll = wrapper.querySelectorAll('.all'),
          markGirl = wrapper.querySelectorAll('.girl'),
          markLovers = wrapper.querySelectorAll('.lovers'),
          markChef = wrapper.querySelectorAll('.chef'),
          markGuy = wrapper.querySelectorAll('.guy'),
          no = document.querySelector('.portfolio-no');

    // функция, которая отвечает за фильтрацию элементов
    const typeFilter = (markType) => {
        markAll.forEach(mark => { // Берем все элементы под переменной MarkAll и скрываем их
            mark.style.display = 'none';
            mark.classList.remove('animated', 'fadeIn');
        });

        no.style.display = "none";
        no.classList.remove('animated', 'fadeIn');

        if (markType) { 
            markType.forEach(mark => { // Перебираем 
                mark.style.display = 'block';
                mark.classList.add('animated', 'fadeIn');
            });
        } else { // Если markType у нас окажется false, то мы просто показываем блок с no
            no.style.display = 'block';
            no.classList.add('animated', 'fadeIn');
        }
    };

    function bindBtnEvent(btn, call) {
        btn.addEventListener('click', () => {
            typeFilter(call);
        });
    }
    
    const buttons = [
        { selector: btnAll, action: markAll },
        { selector: btnLovers, action: markLovers },
        { selector: btnChef, action: markChef },
        { selector: btnGuy, action: markGuy },
        { selector: btnGirl, action: markGirl },
        { selector: btnGrandmother, action: undefined},
        { selector: btnGranddad, action: undefined}
    ];

    buttons.forEach(( {selector, action} ) => { // Деструктуризация
        bindBtnEvent(selector, action);
    });


    menu.addEventListener('click', (e) => {
        let target = e.target;

        if (target && target.tagName == 'LI') {
            items.forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');
        }
    });


    
};

export default filter;