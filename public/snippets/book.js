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
    const image = document.getElementById("picture");

    if (!book.value.length || !pages.value.length) {
        return notifyError();
    }
    else {
        const nameReq = book.value;
        const pagesReq = pages.value;
        const imageReq = image.value;
        var params = JSON.stringify({ name: nameReq, pages: pagesReq, image: imageReq })
        console.log(params);
    }
}