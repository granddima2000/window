const sliders = (slides, dir, prev, next) => {
    let slideIndex = 1,
        paused = false;

    const items = document.querySelectorAll(slides);
          
    function showSlides(n) {
        if (n > items.length) {
            slideIndex = 1;
        } else if (n < 1) {
            slideIndex = items.length;
        }

        items.forEach(item => {
            item.classList.add('animated');
            item.style.display = 'none';
        });

        items[slideIndex - 1].style.display = 'block';
        
    }

    showSlides(slideIndex);

    function plusSLides(n) {
        showSlides(slideIndex += n);
    }

    try { 
        const prevBtn = document.querySelector(prev),
              nextBtn = document.querySelector(next);
        prevBtn.addEventListener('click', () => {
            plusSLides(-1);
            items[slideIndex - 1].classList.remove('fadeInLeftBig');
            items[slideIndex - 1].classList.add('fadeInRightBig');
        });

        nextBtn.addEventListener('click', () => {
            plusSLides(1);
            items[slideIndex - 1].classList.add('fadeInLeftBig');
            items[slideIndex - 1].classList.remove('fadeInRightBig');
        });
    } catch(e) {}
    
    function activateAnimation() {
        if (dir === 'vertical') {
            paused = setInterval(function() {
                plusSLides(1);
                items[slideIndex - 1].classList.add('slideInDown');
            }, 3000);
        } else {
            paused = setInterval(function() {
                plusSLides(1);
                items[slideIndex - 1].classList.remove('slideInRight');
                items[slideIndex - 1].classList.add('slideInLeft');
            }, 3000);  
        }
    }
    activateAnimation();
    // Если наводит пользователь мышкой, то интервал сбрасывается
    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });
    // Если убирает пользователь мышку, то интервал запускается вновь
    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
    });
}
export default sliders;

