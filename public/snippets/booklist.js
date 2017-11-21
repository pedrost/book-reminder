window.onload = function () {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            renderBooks(http);
        }
    };
    http.open("GET", "http://localhost:3001/books/list", true);
    http.send();
}
function renderBooks(xml) {
    var i;
    var xmlDoc = xml.response;
    var jsonArray = JSON.parse(xmlDoc);
    var books = "";
    const url = "http://localhost:3001/static/uploads/";
    var x = jsonArray.data;
    for (i = 0; i < x.length; i++) {
        const element = x[i];
        books += 
            `<div id="bookElement">
                <img class="card-img-top" id="imageBook" src="${url + element.image}" alt="imageBook">
                <div class="card-block">
                    <h4 class="card-title">${element.name}</h4>
                    <p class="card-text">${element.pages} paginas</p>
                </div>
            </div>`
    }
    document.getElementById("inline").innerHTML = books;
}

function getImage(imagename) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            return http;
        }
    };
    http.open("GET", `http://localhost:3001/static/uploads/${imagename}`, true);
    http.send();
}