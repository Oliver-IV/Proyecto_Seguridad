const btnLogout = document.querySelector("#logout") ;
const btnEncrypt = document.querySelector(".btnEncrypt") ;
const btnDecrypt = document.querySelector(".btnDecrypt") ;
const txtEncrypt = document.querySelector(".txtEncrypt")
const txtKeyEncrypt = document.querySelector(".txtKeyEncrypt") ;
const txtEncryptedText = document.querySelector(".txtEncryptedText") ;
const txtDecrypt = document.querySelector(".txtDecrypt") ;
const txtKeyDecrypt = document.querySelector(".txtKeyDecrypt") ;
const txtDecryptedText = document.querySelector(".txtDecryptedText") ;

function encriptarAES(contrasenia, key) {
    const contraseniaEncriptada = CryptoJS.AES.encrypt(contrasenia, key).toString();
    return contraseniaEncriptada;
}

function desencriptarAES(contraseniaEncriptada, key) {
    try {
        const decryptedBytes = CryptoJS.AES.decrypt(contraseniaEncriptada, key);
        const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
        return decryptedMessage;
    } catch (error) {
        return '' ;
    }
}

const init = () => {

    btnLogout.onclick = () => {
        document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;' ;
        document.location.href = "/" ;
    } ;

    btnEncrypt.onclick = () => {
        txtEncryptedText.value = encriptarAES(txtEncrypt.value, txtKeyEncrypt.value) ;
        console.log(txtEncryptedText.value) ;
    } ;

    btnDecrypt.onclick = () => {
        txtDecryptedText.value = desencriptarAES(txtDecrypt.value, txtKeyDecrypt.value) ;
        if(txtDecryptedText.value == '') {
            Swal.fire("Clave invalida", 'La clave ingresada es invalida', "error") ;
        }
    } ;

}

init() ;