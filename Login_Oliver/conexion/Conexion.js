import sql from "mysql";

class Conexion {
    constructor() {
        this.conexion = sql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'olipotro',
            database: 'bd_login'
        }) ;
    }
}


export default Conexion ;