import Conexion from "../conexion/Conexion.js" ;
import Usuario from "../dominio/Usuario.js" ;
import Cuenta from "../dominio/Cuenta.js" ;
import UsuarioDTO from "./UsuarioDTO.js" ;
import CuentaDTO from "./CuentaDTO.js" ;
import crypto from "crypto" ;
import CryptoJS from "crypto-js";
import dotenv from "dotenv"; 

class UsuariosDAO {

    constructor() {
        dotenv.config() ;
    }

    agregarUsuario(usuarioNuevo) {
        return new Promise((resolve, reject) => {
            const conexion = new Conexion().conexion ;
            const valores = [usuarioNuevo.nombres, usuarioNuevo.apellidoP, usuarioNuevo.apellidoM, usuarioNuevo.correo, encriptarAES(usuarioNuevo.contrasenia)] ;
            const sentencia = `
                INSERT INTO usuario(nombres, apellido_paterno, apellido_materno, correo, contrasenia) VALUES (?, ?, ?, ?, ?) ;
            ` ;
            conexion.query(sentencia, valores, (err, results) => {
                if(err) {
                    switch (err.code) {
                        case "ER_DUP_ENTRY":
                            reject(new Error("Ya existe un Usuario con ese correo")) ;
                            break;
                        default:
                            reject(new Error("Hubo un error al registrarse")) ;
                            break;
                    }
                    reject(err) ;
                } else {
                    console.log('Usuario Agregado') ;
                    resolve(new Usuario(results.insertId, valores[0], valores[1], valores[2], valores[3], valores[4])) ;
                }
                conexion.end() ;
            }) ;
        }) ;
        
    }

    agregarCuenta(cuentaDTO) {
        return new Promise((resolve, reject) => {
            const conexion = new Conexion().conexion ;
            const valores = [cuentaDTO.nombre, cuentaDTO.contrasenia, cuentaDTO.idUsuario] ;
            const sentencia = `
                INSERT INTO cuenta(nombre, contrasenia, id_usuario) VALUES(?, ?, ?);
            ` ;
            conexion.query(sentencia, valores, (err, results) => {
                if(err) {
                    reject(err) ;
                    conexion.end() ;
                } else {
                    resolve(new Cuenta(results.insertId, valores[0], valores[1], valores[2])) ;
                    conexion.end() ;
                }
            }) ;

        }) ;
    }

    validarUsuario(correo, contrasenia) {
        return new Promise((resolve, reject) => {
            const conexion = new Conexion().conexion ;
            const valores = [correo, encriptarAES(contrasenia)] ;
            const sentencia = `
                SELECT id, nombres, apellido_paterno, apellido_materno, correo, contrasenia FROM usuario WHERE correo = ?;
            ` ;
            conexion.query(sentencia, valores, (err, results) => {
                if(err) {
                    reject(new Error("Hubo un error al iniciar sesion")) ;
                    conexion.end() ;
                } else {
                    const usuario = results[0] ;

                    if(usuario != undefined || usuario != null) {
                        console.log(usuario) ;
                        if(desencriptarAES(usuario.contrasenia) === contrasenia) {
                            resolve(new Usuario(usuario.id, usuario.nombres, usuario.apellido_paterno, usuario.apellido_materno, usuario.correo)) ;
                        } else {
                            reject(new Error("Los datos ingresados no coinciden")) ;
                        }
                    } else {
                        reject(new Error("Los datos ingresados no coinciden")) ;
                    }
                    conexion.end() ;
                }
            })
        }) ;
    }

    existeUsuario(correo) {
        return new Promise((resolve, reject) => {
            const conexion = new Conexion().conexion ;
            conexion.query("SELECT COUNT(*) AS count FROM usuario WHERE correo = ? ;", correo, (err, results) => {
                if(err) {
                    console.log('Error al validar usuario')
                    reject(err) ;
                    conexion.end() ;
                    
                } else {
                    if(results.length == 0) {
                        resolve(false) ;
                    } else {
                        resolve(true) ;
                    }
                    conexion.end() ;
                }
            }) ;
        }) ;
    }

    cambiarContrasenia(correo, contrasenia) {
        return new Promise((resolve, reject) => {
            const conexion = new Conexion().conexion ;
            const sentencia = `
                UPDATE usuario SET contrasenia = ? WHERE correo = ? ;
            ` ;
            const valores = [encriptarAES(contrasenia), correo] ;
            conexion.query(sentencia, valores, (err, results) => {
                if(err) {
                    reject(err) ;
                    conexion.end() ;
                } else {
                    if(results.affectedRows == 1) {
                        resolve(true) ;
                    } else {
                        resolve(false) ;
                    }
                    conexion.end() ;
                }
            }) ;
        }) ;
    }

}

function generarSHA256(contrasenia) {
    const hash = crypto.createHash("sha256") ;

    hash.update(contrasenia) ;

    return hash.digest("hex") ;
}

function encriptarAES(contrasenia) {
    const key = process.env.AES_KEY ;
    const contraseniaEncriptada = CryptoJS.AES.encrypt(contrasenia, key).toString();
    return contraseniaEncriptada;
}

function desencriptarAES(contraseniaEncriptada) {
    const key = process.env.AES_KEY ;;
    const decryptedBytes = CryptoJS.AES.decrypt(contraseniaEncriptada, key);
    const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
}


export default UsuariosDAO ;