$(document).ready(function () {    
    actionClickHome();
});
function actionClickHome() {
    getNewBooks();
}
function getNewBooks() {
    $.ajax({
        url: "../Home/GetNewBooks", 
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        cache:"false",
        method:"post",
        success: function (response) {
            var data = response.split("*");            
            if (response != "error") {                
                $("#tablebooksNew tbody tr").remove()
                for (var i = 0; i < data.length - 1; i++) {                       
                    $("#tablebooksNew tbody").append(
                        "<tr class='item-" + data[i].split("+")[0] + "'>" +
                            "<td><span class='btnItem'>" + data[i].split("+")[1] + "</span></td>" +
                            "<td>" + data[i].split("+")[3] + "</td>" +
                            "<td>" + data[i].split("+")[2] + "</td>" +
                        "</tr>"
                    );
                }
                inactiveLoadPage(1000);
            }            
        },
        error: function (response) {
            alert(response);
            inactiveLoadPage(500);
        }
    });
}