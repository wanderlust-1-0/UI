(() => {
  function newDropdown({ _element }) {
    const _button = _element.querySelector('.dropdown-button');
    const _content = _element.querySelector('.dropdown-content');

    const toggleContent = () => {
      _content.classList.toggle('dropdown-hidden');
    };

    _button.addEventListener('click', toggleContent);
  }
  document.querySelectorAll('.dropdown').forEach(dropdown => newDropdown({ _element: dropdown }));
})();
