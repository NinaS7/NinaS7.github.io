import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {checkerOnClickLink, checkerOffClickLink} from './cruises/card';

const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav__toggle');
const anchors = document.querySelectorAll('.scroll-to');
const navWrapper = document.querySelector('.nav__wrapper');
const cruisesCards = document.querySelectorAll('cruises li');
const cruisesLink = document.querySelector('cruises__link');

window.addEventListener('DOMContentLoaded', () => {

  iosVhFix();

  nav.classList.remove('nav--nojs');
  nav.classList.add('nav--closed');

  const getscroll = () => {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseFloat(scrollY || '0') * -1);
  };

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
        getscroll();
      });

    } else {
      nav.classList.add('nav--closed');
      nav.classList.remove('nav--opened');
      getscroll();
    }
  });

  window.addEventListener('load', () => {
    initModals();

    for (let anchor of anchors) {
      anchor.addEventListener('click', function (evt) {
        evt.preventDefault();
        getscroll();
        nav.classList.remove('nav--opened');
        nav.classList.add('nav--closed');
        const blockID = anchor.getAttribute('href');
        document.querySelector(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }

    for (let cruisesCard of cruisesCards) {
      cruisesCard.addEventListener('click', function (evt) {
        if (cruisesLink) {
          evt.preventDefault();
          return;
        }
      });
    }

    checkerOnClickLink();
    checkerOffClickLink();

  });
});
