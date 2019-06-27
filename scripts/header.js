(() => {
  function newMenuButton({ menuBtnElement }) {
    const _nav = document.getElementsByTagName('nav')[0];
    const _timeout = 300;
    const _maxMobileWidth = 500;
    let _locked = false;

    const toggleNav = () => {
      _nav.classList.toggle('menu--open');
    };

    const closeNavIfNotInMobileView = () => {
      if (!_locked) {
        _locked = true;
        if (parseInt(window.innerWidth, 10) > _maxMobileWidth) {
          _nav.classList.remove('menu--open');
        }
        setTimeout(() => {
          _locked = false;
        }, _timeout);
      }
    };

    menuBtnElement.addEventListener('click', toggleNav);
    window.addEventListener('resize', closeNavIfNotInMobileView);
  }

  newMenuButton({ menuBtnElement: document.querySelector('.menu-btn') });
})();
