const inputEmail = document.getElementById("correo");
const inputPassword = document.getElementById("password");
const btnLogin = document.getElementById("login");
const botonCreateAcc = document.getElementById("createAcc");
const botonForgotten = document.getElementById("forgotten");
const botonBack = document.getElementById("goBack");

function iniciarSesion() {

    const responseCaptcha = grecaptcha.getResponse() ;

    if(!(responseCaptcha == "" || responseCaptcha == undefined || responseCaptcha == null)) {
        const body = {
            "correo": inputEmail.value,
            "password": inputPassword.value
        };
    
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.ok) {
                    window.location.href = '/menu';
                } else {
                    return response.text().then(errorMessage => {
                        alert(errorMessage);
                        window.location.href = '/';
                    });
                }
            })
            .catch(error => {
                alert('Se produjo un error al iniciar sesión. Por favor, inténtalo de nuevo.');
            });
    } else {
        alert("Necesitas validar el captcha antes de continuar") ;
    } 
}

const init = () => {
    btnLogin.onclick = () => {

        iniciarSesion() ;

    };

    botonCreateAcc.onclick = () => {

        window.location.href = '/signup';

    } ;

    botonForgotten.onclick = () => {

        window.location.href = '/forgotten' ;

    } ;

} ;

init() ;