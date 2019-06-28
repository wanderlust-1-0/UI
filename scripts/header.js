(() => {
  function rateLimitedFunctionFactory({ sideEffect, timeout = 300 }) {
    let locked = false;
    let firedWhileLocked = false;

    return () => {
      if (!locked) {
        locked = true;
        sideEffect();
        setTimeout(() => {
          locked = false;
          if (firedWhileLocked) {
            firedWhileLocked = false;
            sideEffect();
          }
        }, timeout);
      } else {
        firedWhileLocked = true;
      }
    };
  }

  function newMenuButton({ menuBtnElement }) {
    const _nav = document.getElementsByTagName('nav')[0];
    const _maxMobileWidth = 500;

    const toggleNav = () => {
      _nav.classList.toggle('menu--open');
    };


    const conditionallyCloseMenu = rateLimitedFunctionFactory({
      sideEffect: () => {
        if (parseInt(window.innerWidth, 10) > _maxMobileWidth) {
          _nav.classList.remove('menu--open');
        }
      },
      // timeout: 250, this line is where you can optionally change the default timeout duration
    });

    menuBtnElement.addEventListener('click', toggleNav);
    window.addEventListener('resize', conditionallyCloseMenu);
  }

  newMenuButton({ menuBtnElement: document.querySelector('.menu-btn') });
})();
