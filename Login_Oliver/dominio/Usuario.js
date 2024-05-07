class Usuario {

    constructor(id, nombres, apellidoP, apellidoM, correo, contrasenia) {
        this.id = id ;
        this.nombres = nombres ;
        this.apellidoP = apellidoP ;
        this.apellidoM = apellidoM ;
        this.correo = correo ;
        this.contrasenia = contrasenia ;
    }

    toJSON() {
        return {
            id: this.id,
            nombres: this.nombres,
            apellidoP: this.apellidoP,
            apellidoM: this.apellidoM,
            correo: this.correo
        };
    }
}

export default Usuario ;