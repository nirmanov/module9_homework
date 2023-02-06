const div = document.getElementById("container");
function useRequest(value, displayResult){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://picsum.photos/v2/list/?limit=${value}`);
    xhr.onload = function() {
        if (xhr.status != 200) {
            console.log("Статус ответа: ", xhr.status);
        } else{
            let apiData = JSON.parse(xhr.response);
            console.log(apiData);
            displayResult(apiData);
        }
    };
    xhr.send();

};
function displayResult(apiData) {
    let cards = '';            
    apiData.forEach(item => {
        const cardBlock = `
        <div class="card">
            <img src="${item.download_url}" class="card-image"/>
        </div>
        `;
        cards = cards + cardBlock;
    });
    div.innerHTML = cards;
}
function readInput() {
    const value = document.querySelector('input').value;
    if (isNaN(value) || value < 1 || value > 10){
        div.innerHTML = 'число вне диапазона от 1 до 10';
    }else{
        useRequest(value, displayResult);
    }
};
const btn = document.querySelector(".btn");
btn.addEventListener("click", readInput);