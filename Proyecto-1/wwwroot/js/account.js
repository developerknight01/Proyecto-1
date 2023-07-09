$(document).ready(function () {   
    if (readCookie("user") != null) {
        buildMessage("Redireccionando...", 2000);
        setTimeout(() => {
            if (readCookie("user").split("~")[1] == "01")
                location.href = "../Profile/Profile?=admin";
            else
                location.href = "../Profile/Profile?=info";
        }, 2500);        
    }
    else{
        clickAction();
        hoverIcon();
        checkEmptyInInput();
        checkDataInInput();
        checkLocation();
    }
});
function checkLocation() {
    var url = "";
    if (window.location.href.includes("restore")) {
        url = "Restore";
    }
    else if (window.location.href.includes("signup")) {
        url = "SignUp";
    }
    else if (!window.location.href.includes("signup") && !window.location.href.includes("restore")) {
        url = "login";
    }
    if (url != "login") {
        $.ajax({
            url: "../Account/" + url,
            success: function (data) {
                setTimeout(() => {
                    $(".inputLogin").addClass("show move");
                    setTimeout(() => {
                        $(".inputLogin").remove();
                        $("main aside").append(data);
                        setTimeout(() => {
                            $("aside section.replace").removeClass("replace");
                            clickAction();
                        }, 150);
                    }, 350);
                }, 550);
            }
        })
    }
    inactiveLoadPage(1000);
}
function hoverIcon() {
    $(".contentPopUp .boxPopUp span").hover(function () {
        $(this).children("svg").addClass("fa-beat-fade");
    }, function () {
        $(this).children("svg").removeClass("fa-beat-fade");
    });
    $("main .btnBackLogin").hover(function () {
        $(this).children("svg").addClass("fa-beat-fade");
    }, function () {
        $(this).children("svg").removeClass("fa-beat-fade");
    });
    $("main .iconHelp").hover(function () {
        $(this).children("svg").addClass("fa-beat-fade");
    }, function () {
        $(this).children("svg").removeClass("fa-beat-fade");
    });
}
function clickAction() {
    $("aside .inputLogin .row .link").click(function () {
        if ($(this).hasClass("restore")) {
            window.location.href = "?=restore";
        }
        else if ($(this).hasClass("new")) {
            window.location.href = "?=signup";
        }
    });
    $("section .btnBackLogin").click(function () {        
        window.location.href = "Account";
    });
    $("aside .iconHelp").click(function () {
        if ($(this).hasClass("iconPass")) {
            buildMessage("La contraseña debe constar de 8-64 caracteres\nLetras mayúsculas y minúsculas con números y algún signo especial", 10000);
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
    return $(object).val().replace(/(  +)/g, ' ');
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
        new RegExp(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/)
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
                buildMessage("La cédula debe estar compuesta por 9 dígitos");
            }
        }
        else if ($(object).hasClass("tbPhone")) {
            if ($(object).val().length == 8) {
                flagTest = false;
            }
            else {
                flagTest = true;
                numTest = 0;
                buildMessage("El número de teléfono debe estar compuesto por 8 dígitos");
            }
        }
    }
    else if ($(object).attr("type") == "password") {
        if (!regex[4].test($(object).val())) {
            flagTest = true;
        }
        if ($(object).hasClass("tbConfirmPassword")) {
            if ($(object).val() != $("main section .tbPassword").val()) {
                flagTest = true;
                buildMessage("Contraseñas no coinciden");
            }
        }
        else if ($(object).hasClass("tbNewPass")) {
            if ($(object).val() != $("main section .tbConfirmPass").val()) {
                flagTest = true;
                buildMessage("Contraseñas no coinciden");
            }
        }
        numTest = 0;
    }
    for (var i = 0; i <= numTest; i++) {
        if (regex[i].test($(object).val())) {
            flagTest = true;
            buildMessage("Dato no permitido");
            break;
        }
    }
    return flagTest;
}
function login() {
    var data = null;
    if ($(".inputLogin .tbUser").length > 0 && $(".inputLogin .tbPass").length > 0) {
        $.ajax({
            url: "../Account/Login",
            method: "post",
            data: {
                user: $(".inputLogin .tbUser").val(),
                pass: $(".inputLogin .tbPass").val() },
            success: function (response) {                
                if (response != "fail" && response != "error") {
                    createCookie("user", response);
                    buildMessage("Iniciando sesión");
                    $(".loadPage").addClass("active");
                    setTimeout(() => {                        
                        setTimeout(() => {
                            if ($(".inputLogin .tbUser").val() == "111111111")
                                window.location.href = "../Profile/Profile?=admin";
                            else
                                window.location.href = "../Profile/Profile?=info";
                        },550);
                    },550);                    
                }
                else if (response == "fail") {
                    buildMessage("Usuario o Contraseña invalido");
                }
                else {
                    buildMessage("Problemas de conexión con el servidor");
                    $(".inputLogin .tbUser,.inputLogin .tbPass").addClass("errorInput");
                }
            }
        });
    }
    if ($(".inputLogin .tbUser").length < 5) {
        $(".inputLogin .tbUser").addClass("emptyInput");
    }
    if ($(".inputLogin .tbPass").length < 5) {
        $(".inputLogin .tbPass").addClass("emptyInput");
    }
}
function signUp() {
    var flagToRegister = true;
    var data = null;
    $(".inputNewUser input").each(function () {
        if (this.value.length == 0) {
            flagToRegister = false;
        }
        if ($(this).hasClass("errorInput"))
            flagToRegister = false;
    });
    if (flagToRegister) {
        if (flagToRegister && $(".inputNewUser .tbPassword").val() != $(".inputNewUser .tbConfirmPassword").val()) {
            $(".inputNewUser .tbPassword,.inputNewUser .tbConfirmPassword").addClass("errorInput");
            flagToRegister = false;
            $("main section button").addClass("move");
            setTimeout(() => {
                $("main section .lbErrorPass").addClass("show");
                setTimeout(() => {
                    $("main section .lbErrorPass").removeClass("show");
                    setTimeout(() => {
                        $("main section button").removeClass("move");
                    }, 150);
                }, 8500);
            }, 250);
        }
        else if (flagToRegister) {
            $.ajax({
                url: "../Account/NewUser",
                method: "post",
                data: {
                    id: $(".tbID").val(),
                    name: $(".tbName").val(),
                    lastname: $(".tbLastName").val(),
                    password: $(".tbPassword").val()
                },
                success: function (response) {                    
                    if (response  == "1") {
                        buildMessage("Procesando");
                        setTimeout(() => {
                            buildMessage("Cuenta Creada");
                            $(".loadPage").addClass("active");
                            setTimeout(() => {
                                window.location.href = "Account";
                            }, 3500);
                        }, 1000);
                    }
                    else if (response == "fail" || response == "exist") {
                        buildMessage("Cédula en uso");
                    }
                    else {
                        buildMessage("Problemas de comunicación con el servidor");
                    }
                }
            });
        }
    }
    else {
        buildMessage("Verifique que todos los campos estén completos");
    }
}
function sendRestorePass() {
    var data = null;
    var email = $(".inputRestorePass .tbEmailRestore").val();
    if (email.length > 0) {
        data = { 'correo': email };
        buildMessage("Procesando solicitud");
        $.ajax({
            url: "HomeController/homeController.php",
            method: 'post',
            data: { sendRestorePass: JSON.stringify(data) },
            success: function (response) {
                if (response == "done") {
                    buildMessage("Contraseña temporal enviada");
                    setTimeout(() => {
                        window.location.href = "cuenta?=codigorecuperacion";
                    }, 2750);
                }
                else {
                    buildMessage("Correo no encontrado\nVerifique el correo ingresado");
                }
            }
        });
    }
    else {
        buildMessage("Completar formulario");
    }
}
function restorePass() {
    var codePass = $(".inputNewPassword .tbCodeRestore").val();
    var pass = [$(".inputNewPassword .tbNewPass").val(), $(".inputNewPassword .tbConfirmPass").val()];
    var data = null;
    if ($("main section input").hasClass("errorInput")) {
        buildMessage("Verifique que los campos estén completos");
    }
    else {
        if (codePass.length > 0) {
            if (pass[0] == pass[1]) {
                data = {
                    'codePass': codePass,
                    'pass': pass[0]
                };
                $.ajax({
                    url: "HomeController/homeController.php",
                    method: "post",
                    data: { restorePass: JSON.stringify(data) },
                    success: function (response) {
                        if (response == "done") {
                            buildMessage("Contraseña reestablecida");
                            setTimeout(() => {
                                buildMessage("Volviendo al inicio de sesion");
                                setTimeout(() => {
                                    window.location.href = "cuenta";
                                }, 1500);
                            }, 500);
                        }
                        else if (response == "fail") {
                            buildMessage("Código de verificación incorrecto");
                        }
                        else {
                            buildMessage("Problemas de conexión con el servidor");
                        }
                    }
                });
            }
        }
        else {
            alert("Codigo de verificación invalido");
        }
    }

}