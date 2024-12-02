// NAVBAR MENU HAMBURGESA

const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.overlay');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
});

const navLinks = document.querySelectorAll('.link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
    });
});

overlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
});

// Funcionalidad de tradución

i18next.init({
    lng: 'en',
    debug: true,
    interpolation: {
        escapeValue: false
    },
    resources: {
        en: {
            translation: {
                "about": "About",
                // picantes
                // ternas
                "sponsors": "Sponsors",
                "awards-name": "Golden spice",
                // title
                "subtitle": "Awards to the {{country}} streamer community",
                "more-info": "More info",
            },
        },
        es: {
            translation: {
                "about": "Acerca de",
                // picantes
                // ternas
                "sponsors": "Patrocinadores",
                "awards-name": "Picantito de oro",
                // title
                "subtitle": "Premios a la comunidad de streamers de {{country}}",
                "more-info": "Saber más"
            }
        }
    }
});

document.querySelectorAll('[data-id="about"]').forEach(element => {
    element.innerHTML = i18next.t(element.dataset.id);
});

document.querySelectorAll('[data-id="sponsors"]').forEach(element => {
    element.innerHTML = i18next.t(element.dataset.id);
});

document.querySelectorAll('[data-id="subtitle"]').forEach(element => {
    const translated = i18next.t(element.dataset.id, {
        country: "<span class='argentina'>Argentina</span>"
    });
    element.innerHTML = translated;
});

document.querySelectorAll('[data-id="more-info"]').forEach(element => {
    element.innerHTML = i18next.t(element.dataset.id);
});

document.querySelectorAll('[data-id="sponsors-link"]').forEach(element => {
    element.innerHTML = i18next.t('sponsors') + ' 2023';
});

document.addEventListener('DOMContentLoaded', function() {
    const dropdownTrigger = document.querySelectorAll('.dropdown-trigger');
    const dropdownContent = document.querySelectorAll('.dropdown-content');
    const arrowIcon = document.querySelectorAll('.navbar-arrow-svg');

    dropdownTrigger.forEach((el) => {
        el.addEventListener('click', function(e) {
            dropdownContent.forEach((element) => {
                element.classList.toggle('show');
                arrowIcon.classList.toggle('rotated');
            })
            e.stopPropagation();
        })
    })

    document.addEventListener('click', function(e) {
        if (!dropdownTrigger.contains(e.target)) {
            dropdownContent.classList.remove('show');
            arrowIcon.classList.remove('rotated');
        }
    });

    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const isUSFlag = this.querySelector('img').src.includes('usa');
            const newLanguage = isUSFlag ? 'en' : 'es';

            i18next.changeLanguage(newLanguage, (err, t) => {
                if (err) return console.log('Error changing language', err);

                document.querySelectorAll('[data-id="about"]').forEach(element => {
                    element.innerHTML = t(element.dataset.id);
                });

                document.querySelectorAll('[data-id="sponsors"]').forEach(element => {
                    element.innerHTML = t(element.dataset.id);
                });

                document.querySelectorAll('[data-id="subtitle"]').forEach(element => {
                    const translated = t(element.dataset.id, {
                        country: "<span class='argentina'>Argentina</span>"
                    });
                    element.innerHTML = translated;
                });

                document.querySelectorAll('[data-id="more-info"]').forEach(element => {
                    element.innerHTML = t(element.dataset.id);
                });

                document.querySelectorAll('[data-id="sponsors-link"]').forEach(element => {
                    element.innerHTML = t('sponsors') + ' 2023';
                });
            });

            const selectedFlag = this.querySelector('img').src;
            document.querySelector('.flag-svg').src = selectedFlag;

            dropdownContent.forEach((drop) => {
                drop.classList.remove('show');
            })

            arrowIcon.classList.remove('rotated');
        });
    });
});