const secondElement = document.getElementById('element-2');
const thirdElement = document.querySelector('.element-3');

let secondElementChanged = false;
let thirdElementChanged = false;

secondElement.addEventListener('click', () => {
    if (!secondElementChanged) {
        secondElement.style.backgroundColor = 'blue';
        secondElement.style.color = 'white';
    } else {
        secondElement.style.backgroundColor = 'yellow';
        secondElement.style.color = 'black';
    }

    secondElementChanged = !secondElementChanged;
});

thirdElement.addEventListener('click', () => {
    if (!thirdElementChanged) {
        thirdElement.style.backgroundColor = 'lime';
        thirdElement.style.color = 'black';
    } else {
        thirdElement.style.backgroundColor = 'purple';
        thirdElement.style.color = 'white';
    }

    thirdElementChanged = !thirdElementChanged;
});

const imageContainer = document.getElementById('added-image-container');
const addButton = document.getElementById('add-image');
const increaseButton = document.getElementById('increase-image');
const decreaseButton = document.getElementById('decrease-image');
const deleteButton = document.getElementById('delete-image');

const imageWidthStep = 50;
const minimumImageWidth = 100;

function getAddedImage() {
    return document.getElementById('added-image');
}

addButton.addEventListener('click', () => {
    if (getAddedImage()) {
        return;
    }

    const image = document.createElement('img');
    image.id = 'added-image';
    image.className = 'city-image';
    image.src = 'images/botanical-garden.png';
    image.alt = 'Додане зображення Національного ботанічного саду імені М. М. Гришка у Києві';
    image.width = 900;

    imageContainer.appendChild(image);
});

increaseButton.addEventListener('click', () => {
    const image = getAddedImage();

    if (image) {
        image.width += imageWidthStep;
    }
});

decreaseButton.addEventListener('click', () => {
    const image = getAddedImage();

    if (image) {
        image.width = Math.max(minimumImageWidth, image.width - imageWidthStep);
    }
});

deleteButton.addEventListener('click', () => {
    const image = getAddedImage();

    if (image) {
        image.remove();
    }
});