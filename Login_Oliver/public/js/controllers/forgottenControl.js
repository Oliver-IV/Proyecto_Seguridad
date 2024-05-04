const inputEmail = document.getElementById("correo");
const inputPassword = document.getElementById("password");
const btnChangeP = document.getElementById("changeP");
const btnBack = document.getElementById("back");

function cambiarContrasenia() {

    const body = {
        "correo": inputEmail.value,
        "password": inputPassword.value
    };

    fetch('/forgotten', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            if (response.ok) {
                alert("Se ha cambiado la contraseña!");
                window.location.href = '/';
            } else {
                return response.text().then(errorMessage => {
                    alert(errorMessage);
                    window.location.href = '/forgotten';
                });
            }
        })
        .catch(error => {
            alert('Se produjo un error al cambiar la contraseña. Por favor, inténtalo de nuevo.');
        });

}

const init = () => {

    btnChangeP.onclick = () => {

        cambiarContrasenia() ;

    } ;

    btnBack.onclick = () => {

        window.location.href = '/' ;

    } ;

} ;

init() ;