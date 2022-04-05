import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav__toggle');
const anchors = document.querySelectorAll('.scroll-to');
const navWrapper = document.querySelector('.nav__wrapper');

window.addEventListener('DOMContentLoaded', () => {

  nav.classList.remove('nav--nojs');
  nav.classList.add('nav--closed');

  navToggle.addEventListener('click', function (event) {
    event.preventDefault();
    if (nav.classList.contains('nav--closed')) {
      nav.classList.remove('nav--closed');
      nav.classList.add('nav--opened');
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;

      document.addEventListener('click', function (evt) {
        evt.stopPropagation();
        const withinBoundaries = evt.composedPath().includes(navWrapper);
        if (withinBoundaries) {
          return;
        }
        nav.classList.remove('nav--opened');
        nav.classList.add('nav--closed');
      });

    } else {
      nav.classList.add('nav--closed');
      nav.classList.remove('nav--opened');
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseFloat(scrollY || '0') * -1);
    }
  });

  iosVhFix();

  window.addEventListener('load', () => {

    for (let anchor of anchors) {
      anchor.addEventListener('click', function (evt) {
        evt.preventDefault();
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseFloat(scrollY || '0') * -1);
        nav.classList.remove('nav--opened');
        nav.classList.add('nav--closed');
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
