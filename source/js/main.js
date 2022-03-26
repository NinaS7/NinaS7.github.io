import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav__toggle');
const anchors = document.querySelectorAll('.scroll-to');

window.addEventListener('DOMContentLoaded', () => {

  nav.classList.remove('nav--nojs');

  navToggle.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (nav.classList.contains('nav--closed')) {
      nav.classList.remove('nav--closed');
      nav.classList.add('nav--opened');
    } else {
      nav.classList.add('nav--closed');
      nav.classList.remove('nav--opened');
    }
  });

  iosVhFix();

  window.addEventListener('load', () => {

    for (let anchor of anchors) {
      anchor.addEventListener('click', function (evt) {
        evt.preventDefault();
        const blockID = anchor.getAttribute('href');
        document.querySelector(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }

    initModals();
  });
});

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✔️

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используейтся matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
