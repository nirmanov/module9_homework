const inputPage = document.getElementById("page");
const inputLimit = document.getElementById("limit");
const submitButton = document.querySelector("button");
const outputSpan = document.querySelector("span");
const photosContainer = document.querySelector(".photo-wrapper");

if (loadPhotosFromLocalStorage())
  write("Загружены последние просмотренные фото.");

submitButton.addEventListener("click", submitButtonHandle);

function submitButtonHandle() {
  const page = inputPage.value;
  const limit = inputLimit.value;

  if ((page < 1 || page > 10 || isNaN(page)) || (limit < 1 || limit > 10 || isNaN(limit))) {
    write("Номер страницы и лимит вне диапазона от 1 до 10.");
    return;
  } else if ((page < 1 || page > 10 || isNaN(page))) {
    write("Номер страницы вне диапазона от 1 до 10.");
    return;
  } else if ((limit < 1 || limit > 10 || isNaN(limit))) {
    write("Лимит вне диапазона от 1 до 10.");
    return;
  } write("Загружаю фото...");
  console.log(page);
  console.log(limit);
  fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
    .then((response) => response.json())
    .then((json) => {
      loadPhotos(json);
      savePhotosToLocalStorage();
      write("Фото загружено.");
    })
    .catch((reason) => {
      write("Ошибка: " + reason);
    });
}

function write(text) {
  outputSpan.innerHTML = text;
}


function loadPhotos(apiData) {
  let cards = String();

  apiData.forEach(item => {

    const cardBlock = `<img
    src="${item.download_url}"
  />`;
    cards += cardBlock;

  });
  photosContainer.innerHTML = cards;

}

function savePhotosToLocalStorage() {
  localStorage.setItem("save_photos", photosContainer.innerHTML);
}

function loadPhotosFromLocalStorage() {
  photosContainer.innerHTML = localStorage.getItem("save_photos");
  return  photosContainer.innerHTML.length > 0;
}