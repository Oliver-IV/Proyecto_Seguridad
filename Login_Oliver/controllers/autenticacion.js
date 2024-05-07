import UsuarioDTO from "../persistencia/UsuarioDTO.js";
import UsuariosDAO from "../persistencia/UsuariosDAO.js";
import jsonwebtoken from "jsonwebtoken" ;
import dotenv from "dotenv" ;

const usuariosDAO = new UsuariosDAO();

dotenv.config() ;

function login(req, res) {

    usuariosDAO.validarUsuario(req.body.correo, req.body.password).then(usuario => {
        if (usuario != null) {
            console.log("Se inició sesión") ;
            //res.status(200).send();

            const token = jsonwebtoken.sign(usuario.toJSON(), process.env.JWT_KEY, {expiresIn: process.env.JWT_EXPIRES}) ;

            const cookieOption = {
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000) ,
                path: "/"
            } ;

            res.cookie("jwt", token, cookieOption) ;
            res.send({
                status: "ok",
                message: "Se inició sesión", 
                redirect: "/encrypt"
            }) ;
        }
    }).catch(err => {
        res.status(401).send(err.message);
    });

}

function registrar(req, res) {
    usuariosDAO.agregarUsuario(new UsuarioDTO(req.body.nombre, req.body.apellidop, req.body.apellidom, req.body.correo, req.body.password)).then(usuario => {
        console.log("Se agregó el Usuario") ;
        res.status(200).send();
    }).catch(err => {
        res.status(401).send(err.message);
    });

}

function cambiarContrasenia(req, res) {

    usuariosDAO.cambiarContrasenia(req.body["correo"], req.body["password"]).then(cambio => {
        if (cambio) {
            console.log("Se cambio la contraseña") ;
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