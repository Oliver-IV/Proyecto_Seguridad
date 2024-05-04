function encriptarAES(contrasenia, key) {
    const contraseniaEncriptada = CryptoJS.AES.encrypt(contrasenia, key).toString();
    return contraseniaEncriptada;
}

function desencriptarAES(contraseniaEncriptada, key) {
    const decryptedBytes = CryptoJS.AES.decrypt(contraseniaEncriptada, key);
    const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
}