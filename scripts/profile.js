const modal = document.getElementById('myModal');
const span = document.getElementsByClassName('close')[0];

span.onclick = () => {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

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

class Profile {
  constructor(element) {
    this.element = element;
    this.data = this.element.dataset.bio;
    this.bio = this.element.bio;
    this.bioInfo = document.querySelector(`.bio[data-bio='${this.data}']`);
    this.close = this.bioInfo.querySelector('span');
    this.image = this.element.querySelector('img');

    this.image.addEventListener('click', () => {
      if (parseInt(window.innerWidth, 10) <= 500) {
        this.bioToggleMobile();
      } else {
        modal.style.display = 'block';
        const modalH4 = document.querySelector('.modal-content h4');
        const modalImg = document.querySelector('.modal-content img');
        const modalTitle = document.querySelector('.modal-content .modal-title');
        const modalBio = document.querySelector('.modal-content .modal-bio');

        modalImg.src = this.image.src;
        modalH4.textContent = this.element.querySelector('h4').textContent;
        modalTitle.textContent = this.element.querySelector('p').textContent;
        modalBio.textContent = this.bioInfo.querySelector(
          '.bio-para',
        ).textContent;
      }
    });

    this.close.addEventListener('click', () => {
      this.bioInfo.classList.remove('bio-toggle');
    });

    window.addEventListener('resize', rateLimitedFunctionFactory({
      sideEffect: () => {
        const maxMobileWidth = 500;

        if (parseInt(window.innerWidth, 10) > maxMobileWidth) {
          this.bioInfo.classList.remove('bio-toggle');
        }
      },
    }));

    window.addEventListener('resize', rateLimitedFunctionFactory({
      sideEffect: () => {
        const minTabletWidth = 501;

        if (parseInt(window.innerWidth, 10) < minTabletWidth) {
          modal.style.display = 'none';
        }
      },
    }));
  }

  bioToggleMobile() {
    let bios = document.querySelectorAll('.bio');
    bios = Array.from(bios);
    const bioToggleOn = bios.filter(bio => bio.classList.contains('bio-toggle'));
    bioToggleOn.forEach(bio => bio.classList.remove('bio-toggle'));
    this.bioInfo.classList.add('bio-toggle');
  }
}

const profiles = document.querySelectorAll('.profile');
profiles.forEach(profile => new Profile(profile));
