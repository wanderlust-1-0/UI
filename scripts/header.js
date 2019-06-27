(() => {
  function newMenuButton({ menuBtnElement }) {
    const nav = document.getElementsByTagName('nav')[0];
    const timeout = 300;
    const maxMobileWidth = 499;
    let locked = false;

    const toggleNav = () => {
      nav.classList.toggle('menu--open');
    };

    const closeNavIfNotInMobileView = () => {
      if (!locked) {
        locked = true;
        if (parseInt(window.innerWidth, 10) > maxMobileWidth) {
          nav.classList.remove('menu--open');
        }
        setTimeout(() => {
          locked = false;
        }, timeout);
      }
    };

    menuBtnElement.addEventListener('click', toggleNav);
    window.addEventListener('resize', closeNavIfNotInMobileView);
  }


  newMenuButton({ menuBtnElement: document.querySelector('.menu-btn') });
})();
