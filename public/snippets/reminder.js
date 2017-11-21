window.onload = function () {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            renderOptions(http);
        }
    };
    http.open("GET", "http://localhost:3001/books/list", true);
    http.send();
}
document.addEventListener('DOMContentLoaded', function () {
    if (Notification.permission !== "granted")
        Notification.requestPermission();
});
function renderOptions(xml) {
    var i;
    var xmlDoc = xml.response;
    var jsonArray = JSON.parse(xmlDoc);
    var options = "";
    var x = jsonArray.data;
    for (i = 0; i < x.length; i++) {
        const element = x[i];
        options += `<option> ` +
            element.name +
            "</option>"
    }
    document.getElementById("books").innerHTML = options;
}
function notifyError() {
    var notification = new Notification('Dados Invalidos', {
        icon: 'https://image.flaticon.com/icons/png/128/148/148766.png',
        body: "Parece que voce inseriu algo errado",
    });
}
function notifySuccess() {
    var notification = new Notification('Sucesso!', {
        icon: 'https://image.flaticon.com/icons/png/128/148/148767.png',
        body: "Cadastrado!",
    });
}
function createReminder() {
    const date = document.getElementById('date-value').value;
    const time = document.getElementById('time-value').value;
    const repe = document.getElementById("repeat-value");
    const books = document.getElementById('books');
    const willReapeat = repe.options[repe.selectedIndex].value;
    const selectedBook = books.options[books.selectedIndex].value;

    if (time.length < 4) {
        return notifyError();
    }
    if (willReapeat == 0 && time.length >= 4 && date.length < 9) {
        return notifyError();
    }
    else {
        if (willReapeat != 0) {
            const bookReq = selectedBook;
            const dateReq = willReapeat + " " + time;
            var params = JSON.stringify({ book: bookReq, date: dateReq })
            var req = new XMLHttpRequest();
            req.open("post", "http://localhost:3001/reminders/create", true);
            req.setRequestHeader("Content-type", "application/json; charset=utf-8");
            req.send(params);
            req.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    notifySuccess();
                }
            };
        }
        else {
            const bookReq = selectedBook;
            const dateReq = date + " " + time;
            var params = JSON.stringify({ book: bookReq, date: dateReq })
            var req = new XMLHttpRequest();
            req.open("post", "http://localhost:3001/reminders/create", true);
            req.setRequestHeader("Content-type", "application/json; charset=utf-8");
            req.send(params);
            req.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    notifySuccess();
                }
            };
        }
    }
}

