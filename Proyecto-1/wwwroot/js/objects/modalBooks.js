$(document).ready(function () {
    hoverBooks();
    clickActionModal();
    onChangeInput();
});
function hoverBooks() {
    $(".btnCloseModal,.btnCloseModalAlt,.btnSend").hover(function () {
        $(this).addClass("bx-tada");
    }, function () {
        $(this).removeClass("bx-tada");
    });    
}
function clickActionModal() {
    $(".modalBooks .btnCloseModal,.modalBooks .btnCloseModalAlt").click(function () {
        $(".modalBooks").removeClass("visible");
        setTimeout(() => {
            $(".modalBooks #tableBooksPreOrder tbody tr").remove();
            bookChosen = null;
            bookChosen = [];
            countChosen = countChosenAuxiliar = 0;            
        },550);
    });    
    $(".modalBooks .btnSend").click(function () {
        sendOrder();
    });
}
function onChangeInput() {
    $(".modalBooks .tbDate").change(function () {
        if (dateCompare()) {

        }
        else {
            buildMessage("La fecha no puede ser inferior a la fecha actual o superior a un mes", 3500);
        }
    });
}
function dateCompare() {    
    var inputDate = new Date($(".modalBooks .tbDate").val());
    
    var today = new Date();
    
    var difference = inputDate - today;

    var daysAgo = Math.floor(difference / (1000 * 60 * 60 * 24));
    console.log(daysAgo);
    if (daysAgo <= 30 && daysAgo > 0) {
        return true;        
    } else {
        return false;
    }
}

function sendOrder() {
    var order = $(".modalBooks .modalFoot .btnSend").attr("id").split(",");        
    if (dateCompare()) {
        for (var i = 0; i < 3; i++) {
            if (order[i] != null) {
                $.ajax({
                    url: "../Books/OrderBook",
                    method: "post",
                    data: {
                        userID: readCookie("user"),
                        bookID: order[i],
                        inputDate: $(".modalBooks .tbDate").val()
                    },
                    beforeSend: function () {
                        buildMessage("Procesando solicitud");
                        activeLoadPage();
                    },
                    success: function (response) {
                        if (response == "done") {
                            buildMessage("Solicitud aprobada");
                            $(".modalBooks").removeClass("visible");
                            getAllBooks();
                        }
                        else if(response == "fail") {
                            buildMessage("El libro con la identificación " + order[i] + " fue solicitado por otra persona\nLamentamos los inconvenientes");
                        }
                    },
                    error: function (response) {
                        alert("Verificar la consola");
                        console.log(response);
                    },
                    complete: function () {

                    }
                });
            }                
        }
    }

}