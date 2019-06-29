(() => {
  function rateLimitedFunctionFactory({ sideEffect, triggeredWhileLockedEffect, timeout = 300 }) {
    let locked = false;

    return () => {
      if (!locked) {
        locked = true;
        setTimeout(() => {
          locked = false;
          sideEffect();
        }, timeout);
      } else if (triggeredWhileLockedEffect) {
        triggeredWhileLockedEffect();
      }
    };
  }

  function newMenuButton({ menuBtnElement }) {
    const _nav = document.querySelector('nav');
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
    });

    menuBtnElement.addEventListener('click', toggleNav);
    window.addEventListener('resize', conditionallyCloseMenu);
  }


  newMenuButton({ menuBtnElement: document.querySelector('.menu-btn') });
})();
