import jsonwebtoken from "jsonwebtoken" ;
import dotenv from "dotenv" ;
import UsuariosDAO from "../persistencia/UsuariosDAO.js";
import Usuario from "../dominio/Usuario.js";

dotenv.config() ;

const usuariosDAO = new UsuariosDAO() ;

function validarSesionUsuarioLoggeado(req, res, next) {
    validarCookie(req).then(logged => {
        if(logged) {
            next() ;
        } else {
            res.redirect("/") ;
        }
    }) ;
}

function validarSesionUsuarioNoLoggeado(req, res, next) {
    validarCookie(req).then(logged => {
        if(!logged) {
            next() ;
        } else {
            res.redirect("/encrypt") ;
        }
    }) ;
}

function validarCookie(req) {
    return new Promise((resolve, reject) => { 
        try {
            const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
            const decode = jsonwebtoken.verify(cookieJWT, process.env.JWT_KEY);
    
            usuariosDAO.existeEnBD(new Usuario(decode.id, decode.nombres, decode.apellidoP, decode.apellidoM, decode.correo)).then(existe => {
                if (existe) {
                    resolve(true) ;
                } else {
                    resolve(false);
                }
            }).catch(err => {
                console.log("Error en BD");
                resolve(false);
            });
        } catch (error) {
            resolve(false) ;
        }
    }) ;
}

export const methods = {
    validarSesionUsuarioLoggeado,
    validarSesionUsuarioNoLoggeado
} ;




