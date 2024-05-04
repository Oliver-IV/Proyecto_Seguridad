import express from "express" ;
import { dirname } from "path";
import { fileURLToPath } from "url";

const dirName = dirname(fileURLToPath(import.meta.url)) ;

const routerMenu = express.Router() ;

routerMenu.get("/", (req, res) => {
    console.log(dirName + "/public/pages/menu.html") ;
    console.log("Menu Mandado") ;
}) ;

export default routerMenu ;