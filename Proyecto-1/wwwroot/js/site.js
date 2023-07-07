$(document).ready(function () {
    activeLoadPage();
    if (!window.location.href.includes("Index") && !window.location.href.includes("Books") && !window.location.href.includes("Privacy")
        && !window.location.href.includes("Account")) {
        if (readCookie("user") == null) {
            location.href = "../Home/Index";
        }
    }
    else {
        // Reiniciar el contador al cargar la página o al detectar cualquier tipo de interacción del usuario (clic, pulsación de tecla, etc.)
        document.addEventListener("click", restarCounter);
        document.addEventListener("keydown", restarCounter);
    }
    closeMessageBox();
    clickActionShare();
    checkPage();
    hoverProfile();
});
function hoverProfile() {
    $(".header .profile").hover(function() {
        $(this).addClass("fa-beat");
    }, function(){
        $(this).removeClass("fa-beat");
    });
}
function activeLoadPage() {
    $(".loadPage").addClass("active");    
}
function inactiveLoadPage(time) {
    setTimeout(() => {
        $(".loadPage").removeClass("active");
    }, time);    
}
function createCookie(name, value) {
    var timeExperation = new Date();   
    timeExperation.setDate(timeExperation.getUTCDate() + 1); // Expire después de un día

    var stringCookie = name + "=" + encodeURIComponent(value) + "; expires=" + timeExperation.toGMTString() + "; path=/";
    document.cookie = stringCookie;
}

function readCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }

        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
        }
    }

    return null;
}
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    if (name == "user") {
        buildMessage("Cerrando Sesión");
        setTimeout(() => { location.href = "../Home/Index"; }, 2500);
    }        
}
var inactivity;
var inactivityTime = 20 * 60 * 1000; // 20 minutos (convertidos a milisegundos)

function restarCounter() {
    if (readCookie("user") != null) {
        clearTimeout(inactivity);
        inactivity = setTimeout(function () {
            // Llamar a tu función después de 20 minutos de inactividad
            closeSession();
        }, inactivityTime);
    }

}

function closeSession() {
    // Aquí puedes realizar las acciones que deseas ejecutar después de 20 minutos de inactividad
    console.log("Han pasado 20 minutos de inactividad");
}

function checkPage() {    
    $("#nav-bar .nav_link.active,.header .profile").removeClass("active");    
    if (window.location.href.includes("Books")) {        
        $("#nav-bar .nav_link.bookstore").addClass("active");
    }
    else if (window.location.href.includes("Account") || window.location.href.includes("Profile")) {
        $(".header .profile").addClass("active");
    }
    else {
        $("#nav-bar .nav_link.home").addClass("active");
    }
}
document.addEventListener("DOMContentLoaded", function (event) {

    const showNavbar = (toggleId, navId, bodyId, headerId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId),
            bodypd = document.getElementById(bodyId),
            headerpd = document.getElementById(headerId)

        // Validate that all variables exist
        if (toggle && nav && bodypd && headerpd) {
            toggle.addEventListener('click', () => {
                // show navbar
                nav.classList.toggle('show')
                // change icon
                toggle.classList.toggle('bx-x')
                // add padding to body
                bodypd.classList.toggle('body-pd')
                // add padding to header
                headerpd.classList.toggle('body-pd')
            })
        }
    }

    showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')

    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll('.nav_link')

    function colorLink() {
        if (linkColor) {
            linkColor.forEach(l => l.classList.remove('active'))
            this.classList.add('active')
        }
    }
    linkColor.forEach(l => l.addEventListener('click', colorLink))

    // Your code to run since DOM is loaded and ready
});
function closeMessageBox() {
    $("#messageBox #closeMessageBox").click(function () {
        $("#messageBox").removeClass("active");
        setTimeout(function () {
            $("#messageBox .message").children().remove();
        }, 350);
    });
}
function clickActionShare() {
    $("#nav-bar .btnGoBack").click(function () {
        history.back();
    });
}
