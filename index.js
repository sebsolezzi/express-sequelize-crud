import express from "express";
import bodyParser from "body-parser";
import {router} from './routes/persona.routes.js'
import { sequelize } from "./config/db.js";

const app = express()
app.use(bodyParser.json())
app.use('/api',router)

//probando conexion
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    sequelize.sync() //actualizacon tablas
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.listen(3000, () => {
    console.log("App corriendo en puerto 3000")
})

