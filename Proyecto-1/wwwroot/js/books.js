var bookChosen = [];
var countChosen = 0;
var countChosenAuxiliar = 0;
var books = [];
var booksInfo = [];
$(document).ready(function () {
    getAllBooks();
});
function hoverActionBooks() {
    $("#tablebooksNew tbody .btnCart").hover(function () {
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
                        $("main .contentBooks").after(html);
                    }
                });
                hoverActionBooks();
                autocomplete(document.getElementById("tbSearch"), books, booksInfo);
                inactiveLoadPage(1500);
            }
        },
        error: function (response) {
            alert(response);
        }
    });
}

function autocomplete(inp, arr, arrAlt) {
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
            if (response < 3 && (countChosenAuxiliar + countChosen) < 3) {
                countChosenAuxiliar = response;
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
        else if (bookChosen[i].split("-").length > 0) {
            if (bookChosen[i].split("-")[0] == isbn) {
                result = "-" + (parseInt(bookChosen[i].split("-")[1]) + 1);
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
                    "<i class='btnDeleteItem bx bx-message-square-minus' id='" + isbn + "' ></i>" +
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
