const API_URL = "https://randomuser.me/api/";

const loadButton = document.getElementById("load-user");
const statusMessage = document.getElementById("status");
const userCard = document.getElementById("user-card");

const userPicture = document.getElementById("user-picture");
const userName = document.getElementById("user-name");
const userCell = document.getElementById("user-cell");
const userCity = document.getElementById("user-city");
const userCountry = document.getElementById("user-country");

function displayUser(user) {
    const fullName = `${user.name.first} ${user.name.last}`;

    userPicture.src = user.picture.large;
    userPicture.alt = `Фото користувача ${fullName}`;

    userName.textContent = fullName;
    userCell.textContent = user.cell;
    userCity.textContent = user.location.city;
    userCountry.textContent = user.location.country;

    userCard.hidden = false;
}

function loadUser() {
    loadButton.disabled = true;
    statusMessage.textContent = "Завантаження даних...";
    userCard.hidden = true;

    fetch(API_URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            return response.json();
        })
        .then((data) => {
            const user = data.results[0];

            if (!user) {
                throw new Error("API не повернув дані користувача.");
            }

            displayUser(user);
            statusMessage.textContent = "Дані успішно отримано.";
        })
        .catch((error) => {
            statusMessage.textContent =
                "Не вдалося отримати дані. Спробуйте ще раз.";

            console.error(error);
        })
        .finally(() => {
            loadButton.disabled = false;
        });
}

loadButton.addEventListener("click", loadUser);