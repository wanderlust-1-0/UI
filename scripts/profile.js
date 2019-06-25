class Profile {
    constructor(element){
        this.element = element;
        this.data = this.element.dataset.bio;
        this.bio = this.element.bio;
        this.bioInfo = document.querySelector(`.bio[data-bio='${this.data}']`);
        this.image = this.element.querySelector('img');
        this.image.addEventListener('click', () => {
            if(parseInt(window.innerWidth) <= 500)
            {this.bioToggleMobile()}});
    }

    bioToggleMobile() {
        const bios = document.querySelectorAll('.bio');
        bios.forEach(para => para.classList.remove('bio-toggle'));
        this.bioInfo.classList.add('bio-toggle');
        console.log(window.innerWidth);
    }
}
















const profiles = document.querySelectorAll('.profile');
profiles.forEach(profile => new Profile(profile));