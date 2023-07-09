var bookChosen = [];
var countChosen = 0;
var countChosenAuxiliar = 0;
var books = [];
var booksInfo = [];
$(document).ready(function () {    
    clickActionProfile();
    var html = "";    
    if (readCookie("user").split("~")[1] == "01") {
        html = "Admin";        
    }
    else {
        if (location.href.includes("info")) {
            html = "Info";
            $("#owninfo").addClass("active");
        }
        else if (location.href.includes("order")) {
            html = "OrderBook";
            $("#orderbook").addClass("active");
        }
        else if (location.href.includes("books")) {
            html = "BookStore";
            $("#bookstore").addClass("active");
        }
    }
    $.ajax({
        url: "../Profile/"+html,
        success: function (data) {            
            $(".menuProfile").after(data);
            if (location.href.includes("info")) {
                $("#owninfo").addClass("active");
                loadOwnInfo();
            }
            else if (location.href.includes("order")) {
                $("#orderbook").addClass("active");
                checkBooksOrdered();
            }
            else if (location.href.includes("books")) {
                $("#bookstore").addClass("active");
                getAllBooks();
            }
            else if (location.href.includes("admin")) {
                getAllBooksAdmin();
            }

            $(".header .profile").attr("href", "#");
            $(".header .profile svg").addClass("fa-right-from-bracket");
            $(".header .profile").click(function () {
                deleteCookie("user");                
            });
        }
    });
});
function getAllBooksAdmin() {
    $.ajax({
        url: "../Profile/GetAllBooksAdmin",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        cache: "false",
        method: "post",
        success: function (response) {
            var data = response.split("*");
            if (response != "error") {
                $("#tablebooksmanage tbody tr.items").remove()
                bookChosen = null;
                bookChosen = [];
                countChosen = 0;
                for (var i = 0; i < data.length - 1; i++) {
                    $("#tablebooksmanage tbody tr:first-child").after(
                        "<tr class='items item-" + data[i].split("+")[6] +"'>" +
                            "<td><input type='text' class='tbISBN' placeholder='" + data[i].split("+")[6] + "' disabled/></td>" +
                            "<td><input type='text' class='tbNameBook' placeholder='" + data[i].split("+")[0] + "'/></td>" +
                            "<td><input type='text' class='tbEdition' placeholder='" + data[i].split("+")[1]+"' /></td>"+
                            "<td><input type='text' class='tbEditorial' placeholder='" + data[i].split("+")[2]+"' /></td>"+
                            "<td><input type='text' class='tbOwner' placeholder='" + data[i].split("+")[3]+"' /></td>"+
                            "<td><input type='text' class='tbStock' placeholder='" + data[i].split("+")[4]+"' /></td>"+
                            "<td><input type='text' class='tbItemLoan' placeholder='" + data[i].split("+")[5]+"' /></td>"+
                            "<td><span class='btnOption'><i class='fa-solid fa-info'></i></span></td>"+                                                                                                                                                
                        "</tr>"
                    );
                    booksInfo[i] = "Libro: " + data[i].split("+")[0] + ", Autor:" + data[i].split("+")[3] + ", Edición: " + data[i].split("+")[1];
                    books[i] = data[i].split("+")[0];
                }
                $("#tablebooksmanage tbody .btnOption").click(function () {
                    buildMessage("Para actualizar diríjase al campo por actualizar, modifique el dato y presione enter");                    
                });
                autocomplete(document.getElementById("tbSearch"), books, booksInfo);
                clickActionProfile();
                pressEnterOnInput();
                resetTable();
                hoverActionBooks();
                inactiveLoadPage(1500);
            }
        },
        error: function (response) {
            alert(response);
        }
    });
}
function clickActionProfile() {
    $("#bookstore").click(() => {        
        $(".menuProfile .iconMenu.active").removeClass("active");
        if (!$("#bookstore").hasClass("active")) {
            $("#bookstore").addClass("active");            
            changeHTML("bookstore");
        }
    });
    $("#orderbook").click(() => {
        $(".menuProfile .iconMenu.active").removeClass("active");
        if (!$("#orderbook").hasClass("active")) {
            $("#orderbook").addClass("active");
            changeHTML("orderbook");
        }
    });
    $("#owninfo").click(() => {
        $(".menuProfile .iconMenu.active").removeClass("active");
        if (!$("#owninfo").hasClass("active")) {
            $("#owninfo").addClass("active");
            changeHTML("owninfo");
        }
    });
    $("#btnAdd").click(function () {
        var flagToRegister = false;
        let bookNew = {
            isbn: $("#tablebooksmanage tbody tr:first-child td:nth-child(1) input").val(),
            name: $("#tablebooksmanage tbody tr:first-child td:nth-child(2) input").val(),
            edition: $("#tablebooksmanage tbody tr:first-child td:nth-child(3) input").val(),
            editorial: $("#tablebooksmanage tbody tr:first-child td:nth-child(4) input").val(),
            nameOwner: $("#tablebooksmanage tbody tr:first-child td:nth-child(5) input").val(),
            stock: $("#tablebooksmanage tbody tr:first-child td:nth-child(6) input").val(),
            itemLoan: $("#tablebooksmanage tbody tr:first-child td:nth-child(7) input").val()
        };
        for (var i = 1; i <= 7; i++) {
            if ($("#tablebooksmanage tbody tr:first-child td:nth-child(" + i + ") input").val().length > 0) {
                if (/^(?!\s*$).+/.test($("#tablebooksmanage tbody tr:first-child td:nth-child(" + i + ") input").val())) {
                    $("#tablebooksmanage tbody tr:first-child td:nth-child(" + i + ") input.errorInput").removeClass("errorInput");
                    if (i == 3 || i == 6 || i == 7) {
                        if (!parseInt($("#tablebooksmanage tbody tr:first-child td:nth-child(" + i + ") input").val()) || $("#tablebooksmanage tbody tr:first-child td:nth-child(" + i + ") input").val() <= 0) {
                            $("#tablebooksmanage tbody tr:first-child td:nth-child(" + i + ") input").addClass("errorInput");
                            flagToRegister = true;
                        }
                        else {
                            if (i == 7) {
                                if (parseInt($("#tablebooksmanage tbody tr:first-child td:nth-child(" + i + ") input").val()) > parseInt($("#tablebooksmanage tbody tr:first-child td:nth-child(" + (i - 1) + ") input").val())) {
                                    $("#tablebooksmanage tbody tr:first-child td:nth-child(" + i + ") input").addClass("errorInput");
                                    flagToRegister = true;
                                }
                                else {
                                    $("#tablebooksmanage tbody tr:first-child td:nth-child(" + i + ") input.errorInput").removeClass("errorInput");
                                }
                            }
                            else {
                                $("#tablebooksmanage tbody tr:first-child td:nth-child(" + i + ") input.errorInput").removeClass("errorInput");
                            }
                        }
                    }
                }
                else {
                    flagToRegister = true;
                    $("#tablebooksmanage tbody tr:first-child td:nth-child(" + i + ") input").addClass("errorInput");                    
                    break;
                }
            }
            else {
                $("#tablebooksmanage tbody tr:first-child td:nth-child(" + i + ") input").addClass("errorInput");
            }
        }
        if (!flagToRegister) {
            insertBook(bookNew);
        }
        else {
            buildMessage("Verifique el campo que presta un formato incorrecto");
        }
    });
}
function updateBook(book,bookID) { 
    $.ajax({
        url: "../Profile/UpdateBookInfo",
        method: "post",
        cache: "false",
        data: {
            value: book.value,
            kindOfData: book.obj,
            isbn: bookID
        },
        beforeSend: function () {
            activeLoadPage();
            buildMessage("Verificando datos");
        },
        success: function (response) {
            setTimeout(() => {
                if (response == "done") {
                    buildMessage("Datos actualizados");
                    getAllBooksAdmin();
                }
                else if (response == "fail") {
                    if (book.obj == "tbEdition") {
                        buildMessage("El libro por editar, su Edición ya existe");
                    }
                    else if (book.obj == "tbItemLoan") {
                        buildMessage("La cantidad de libros de prestamo no puede ser superior a lo que existe en inventario");
                    }
                    inactiveLoadPage(1000);
                }
                else {
                    buildMessage("Problemas con el servidor");
                    inactiveLoadPage(1000);
                }
            }, 1000);
        },
        error: function (response) {
            alert("Revise la consola");
            console.log(response);
            inactiveLoadPage(1000);
        }
    });
}
function insertBook(bookNew) {
    $.ajax({
        url: "../Profile/InsertNewBook",
        method: "post",
        data: {
            isbn: bookNew.isbn,
            name: bookNew.name,
            edition: bookNew.edition,
            editorial: bookNew.editorial,
            owner: bookNew.nameOwner,
            stock: bookNew.stock,
            itemLoan: bookNew.itemLoan
        },
        beforeSend: function () {
            buildMessage("Verificado el nombre del libro y su edición");
            activeLoadPage();
        },
        success: function (response) {
            setTimeout(() => {
                if (response == "done") {
                    buildMessage("Libro registrado con éxito!");
                    $("#tablebooksmanage tbody tr:first-child td input").val(null);
                    getAllBooksAdmin();
                }
                else if (response == "fail") {
                    buildMessage("El nombre del libro y su edición ya existe");
                    inactiveLoadPage(1000);
                }
                else {
                    buildMessage("Problemas de conexión con el servidor");
                    inactiveLoadPage(1000);
                }
            }, 1000)                        
        },
        error: function (response) {
            alert("Revise la consola");
            console.log(response);
            inactiveLoadPage();
        }
    });
}
function changeHTML(html) {
    $("main section").removeClass("visible");
    setTimeout(() => {
        $("main section").remove();
    }, 500);
    if (html == "owninfo") {
        location.href = "?=info";        
    }
    else if (html == "orderbook") {
        location.href = "?=order";
    }
    else if (html == "bookstore") {
        location.href = "?=books";
    }
}
function loadOwnInfo() {
    var id = readCookie("user");    
    $.ajax({
        url: "../Profile/OwnInfo",
        method: "post",
        data: { idUser: id },
        success: function (response) {            
            if (response != "error" || response != "fail") {                
                $(".tbID").attr("placeholder", response.split("+")[0]);
                $(".tbName").attr("placeholder", response.split("+")[1]);
                $(".tbLastName").attr("placeholder", response.split("+")[2]);
                pressEnterOnInput();
                inactiveLoadPage(1500);
            }
            else {
                buildMessage("Problemas con el usuairo\nVolvamos al Inicio de Sesión","");
                setTimeout(() => {
                    location.href = "../Account/Account";
                }, 1000);
            }
        }
    });
}
function checkEmptyInInput() {
    $("main section input").each(function () {
        if ($(this).attr("type") != "password" && !$(this).hasClass("tbCodeRestore")) {
            $(this).attr("oninput", "this.value = removeEmptyField(this)");
            $(this).attr("onblur", "this.value = outfocus(this)");
        }
        else {
            $(this).attr("onblur", "outfocus(this)");
        }
    });
}
function removeEmptyField(object) {
    return $(object).val().replace(/\s/g, "");
}
function outfocus(object) {
    if (checkDataInInput(object)) {
        $(object).addClass("errorField");
    }
    else {
        $(object).removeClass("errorField");
        return $(object).val().trim();
    }
}
function checkDataInInput(object) {
    var regex = [
        new RegExp(/function\s*([a-z0-9]+)\s*\((.*)\)(\t|\r|\s)*\{(.*)\}/),
        new RegExp(/<.*?script.*\/?>/),
        new RegExp(/console.(log|debug|info|...|count)\((.*)\);?/),
        new RegExp(/\d/),
        new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/),
        new RegExp(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/),
        new RegExp(/^[A-Za-záéíóúñÁÉÍÓÚäëïöüÄËÏÖÜ\s']+$/)
    ];
    var numTest = 0;
    var flagTest = false;

    if ($(object).attr("type") == "text") {
        if ($(object).hasClass("tbEmail") || $(object).hasClass("tbEmailRestore")) {
            if (!regex[5].test($(object).val())) {
                flagTest = true;
            }
            numTest = 0;
        }
        else if ($(object).hasClass("tbCodeRestore")) {
            numTest = 0;
        }
        else if ($(object).hasClass("tbName" || $(object).hasClass("tbLastName"))) {            
            if (!regex[6].test($(object).val())){
                flagTest = true;
                buildMessage("Los nombres solamente pueden contener letras, signos como tildes y ñ.","");
            }
        }
        else
            numTest = 3;
    }
    else if ($(object).attr("type") == "number") {
        if ($(object).hasClass("tbID") || $(object).hasClass("tbUser")) {
            if ($(object).val().length == 9) {
                flagTest = false;
            }
            else {
                flagTest = true;
                numTest = 0;
                buildMessage("La cédula debe estar compuesta por 9 dígitos","");
            }
        }
        else if ($(object).hasClass("tbPhone")) {
            if ($(object).val().length == 8) {
                flagTest = false;
            }
            else {
                flagTest = true;
                numTest = 0;
                buildMessage("El número de teléfono debe estar compuesto por 8 dígitos","");
            }
        }
    }
    else if ($(object).attr("type") == "password") {
        if (!regex[4].test($(object).val())) {
            flagTest = true;
            buildMessage("La contraseña debe constar de letras minúsculas y mayúsculas, además de números y algún caracter especial\nMínimo de 8 y máximo de 64",3500);
        }
        if ($(object).hasClass("tbConfirmPassword")) {
            if ($(object).val() != $(".tbPassword").val()) {
                flagTest = true;                
                buildMessage("Contraseñas no coinciden","");
            }
        }
        else if ($(object).hasClass("tbNewPass")) {
            if ($(object).val() != $(".tbConfirmPass").val()) {
                flagTest = true;                
                buildMessage("Contraseñas no coinciden","");
            }
        }
        numTest = 0;
    }
    for (var i = 0; i <= numTest; i++) {
        if (regex[i].test($(object).val())) {
            flagTest = true;
            buildMessage("Dato no permitido","");
            break;
        }
    }
    return flagTest;
}
function pressEnterOnInput() {    
    let data = {
        obj: "",
        value: ""
    };
    var temp = "";
    $(".tbID,.tbName,.tbLastName,.tbNewPass,.tbConfirmPass").keypress(function (event) {
        if (event.which === 13) {            
            temp = $(this).attr("class").split(" ")[1];
            if (temp == "tbID" || temp == "tbName" || temp == "tbLastName" || temp == "tbNewPass" || temp == "tbConfirmPass") {
                if (outfocus($(this))) {
                    if (temp == "tbConfirmPass")
                        data.obj = "tbNewPass";
                    else
                        data.obj = temp;
                    data.value = $(this).val();                    
                    updateOwnInfo(data);
                }
            }
        }
    });
    $("#tablebooksmanage tbody tr td input").keypress(function (event) {
        if (event.which === 13) {
            temp = $(this).attr("class");
            if (/^(?!\s*$).+/.test($(this).val())) {
                if (temp == "tbEdition" || temp == "tbStock" || temp == "tbItemLoan") {
                    if (!parseInt($(this).val()) || parseInt($(this).val()) <= 0) {
                        buildMessage("El formato solo admite números enteros superiores a 0");
                        $(this).addClass("errorInput");
                    }
                    else {
                        $(this).removeClass("errorInput");
                        data.obj = temp;
                        data.value = $(this).val();
                        updateBook(data,$(this).parent().parent().attr("class").split("-")[1]);
                    }
                }
                else {
                    data.obj = temp;
                    data.value = $(this).val();
                    updateBook(data, $(this).parent().parent().attr("class").split("-")[1]);
                }
            }
            else {
                buildMessage("Campos vacíos no se actualizan");
            }
        }
    });
}
function updateOwnInfo(values) {
    $(".loadPage").addClass("active");
    buildMessage("Procesando...","");
    $.ajax({
        url: "../Profile/UpdateData",
        method: "post",
        data: {
            kindOfData: values.obj,
            value: values.value,
            userID: readCookie("user")
        },
        success: function (response) {
            if (response != "error") {
                buildMessage("Dato actualizado","");
                $("." + values.obj).val(null);
                if (values.obj == "tbID") {
                    deleteCookie("user");
                    createCookie("user", response);
                }
                else if (values.obj == "tbNewPass" || values.obj == "tbConfirmPass")
                    $(".tbNewPass,.tbConfirmPass").val(null);
                loadOwnInfo();
            }            
        },
        error: function (response) {
            console.log(response);
            alert("Revisar la consola");
        }
    });
}
function hoverActionBooks() {
    $("#tablebooksNew tbody .btnCart").hover(function () {
        $(this).children("svg").addClass("fa-beat-fade");
    }, function () {
        $(this).children("svg").removeClass("fa-beat-fade");
    });
    $(".contentBody .row-searchBook .btnClean").hover(function () {
        $(this).children("svg").addClass("fa-beat-fade");
    }, function () {
        $(this).children("svg").removeClass("fa-beat-fade");
    });
    
}
function getAllBooks() {     
    $.ajax({
        url: "../Books/GetAllBooks",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        cache: "false",
        method: "get",
        success: function (response) {
            var data = response.split("*");              
            if (response != "error") {
                $("#tablebooksNew tbody tr").remove()
                bookChosen = null;
                bookChosen = [];
                countChosen = 0;
                for (var i = 0; i < data.length - 1; i++) {
                    $("#tablebooksNew tbody").append(
                        "<tr class='item-" + data[i].split("+")[5] + "'>" +
                        "<td>" + data[i].split("+")[0] + "</td>" +
                        "<td>" + data[i].split("+")[1] + "</td>" +
                        "<td>" + data[i].split("+")[2] + "</td>" +
                        "<td>" + data[i].split("+")[3] + "</td>" +
                        "<td>" + data[i].split("+")[4] + "</td>" +
                        "<td><span class='btnCart' title='Agregar al carrito' id='" + data[i].split("+")[6] + "'><i class='fa-solid fa-cart-shopping'></i></span></td>" +
                        "</tr>"
                    );
                    booksInfo[i] = "Libro: " + data[i].split("+")[0] + ", Autor:" + data[i].split("+")[3] + ", Edición: " + data[i].split("+")[1];
                    books[i] = data[i].split("+")[0];

                    if (data[i].split("+")[4] == 0) {
                        $("#tablebooksNew tbody tr:last-child .btnCart i").remove();
                        $("#tablebooksNew tbody tr:last-child .btnCart").append("<i class='fa-solid fa-envelope'></i>");
                        $("#tablebooksNew tbody tr:last-child .btnCart").attr("title", "Enviar solicitud de lista de espera");
                        $("#tablebooksNew tbody tr:last-child .btnCart").attr("id", "");
                    }
                }
                $("#tablebooksNew tbody .btnCart").click(function () {                    
                    var isbn = $(this).attr("id");
                    var userID = readCookie("user");
                    if (isbn != null || isbn != "")
                        checkBooksOrderHave(isbn, userID);
                });
                $.ajax({
                    url: "../Books/ModalBook",
                    success: function (html) {
                        $("main section").after(html);
                    }
                });
                hoverActionBooks();
                autocomplete(document.getElementById("tbSearch"), books, booksInfo);
                resetTable();
                inactiveLoadPage(1500);
            }
        },
        error: function (response) {
            alert(response);
        }
    });
}
function autocomplete(inp, arr,arrAlt) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arrAlt[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arrAlt[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    searchBookOnTable(inp.value);
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");        
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }                                  
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);        
    });
}
function resetTable() {
    var table = "";
    if ($("#tablebooksordered").length > 0) {
        table = "#tablebooksordered";
    }
    else if ($("#tablebooksNew").length > 0) {
        table = "#tablebooksNew";
    }
    else if ($("#tablebooksmanage").length > 0) {
        table = "#tablebooksmanage";
    }
    $(".contentBody .row-searchBook .btnClean").click(function () {
        if ($(table + " tbody tr").hasClass("disappear")) {
            if ($("#tbSearch").val(null)) {
                $(table + " tbody tr.none").removeClass("none");
                setTimeout(() => {
                    $(table + " tbody tr.disappear").removeClass("disappear");
                }, 350);
            }
        }
    });    
}
function searchBookOnTable(value) {
    var table = "";
    var col = 1;
    if (value != "") {
        if ($("#tablebooksordered").length > 0) {
            table = "#tablebooksordered";
        }
        else if ($("#tablebooksNew").length > 0) {
            table = "#tablebooksNew";
        }
        else if ($("#tablebooksmanage").length > 0) {
            table = "#tablebooksmanage";
            col = 2;
        }
        if ($(table + " tbody tr.disappear").hasClass("disappear")) {
            $(table + " tbody tr.disappear").removeClass("none");
            $(table + " tbody tr.disappear").removeClass("disappear");
        }        
        for (var i = 1; i <= $(table + " tbody tr").length; i++) {
            if (col == 1) {
                if ($(table + " tbody tr:nth-child(" + i + ") td:nth-child(" + col + ")").text() != value) {
                    $(table + " tbody tr:nth-child(" + i + ")").addClass("disappear");
                }
            }
            else if (col == 2) {                
                if ($(table + " tbody tr:nth-child(" + i + ") td:nth-child(" + col + ") input").attr("placeholder") != value) {
                    $(table + " tbody tr:nth-child(" + i + ")").addClass("disappear");
                }
            }
            
        }
        buildMessage("Si desea reiniciar la tabla, presione enter dentro del espacio de búsqueda");
        setTimeout(() => {
            $(table + " tbody tr.disappear").addClass("none");
        }, 550);
    }    
}
function checkBooksOrderHave(isbn, user) {        
    $.ajax({
        url: "../Books/CheckBooksOrderHave",
        method: "post",
        data: { userID: user },
        beforeSend: function () {
            buildMessage("Verificando su petición");
            activeLoadPage();
        },
        success: function (response) {
            
            if (response < 3 && countChosen < 3) {
                if (countChosenAuxiliar == 0 && response > 0) {
                    countChosenAuxiliar = response;
                    countChosen = countChosenAuxiliar;
                }
                if (response == 1) {                    
                    bookChosen[0] = "null";                    
                }
                else if (response == 2) {                    
                    bookChosen[0] = bookChosen[1] = "null";                    
                }                              
                if (checkBookSelected(isbn)) {
                    buildMessage("El libro ya fue seleccionado, si no lo desea quítelo del panel inferior");
                    inactiveLoadPage(650);
                }
                isbn += checkBookSelected(isbn);
                if (countChosen <= 2) {
                    if (parseInt(response) >= 0 && parseInt(response) <= 2) {
                        bookChosen[countChosen] = isbn;
                        countChosen++;                        
                        findBook(isbn);
                    }
                    else if (response > 2) {
                        buildMessage("Usted ya posee la cuota máxima de prestamos");
                        inactiveLoadPage(650);
                    }
                }
                else {
                    buildMessage("Ya posee 3 libros seleccionados en la PreOrden");
                    inactiveLoadPage(650);
                }
            }
            else if (response == 3) {
                buildMessage("Ya posee la cuota máxima");
                inactiveLoadPage(650);
            }
            else {
                buildMessage("Ya poseería 3 elementos registrados, " + countChosenAuxiliar + " más la nueva petición superaría el límite");
                inactiveLoadPage(650);
            }
        },
        error: function (response) {
            alert("Ver la consola");
            console.log(response);
        },
        complete: function () {
        
        }
    });
}
function checkBookSelected(isbn) {
    var result = "";
    var count = 0;
    for (var i = 0; i < countChosen; i++) {
        if (bookChosen[i] == isbn) {
            count++;
            result = "-" + count;
        }
        else if (bookChosen[i] != "null") {
            if (bookChosen[i].split("-").length > 0) {
                if (bookChosen[i].split("-")[0] == isbn) {
                    result = "-" + (parseInt(bookChosen[i].split("-")[1]) + 1);
                }
            }
        }
        
    }
    return result;
}
function findBook(isbn) {
    $.ajax({
        url: "../Books/FindBook",
        method: "post",
        data: { bookID: isbn },
        beforeSend: function () {
            buildMessage("Cargando el libro");
        },
        success: function (response) {
            if (response != "fail" || response != "error") {
                $(".modalBooks").addClass("visible");

                $(".modalBooks #tableBooksPreOrder tbody").append(
                    "<tr>" +
                    "<td>" + response.split("+")[0] + "</td>" +
                    "<td>" + response.split("+")[1] + "</td>" +
                    "<td>" + response.split("+")[2] + "</td>" +
                    "<td>" + response.split("+")[3] + "</td>" +
                    "<td>" +
                        "<i class='btnDeleteItem bx bx-message-square-minus' id='"+isbn+"' ></i>"+
                    "</tr>"
                );
                $("#tableBooksPreOrder #" + isbn).click(function () {                    
                    discardBook(isbn);
                    $(this).parent().parent().remove();
                    countChosen--;                   
                });
                $(".modalBooks .modalFoot .btnSend").attr("id", bookChosen);                
            }
            else if (response == "fail") {
                buildMessage("El último libro ya fue prestado\nLamentamos el inoportuno");
            }
        },
        error: function (response) {
            alert("Ver la consola");
            console.log(response);
        },
        complete: function () {
            inactiveLoadPage(1000);
        }
    });
}
function discardBook(isbn) {    
    var bookChosenTemp = [];
    var count = 0;
    for (var i = 0; i < countChosen; i++) {
        if (bookChosen[i] == isbn) {            
            for (var x = 0; x < countChosen; x++) {
                if (bookChosen[x] != isbn) {
                    bookChosenTemp[count] = bookChosen[x];
                    count++;
                }
            }
            break;
        }
    }    
    bookChosen = null;
    bookChosen = [];
    bookChosen = bookChosenTemp;
    $(".modalBooks .modalFoot .btnSend").attr("id", bookChosen);
}
function dateCompare(value) {
    var inputDate = new Date(value);

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
function checkBooksOrdered() {    
    $.ajax({
        url: "../Profile/CheckBooksOrdered",
        method: "post",
        data: { userID: readCookie("user") },
        beforeSend: function () {
            activeLoadPage();
        },
        success: function (response) {
            if (response != "error") {                
                $("#tablebooksordered tbody tr").remove();
                if (response != "empty") {                    
                    var data = response.split("*");
                    bookChosen = null;
                    bookChosen = [];
                    countChosen = 0;
                    for (var i = 0; i < data.length - 1; i++) {
                        $("#tablebooksordered tbody").append(
                            "<tr>" +
                                "<td>" + data[i].split("+")[0] + "</td>" +
                                "<td>" + data[i].split("+")[1] + "</td>" +
                                "<td>" + data[i].split("+")[2] + "</td>" +
                                "<td>" + data[i].split("+")[3] + "</td>" +
                                "<td>" + data[i].split("+")[6].split(" ")[0] + "</td>" +
                                "<td>" + data[i].split("+")[4].split(" ")[0] + "</td>" +
                                "<td>" +
                                "<span class='btnOption'></span>" +
                                "</td>" +
                            "</tr>"
                        );
                        booksInfo[i] = "Libro: " + data[i].split("+")[0] + ", Autor:" + data[i].split("+")[3] + ", Edición: " + data[i].split("+")[1];
                        books[i] = data[i].split("+")[0];
                        $("#tablebooksordered tbody tr:last-child .btnOption").attr("id", data[i].split("+")[7]);
                        if (data[i].split("+")[5] == "True") {
                            $("#tablebooksordered tbody tr:last-child .btnOption").append(
                                "<i class='fa-solid fa-info'></i>"
                            );
                            $("#tablebooksordered tbody tr:last-child .btnOption").attr("title", "libro devuelto");                            
                        }
                        else if (data[i].split("+")[5] == "False") {
                            $("#tablebooksordered tbody tr:last-child .btnOption").append(
                                "<i class='fa-solid fa-paper-plane'></i>"
                            );
                            $("#tablebooksordered tbody tr:last-child .btnOption").attr("title", "Devolver libro");                            
                        }
                        if (!dateCompare(data[i].split("+")[4].split(" ")[0])) {
                            $("#tablebooksordered tbody tr:last-child").addClass("outtime");
                            buildMessage("Existen libros retrasados en su devolución!");
                        }
                    }
                    $("#tablebooksordered tbody .btnOption").click(function () {                        
                        var value = $(this).attr("id");                                    
                        if ($(this).children().hasClass("fa-paper-plane")) {
                            returnBook(value);
                        }
                    });
                    checkBookReturned();
                    resetTable();
                    autocomplete(document.getElementById("tbSearch"), books, booksInfo);
                }
                else {
                    $("#tablebooksordered tbody").append(
                        "<tr>" +
                            "<td>No tiene</td>" +
                            "<td>libros solicitados</td>" +
                            "<td>Si desea obtener</td>" +
                            "<td>Puede buscar </td>" +
                            "<td>O presione el</td>" +
                            "<td>Siguiente botón</td>" +
                            "<td>" +
                            "<span class='btnOption' id='bookStoreAlt'><i class='fa-solid fa-book'></i></span>" +
                            "</td>" +
                        "</tr>"
                    );
                    $("#bookStoreAlt").click(() => {
                        $(".menuProfile .iconMenu.active").removeClass("active");
                        if (!$("#bookstore").hasClass("active")) {
                            $("#bookstore").addClass("active");
                            changeHTML("bookstore");
                        }
                    });
                }
            }
            else {
                buildMessage("Problemas con la conexión de la base de datos");
            }            
        },
        error: function (response) {
            alert("Revise la consola");
            console.log(response);
        },
        complete: function () {
            setTimeout(() => {
                inactiveLoadPage();
            }, 1000);
        }
    });
}
function checkBookReturned() {
    var temp = "";
    var countTemp = 0;
    $.ajax({
        url: "../Profile/CheckBookReturned",
        method: "post",
        data: { userID: readCookie("user") },
        success: function (response) {            
            for (var i = 0; ;) {
                i++;
                if ($("#tablebooksordered tbody tr:nth-child(" + i + ") .btnOption").children().hasClass("fa-info")) {
                    if ($("#tablebooksordered tbody tr:nth-child(" + i + ") .btnOption").attr("id") == response.split("*")[countTemp].split("+")[0]) {
                        $("#tablebooksordered tbody tr:nth-child(" + i + ") .btnOption").attr("title", "Devuelto el " + response.split("*")[countTemp].split("+")[1].split(" ")[0]);
                        $("#tablebooksordered tbody tr:nth-child(" + i + ") .btnOption").click(function () {
                            buildMessage("El libro fue devuelto el " + $(this).attr("title"));
                        });
                    }
                }
                if (i > $("#tablebooksordered tbody tr").length) {
                    i = 0;
                    countTemp++;                    
                }
                if (response.split("*")[countTemp] == null)
                    break;
            }
        },
        error: function (response) {
            alert("Revise la consola");
            console.log(response);
        }
    });
}
function returnBook(value) {    
    $.ajax({
        url: "../Profile/ReturnBook",
        method: "post",
        data: {
            idTransaction: value,
            userID: readCookie("user")
        },
        beforeSend: function () {
            buildMessage("Procesando...");
            activeLoadPage();
        },
        success: function (response) {
            if (response != "error") {
                buildMessage("Devolución aprobada");
                checkBooksOrdered();
            }
            else {
                buildMessage("Problemas de conexión con el servidor");
                inactiveLoadPage();
            }
        },
        error: function (response) {
            alert("Revise la consola");
            console.log(response);
            inactiveLoadPage();
        },        
    });
}