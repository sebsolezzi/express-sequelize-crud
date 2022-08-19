import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";


//modelo sql
export const Persona = sequelize.define('persona', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    }
})