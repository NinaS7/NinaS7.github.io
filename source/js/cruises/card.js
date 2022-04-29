const cruises = document.querySelectorAll('.cruise');
const breakpoint = window.matchMedia('(max-width:1023px)');
const desktop = window.matchMedia('(min-width:1024px)');

let countClick = 0;

const onClick = (evt) => {
  if (countClick === 0) {
    evt.preventDefault();
    ++countClick;
  } else if (countClick === 1 && evt.target.classList.contains('cruises__link')) {
    countClick = 0;
  }
};

const onFocusListener = (item) => {
  item.addEventListener('click', onClick);
};

const onFocusCard = () => {
  cruises.forEach((item) => {
    item.addEventListener('focus', onFocusListener(item));
  });
};

const offClickCard = () => {
  cruises.forEach((item) => {
    item.removeEventListener('focus', onFocusListener(item));
    item.removeEventListener('click', onClick);
  });
};

const checkerOnClickLink = () => {
  if (breakpoint.matches) {
    countClick = 0;
    onFocusCard();
  }
};

const checkerOffClickLink = () => {
  if (desktop.matches) {
    offClickCard();
  }
};

breakpoint.addListener(checkerOnClickLink);
desktop.addListener(checkerOffClickLink);

export {checkerOnClickLink, checkerOffClickLink};
