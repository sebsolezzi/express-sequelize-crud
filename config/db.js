import { Sequelize} from "sequelize";

//creando conexion a la base de datos
export const sequelize = new Sequelize('mysql://root@localhost:3306/expressdb', {})