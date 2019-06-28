(() => {
  function newMenuButton({ menuBtnElement }) {
    const _nav = document.getElementsByTagName('nav')[0];
    const _timeout = 300;
    const _maxMobileWidth = 500;

    const toggleNav = () => {
      _nav.classList.toggle('menu--open');
    };

    (() => {
      let locked = false;
      let firedWhileLocked = false;

      window.addEventListener('resize', () => {
        if (!locked) {
          locked = true;
          if (parseInt(window.innerWidth, 10) > _maxMobileWidth) {
            _nav.classList.remove('menu--open');
          }
          setTimeout(() => {
            locked = false;
            if (firedWhileLocked && parseInt(window.innerWidth, 10) > _maxMobileWidth) {
              firedWhileLocked = false;
              _nav.classList.remove('menu--open');
            }
          }, _timeout);
        } else {
          firedWhileLocked = true;
        }
      });
    })();

    menuBtnElement.addEventListener('click', toggleNav);
  }

  newMenuButton({ menuBtnElement: document.querySelector('.menu-btn') });
})();
