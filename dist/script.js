/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/modals.js":
/*!**********************************!*\
  !*** ./src/js/modules/modals.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const modals = () => {
  let btnPressed = false;
  let modalTimer;
  function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
    // closeClickOverlvay = true Если мы не будем передавать аргумент, то наше модальное окно будет закрываться при клике на подложку
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll('[data-modal]'),
      // Закрываем все ненужные модальные окна
      scroll = calcScroll(),
      gift = document.querySelector('.fixed-gift');
    trigger.forEach(item => {
      // Обрабатываем псевдомассив и навешиваем на каждый обработчик события
      item.addEventListener('click', e => {
        if (e.target) {
          // Если будет существовать этот элемент на который кликнул пользователь
          e.preventDefault();
        }
        btnPressed = true;
        if (destroy) {
          // Удаляем элемент gift
          item.remove();
        }
        windows.forEach(item => {
          item.style.display = 'none';
          item.classList.add('animated', 'fadeIn');
        }); //при нажатии на триггер все остальные мод окна закрываются

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // не позволяет листать страницу в модальном окне
        document.body.style.marginRight = `${scroll}px`;
        resetModalTimer();
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
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        //closeClickOverlay при наж на подложку она не закр
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
    modalTimer = setTimeout(function () {
      let display;
      document.querySelectorAll('[data-modal]').forEach(item => {
        if (getComputedStyle(item).display !== 'none') {
          display = 'block';
        }
      });
      if (!display) {
        // Если не показывается ни одно модальное окно, то...
        document.querySelector(selector).style.display = 'block';
        document.body.style.overflow = 'hidden';
        let scroll = calcScroll();
        document.body.style.marginRight = `${scroll}px`;
      }
    }, time);
  }
  //функция, ктр будет подсчитывать расстояние скролла в px
  function calcScroll() {
    // Избегаем дерганья экрана при открытии модалки
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
      if (!btnPressed && window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modals);

/***/ }),

/***/ "./src/js/modules/sliders.js":
/*!***********************************!*\
  !*** ./src/js/modules/sliders.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
  } catch (e) {}
  function activateAnimation() {
    if (dir === 'vertical') {
      paused = setInterval(function () {
        plusSLides(1);
        items[slideIndex - 1].classList.add('slideInDown');
      }, 3000);
    } else {
      paused = setInterval(function () {
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
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sliders);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/modals */ "./src/js/modules/modals.js");
/* harmony import */ var _modules_sliders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/sliders */ "./src/js/modules/sliders.js");


window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  (0,_modules_modals__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_1__["default"])('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
  (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_1__["default"])('.main-slider-item', 'vertical');
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map