import express from "express" ;
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { methods as autenticacion } from "./controllers/autenticacion.js";
import jsonwebtoken from "jsonwebtoken" ;
import dotenv from "dotenv" ;
import { PORT } from "./config.js";

const dirName = dirname(fileURLToPath(import.meta.url)) ;
const app = express() ;

app.use(bodyParser.urlencoded({extended: true})) ;
app.use(express.static("public")) ;
app.use(express.json()) ;


app.get("/", (req, res) => {
    res.sendFile(dirName + "/public/pages/index.html") ;
    console.log('Index mandado') ;
}) ;

app.get("/menu", (req, res) => { 
    res.sendFile(dirName + "/public/pages/menu.html") ;
    console.log("Menu Mandado") ;
}) ;

 
app.post("/", (req, res) => {
    console.log(req.body) ;
    
    autenticacion.login(req, res) ;
}) ;

app.get("/signup", (req, res) => {
    res.sendFile(dirName + "/public/pages/register.html") ;
    console.log("Registrar Mandado") ;
}) ;

app.post("/signup", (req, res) => {

    autenticacion.registrar(req, res) ; 

}) ;

app.get("/forgotten", (req, res) => {
    res.sendFile(dirName + "/public/pages/changepassword.html") ;
    console.log("Olvidar Contrasenia mandado") ;
})

app.post("/forgotten", (req, res) => {
    console.log(req.body) ;

    autenticacion.cambiarContrasenia(req, res) ;

}) ;

app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}`) ;
}) ;

console.log(dirName) ;


























//VERIFICAR BIEN LO DE LA CONEXION POR QUE SE CIERRA CADA QUE LLAMAS A UN METODO
//SUGERENCIA: CONVERTIR CONEXION A CLASE PARA CREAR UNA CONEXION CADA QUE SE LLAME A UN METODO

/*
var usuarioNuevo = new UsuarioDTO('Beto', 'Alvarado', 'Solano', 'veto@gmail.com', 'naranja777') ;
usuariosDAO.agregarUsuario(usuarioNuevo).then(usuario => {
    console.log("Usuario agregado: " + usuario.id + ", " + usuario.nombres) ;
}).catch(error => {
    controlErrores(error.code) ;
}) ;
*/

/*
usuariosDAO.existeUsuario("amos@gmail.com").then(existe => {
    if(existe) {
        console.log('El usuario con ese correo ya existe') ;
    } else {
        console.log('El usuario esta disponible') ;
    }
}).catch(error => {
    console.log(error) ;
}) ;

*/

/*
const cuentaNueva = new CuentaDTO('Netflix', 'neflix123', 1) ;
usuariosDAO.agregarCuenta(cuentaNueva).then(cuenta => {
    console.log("Cuenta agregada: " + cuenta.id + ", " + cuenta.nombre) ;
}).catch(err => {
    controlErrores(err) ;
}) ;
*/

/* 
usuariosDAO.validarUsuario('jullian@gmail.com', 'pera555').then(valido => {
    if(valido) {
        console.log('El usuario existe') ;
    } else {
        console.log('El usuario no es valido') ;
    }
}).catch(err => {
    console.log(err) ;
}) ;

*/

/*
usuariosDAO.cambiarContrasenia('jullian@gmail.com', 'pera555').then(cambio => {
    if(cambio) {
        console.log('Se cambio la contrasenia') ;
    } else {
        console.log('No se cambio la contrasenia') ;
    }
}) ;

*/
function controlErrores(err) {
    if(err == 'ERR_DUP_ENTRY') {
        console.log('El correo ya existe') ;
    } else {
        console.log('Error al agregar cuenta') ;
    }
}
