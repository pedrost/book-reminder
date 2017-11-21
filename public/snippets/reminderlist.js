window.onload = function () {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            renderOptions(http);
        }
    };
    http.open("GET", "http://localhost:3001/reminders/list", true);
    http.send();
}
document.addEventListener('DOMContentLoaded', function () {
    if (Notification.permission !== "granted")
        Notification.requestPermission();
});
function notifySuccess() {
    var notification = new Notification('Sucesso!', {
        icon: 'https://image.flaticon.com/icons/png/128/148/148767.png',
        body: "Lembrete Completado!",
    });
}
function renderOptions(xml) {
    var i;
    var xmlDoc = xml.response;
    var jsonArray = JSON.parse(xmlDoc);
    var options = "";
    var x = jsonArray.data;
    for (i = 0; i < x.length; i++) {
        const element = x[i];
        options += 
            `<tr>` +
            `<td>` + element.book + `</td>` +
            `<td>` + element.date + `</td>` + 
            `<td>` + `<input type="checkbox" value="${element._id}" onclick="complete(value)"/>` + `</td>` +             
            `</tr>`;
    }
    document.getElementById("reminders").innerHTML = options;
}

function complete(idReminder) {
    var req = new XMLHttpRequest();

    req.open("delete", `http://localhost:3001/reminders/delete/${idReminder}`, true);
    req.send();

    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            notifySuccess();
        }
    };
}