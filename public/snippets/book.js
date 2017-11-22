document.addEventListener('DOMContentLoaded', function () {
    if (Notification.permission !== "granted")
        Notification.requestPermission();
});
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
function createBook() {
    const book = document.getElementById('book-name-value');
    const pages = document.getElementById('book-pages-value');
    const image = document.getElementById("picture-value");

    if (! book.value.length || ! pages.value.length || ! image.value.length) {
        return notifyError();
    }

    else {
        const nameReq = book.value;
        const pagesReq = pages.value;
        const imageReq = image.files[0].name;
        var params = JSON.stringify({ name: nameReq, pages: pagesReq, image: imageReq })
        var req = new XMLHttpRequest();

        req.open("post", "http://localhost:3001/books/create", true);
        req.setRequestHeader("Content-type", "application/json; charset=utf-8");
        req.send(params);

        req.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                notifySuccess();
                book.value = null;
                pages.value = null;
                image.files[0].name = null;
            }
        };
        
    }
}