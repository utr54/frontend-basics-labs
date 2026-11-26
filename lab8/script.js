const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

menuButton.hidden = false;
function setMenu(open) {
    menuButton.setAttribute('aria-expanded', String(open));
}
menuButton.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') === 'false');
});
navigation.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
        setMenu(false);
        const destination = document.querySelector(event.target.hash);
        if (getComputedStyle(menuButton).display !== 'none') {
            destination.focus({ preventScroll: true });
        }
    }
});
document.querySelector('.site-header').addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menuButton.focus();
    }
});

const hero = document.querySelector('.hero');
const heroPhoto = hero.querySelector('.hero-photo');
const heroLabel = document.querySelector('#hero-label');
const heroTitle = document.querySelector('#hero-title');
const slides = [
    {
        image: heroPhoto.getAttribute('src'),
        alt: heroPhoto.alt,
        label: heroLabel.textContent,
        title: heroTitle.textContent
    },
    {
        image: 'assets/images/locksmith-workshop.webp',
        alt: 'Locksmith working at a key-cutting machine',
        label: 'Locks and keys',
        title: 'Lock Repairs and Key Cutting for Everyday Use'
    }
];

let currentSlide = 0;
function changeSlide(direction) {
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    const slide = slides[currentSlide];
    heroPhoto.src = slide.image;
    heroPhoto.alt = slide.alt;
    heroLabel.textContent = slide.label;
    heroTitle.textContent = slide.title;
}

const previousSlide = hero.querySelector('.slide-prev');
const nextSlide = hero.querySelector('.slide-next');
previousSlide.hidden = false;
nextSlide.hidden = false;
previousSlide.addEventListener('click', () => changeSlide(-1));
nextSlide.addEventListener('click', () => changeSlide(1));

const quoteForm = document.querySelector('#quote-form');
const nameInput = document.querySelector('#quote-name');
const phoneInput = document.querySelector('#quote-phone');
const quoteMessage = document.querySelector('#quote-message');

function validateContactFields() {
    nameInput.setCustomValidity(
        nameInput.value && !nameInput.value.trim() ? 'Please enter your name.' : ''
    );

    const phone = phoneInput.value.trim();
    const digitCount = phone.replace(/\D/g, '').length;
    const validPhone = /^\+?[\d\s()-]+$/.test(phone) && digitCount >= 7 && digitCount <= 15;
    phoneInput.setCustomValidity(
        phoneInput.value && !validPhone ? 'Enter a phone number with 7 to 15 digits.' : ''
    );
}

quoteForm.addEventListener('input', () => {
    validateContactFields();
    quoteMessage.textContent = '';
});
quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    validateContactFields();
    if (quoteForm.reportValidity()) {
        quoteForm.reset();
        quoteMessage.textContent = 'Validation passed. This is a school project. No request was sent.';
    }
});
quoteForm.querySelector('button').disabled = false;
