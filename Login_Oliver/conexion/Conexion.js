import sql from "mysql2";
import { DB_HOST } from "../config.js";
import { DB_NAME } from "../config.js";
import { DB_PASSWORD } from "../config.js";
import { DB_PORT } from "../config.js";
import { DB_USER } from "../config.js";

class Conexion {
    constructor() {
        this.conexion = sql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            port: DB_PORT,
            database: DB_NAME
        }) ;
    }
}


export default Conexion ;
