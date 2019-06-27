var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}



class Profile {
    constructor(element){
        this.element = element;
        this.data = this.element.dataset.bio;
        this.bio = this.element.bio;
        this.bioInfo = document.querySelector(`.bio[data-bio='${this.data}']`);
        this.close = this.bioInfo.querySelector('span');
        this.image = this.element.querySelector('img');

        this.image.addEventListener('click', () => {
            if(parseInt(window.innerWidth) <= 500)
            {this.bioToggleMobile()}
        else {
            modal.style.display = "block";
            let modalH4 = document.querySelector('.modal-content h4');
            let modalImg = document.querySelector('.modal-content img');
            let modalTitle = document.querySelector('.modal-content .modal-title');
            let modalBio = document.querySelector('.modal-content .modal-bio');

            modalImg.src = this.image.src;
            modalH4.textContent = this.element.querySelector('h4').textContent;
            modalTitle.textContent = this.element.querySelector('p').textContent;
            modalBio.textContent = this.bioInfo.querySelector('.bio-para').textContent
        }});

        this.close.addEventListener('click',  () => {
          this.bioInfo.classList.remove('bio-toggle');
        });

        (() => {
          let lock = false;

          window.addEventListener('resize', () => {
            const maxMobileWidth = 500;
            if(!lock) {
              lock = true;
              setTimeout(() => lock = false, 250);
              if(parseInt(window.innerWidth) > maxMobileWidth) {
                this.bioInfo.classList.remove('bio-toggle');

              }
            }
          })

        })();

        (() => {
          let modalLock = false;

          window.addEventListener('resize', () => {
            const minTabletWidth = 500;
            if(!modalLock) {
              modalLock = true;
              setTimeout(() => modalLock = false, 250);
              if(parseInt(window.innerWidth) <= minTabletWidth) {
                modal.style.display = 'none';

              }
            }
          })

        })();

    }



    bioToggleMobile() {
        let bios = document.querySelectorAll('.bio');
        bios = Array.from(bios);
        let bioToggleOn = bios.filter(bio => bio.classList.contains('bio-toggle'));
        bioToggleOn.forEach(bio => bio.classList.remove('bio-toggle'));
        this.bioInfo.classList.add('bio-toggle');
    }
}

const profiles = document.querySelectorAll('.profile');
profiles.forEach(profile => new Profile(profile));