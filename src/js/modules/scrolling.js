const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);
    window.addEventListener('scroll', () => { 
        if (document.documentElement.scrollTop > 1650) { //если прокручено 1650, то up плавно появляется
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {  //если меньше 1650, то up плавно исчезает
            upElem.classList.remove('fadeIn');
            upElem.classList.add('fadeOut');
            
        }
    });
    
    let links = document.querySelectorAll('[href^="#"]'),                               //доступ по всем ссылкам, ктр начинаются с #
        speed = 0.3;                                                       

    links.forEach(link => {
        link.addEventListener('click', function(event){
            event.preventDefault();                                                  //отмена перехода на ссылке

            let heightTop = document.documentElement.scrollTop,                      //доступ к эл., ктр показывает пролистаное
                hash = this.hash,                                                    //текущий #
                toBlock = document.querySelector(hash).getBoundingClientRect().top,  //getBoundingClientRect-метод позвол.получить доступ к св-ву top и возвр.его размер
                start = null;                                                        //стартовая позиция пока null
            
            requestAnimationFrame(step);    

            function step(time){                     //аргумент time передается по умолчанию
                if(start === null){                  //если анимация запускается первый раз   
                    start = time;                   
                }                                   //это условие выполняется 1 раз, тк в сл. раз в start будет уже time

                let progress = time - start,                                                          //time будет каждый раз приходить новое время, start - только вначале
                    r = (toBlock < 0 ? Math.max(heightTop - progress/speed, heightTop + toBlock):     //r- отвечает за кол-во рх на ктр нужно пролистать в продолжении анимац. и в какую сторону  
                        Math.min(heightTop + progress/speed, heightTop + toBlock));                   //? -если, : - если нет, то    
                                          

                    document.documentElement.scrollTo(0, r);         //scrollTo- скроллинг к определенны координатам, 0 -по Х не двигаемся,r - по Y

                if(r != heightTop + toBlock) {                      //если не пролистано до нужно рх        
                    requestAnimationFrame(step);                    //то анимация продолжается   
                }else{
                    location.hash = hash;                           //лок ссылка (текущий #) и анимация останавливается 
                }
            }
        });
    });   

    // плавный скролл
//     const element = document.documentElement, 
//           body = document.body;

//     const calcScroll = () => {
//         upElem.addEventListener('click', function(event) { //при клике на стрелку; event - нужен, чтобы отменить станд поведение браузера
//             let scrollTop = Math.round(body.scrollTop || element.scrollTop); //сколько пролистано польз. сверху, получаем одно из этих значений
            
//             if (this.hash !== '') { //если данный hash(# часть лок ссылок,ктр отссылат сразу на стр) не равен пустой строке
//                 event.preventDefault(); //то отмен станд.поведение браузера - отссылку на стр

//                 let hashElement = document.querySelector(this.hash), // Элемент к которому мы будем скролить
//                     hashElementTop = 0; // до родителя этого элемента

//                 while (hashElement.offsetParent) { //пока родитель hashElement будет существовать, будет запускаться цикл
//                     hashElementTop += hashElement.offsetTop; //ск. рх ост. до родителя верхней границы от hashElement 
//                     hashElement = hashElement.offsetParent; //перебираем всех родителей, ктр могут быть основой для позиционирован.данного эл.   
//                 } //такой цикл позволяет перебирать всех род-лей и узнать ск. рх нужно отлистать

//                 hashElementTop = Math.round(hashElementTop); //округляем получен.рез-т
//                 smoothScroll(scrollTop, hashElementTop, this.hash);
//             }
//         });
//     };
// //функ. плавного скролла
//     const smoothScroll = (from, to, hash) => {
//         let timeInterval = 1, //интервал через ктр будет производиться анимация
//             prevScrollTop, //предшествующее значение
//             speed; //скорость анимации  
        
//         if (to > from) { //определение движение анимации
//             speed = 30;        //скорость 30, т.е. сверху вниз   
//         } else {
//             speed = -30;
//         }
//         //создаем анимацию
//         let move = setInterval(function() {
//             let scrollTop = Math.round(body.scrollTop || element.scrollTop); //какое значение в текущий момент в переменной пролистано

//             if (prevScrollTop === scrollTop ||   //если предыдущее значение = пролистаному или
//                 (to > from && scrollTop >= to) || 
//                 (to < from && scrollTop <= to)
//             ) {                                 //пролистано до конца
//                 clearInterval(move);
//                 history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash); //замена # на "", hash получаем this.hash
//             } else { //если нет, то настраиваем движение страницы   
//                 body.scrollTop += speed; //в зависимости от знака стр будет двигаться 
//                 element.scrollTop += speed;
//                 prevScrollTop = scrollTop; //будет двигаться пока не долистает до нужного момента
//             }
//         }, timeInterval);
//     };
//     calcScroll();
};
// observer реализация check
export default scrolling;