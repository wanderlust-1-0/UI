(() => {
  const nav = document.getElementsByTagName('nav')[0];
  document.getElementsByClassName('menu-btn')[0].addEventListener('click', () => {
    console.log(nav);

    nav.classList.toggle('menu--open');
  });
})();
