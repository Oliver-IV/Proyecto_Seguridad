import UsuarioDTO from "../persistencia/UsuarioDTO.js";
import UsuariosDAO from "../persistencia/UsuariosDAO.js";

const usuariosDAO = new UsuariosDAO();

function login(req, res) {

    usuariosDAO.validarUsuario(req.body.correo, req.body.password).then(usuario => {
        if (usuario != null) {
            res.status(200).send();
        }
    }).catch(err => {
        res.status(401).send(err.message);
    });

}

function registrar(req, res) {
    console.log("CUERPO :");
    console.log(req.body);
    usuariosDAO.agregarUsuario(new UsuarioDTO(req.body.nombre, req.body.apellidop, req.body.apellidom, req.body.correo, req.body.password)).then(usuario => {
        res.status(200).send();
    }).catch(err => {
        res.status(401).send(err.message);
    });

}

function cambiarContrasenia(req, res) {

    usuariosDAO.cambiarContrasenia(req.body["correo"], req.body["password"]).then(cambio => {
        if (cambio) {
            res.status(200).send();
        } else {
            res.status(401).send("Los datos ingresados no coinciden");
        }
    }).catch(err => {
        res.status(500).send("Hubo un error al cambiar la contraseña");
    });

}

export const methods = {
    login,
    registrar,
    cambiarContrasenia
};