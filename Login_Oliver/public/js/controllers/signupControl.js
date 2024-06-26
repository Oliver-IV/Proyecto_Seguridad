const inputEmail = document.getElementById("correo");
const inputEmailConfirm = document.getElementById("correoConfirmar");
const inputPassword = document.getElementById("password");
const inputName = document.getElementById("nombre") ;
const inputLastN1 = document.getElementById("apellidop") ;
const inputLastN2 = document.getElementById("apellidom") ;
const btnCreate = document.getElementById("crear");
const btnBack = document.getElementById("back");

function crearCuenta() {

    const responseCaptcha = grecaptcha.getResponse() ;

    if(!(responseCaptcha == "" || responseCaptcha == undefined || responseCaptcha == null)) {
        if(inputEmail.value === inputEmailConfirm.value) {
            const body = {
                "correo": inputEmail.value,
                "password": inputPassword.value,
                "nombre": inputName.value,
                "apellidop": inputLastN1.value,
                "apellidom": inputLastN2.value
            };
        
            fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then(response => {
                    if (response.ok) {
                        Swal.fire("Cuenta creada", "Se ha creado la cuenta!", "success").then(() => {
                            window.location.href = '/';
                        }) ;
                    } else {
                        return response.text().then(errorMessage => {
                            Swal.fire("Error", errorMessage, "error") ;
                        });
                    }
                })
                .catch(error => {
                    Swal.fire("Error", 'Se produjo un error al crear la cuenta. Por favor, inténtalo de nuevo.', "error") ;
                });
        } else {
            Swal.fire("Error", 'Los correos no coinciden', "error") ;
        }
    } else {
        Swal.fire("Error", 'Necesitas validar el captcha antes de continuar', "error") ;
    }
}

const init = () => {

    btnCreate.onclick = () => {
        crearCuenta() ;
    } ;

    btnBack.onclick = () => {
        window.location.href = '/' ;
    } ;

} ;

init() ;