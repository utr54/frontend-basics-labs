const TASK1_VARIANT = 6;
const TASK2_VARIANT = 1;
const TABLE_SIZE = 6;

const patterns = {
  fullName: /^[A-Za-zА-Яа-яІіЇїЄєҐґ]{6} [A-Za-zА-Яа-яІіЇїЄєҐґ]\.[A-Za-zА-Яа-яІіЇїЄєҐґ]\.$/u,
  address: /^м\. \d{6}$/u,
  email: /^[a-z]{6}@[a-z]{5}\.com$/,
  telegram: /^@[A-Za-zА-Яа-яІіЇїЄєҐґ]_[A-Za-zА-Яа-яІіЇїЄєҐґ]{5}$/u
};

function isValidDate(value) {
  const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) {
    return false;
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);

  return date.getFullYear() === year
    && date.getMonth() === month - 1
    && date.getDate() === day;
}

function validateField(fieldName, value) {
  if (fieldName === "birthDate") {
    return isValidDate(value);
  }

  return patterns[fieldName].test(value);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function openResultWindow(data) {
  const resultWindow = window.open("", "lab5Result", "width=520,height=420");

  if (!resultWindow) {
    alert("Браузер заблокував окреме вікно. Дозвольте спливаючі вікна для цієї сторінки.");
    return;
  }

  resultWindow.document.open();
  resultWindow.document.write(`
    <!DOCTYPE html>
    <html lang="uk">
    <head>
      <meta charset="UTF-8">
      <title>Результат перевірки</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 24px; line-height: 1.5; }
        h1 { font-size: 24px; }
        dt { margin-top: 12px; font-weight: bold; }
        dd { margin-left: 0; }
      </style>
    </head>
    <body>
      <h1>Введені дані</h1>
      <dl>
        <dt>ПІБ</dt><dd>${escapeHtml(data.fullName)}</dd>
        <dt>Дата народження</dt><dd>${escapeHtml(data.birthDate)}</dd>
        <dt>Адреса</dt><dd>${escapeHtml(data.address)}</dd>
        <dt>E-mail</dt><dd>${escapeHtml(data.email)}</dd>
        <dt>Telegram</dt><dd>${escapeHtml(data.telegram)}</dd>
      </dl>
    </body>
    </html>
  `);
  resultWindow.document.close();
}

const form = document.getElementById("validationForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = {
    fullName: document.getElementById("fullName").value.trim(),
    birthDate: document.getElementById("birthDate").value.trim(),
    address: document.getElementById("address").value.trim(),
    email: document.getElementById("email").value.trim(),
    telegram: document.getElementById("telegram").value.trim()
  };

  let isFormValid = true;

  Object.entries(data).forEach(([fieldName, value]) => {
    const row = document.querySelector(`[data-field="${fieldName}"]`);
    const isFieldValid = validateField(fieldName, value);

    row.classList.toggle("invalid", !isFieldValid);

    if (!isFieldValid) {
      isFormValid = false;
    }
  });

  if (isFormValid) {
    openResultWindow(data);
  }
});

function getRandomColor() {
  const value = Math.floor(Math.random() * 0x1000000);
  return `#${value.toString(16).padStart(6, "0")}`;
}

function createEventTable() {
  const tableBody = document.querySelector("#eventTable tbody");
  let number = 1;

  for (let rowIndex = 0; rowIndex < TABLE_SIZE; rowIndex += 1) {
    const row = document.createElement("tr");

    for (let columnIndex = 0; columnIndex < TABLE_SIZE; columnIndex += 1) {
      const cell = document.createElement("td");
      cell.textContent = number;
      cell.dataset.row = rowIndex;
      cell.dataset.column = columnIndex;

      if (number === TASK2_VARIANT) {
        cell.classList.add("variant-cell");
      }

      row.appendChild(cell);
      number += 1;
    }

    tableBody.appendChild(row);
  }
}

function addVariantCellEvents() {
  const variantCell = document.querySelector(".variant-cell");
  const colorPicker = document.getElementById("colorPicker");

  variantCell.addEventListener("mouseenter", () => {
    variantCell.style.backgroundColor = getRandomColor();
  });

  variantCell.addEventListener("click", () => {
    variantCell.style.backgroundColor = colorPicker.value;
  });

  variantCell.addEventListener("dblclick", () => {
    const rowIndex = Number(variantCell.dataset.row);
    const rowCells = document.querySelectorAll(`#eventTable tr:nth-child(${rowIndex + 1}) td`);

    rowCells.forEach((cell) => {
      cell.style.backgroundColor = colorPicker.value;
    });
  });
}

createEventTable();
addVariantCellEvents();
