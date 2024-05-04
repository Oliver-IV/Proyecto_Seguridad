const botonLogin = document.getElementById("login");
const botonCreateAcc = document.getElementById("createAcc");
const botonForgotten = document.getElementById("forgotten");
const botonBack = document.getElementById("goBack");
const formLogin = document.getElementById("loginform");

var isCreateAccOn = false;
var isForgottenOn = false;

const init = () => {
    botonBack.style.visibility = "hidden";
    botonBack.disabled = true;

    botonCreateAcc.onclick = () => {
        console.log("click");
        setCreateAcc();
    };

    botonForgotten.onclick = () => {
        setForgotten();
    };

    botonBack.onclick = () => {
        resetearPagina();
    };
};

function setCreateAcc() {
    document.querySelector("h1").innerText = "Crear Cuenta";
    btnLogin.innerText = "Crear Cuenta";
    botonCreateAcc.style.visibility = "hidden";
    botonCreateAcc.disabled = true;
    botonForgotten.style.visibility = "hidden";
    botonForgotten.disabled = true;
    botonBack.style.visibility = "visible";
    botonBack.disabled = false;
    isCreateAccOn = true;
}

function setForgotten() {
    document.querySelector("h1").innerText = "Cambiar Contraseña";
    document.querySelector('label[for="password"]').innerText = "Contraseña Nueva";
    btnLogin.innerText = "Cambiar Contraseña";
    botonCreateAcc.style.visibility = "hidden";
    botonCreateAcc.disabled = true;
    botonForgotten.style.visibility = "hidden";
    botonForgotten.disabled = true;
    botonBack.style.visibility = "visible";
    botonBack.disabled = false;
    isForgottenOn = true;
}

function resetearPagina() {
    botonBack.style.visibility = "hidden";
    botonBack.disabled = true;
    document.querySelector("h1").innerText = "Iniciar Sesión";
    document.querySelector('label[for="password"]').innerText = "Contraseña";
    btnLogin.innerText = "Iniciar Sesión";
    botonCreateAcc.innerText = "Crear Cuenta";
    botonCreateAcc.style.visibility = "visible";
    botonCreateAcc.disabled = false;
    botonForgotten.style.visibility = "visible";
    botonForgotten.disabled = false;
    isForgottenOn = false;
    isCreateAccOn = false;
}

init();