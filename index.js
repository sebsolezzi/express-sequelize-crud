import express from "express";
import bodyParser from "body-parser";
import { Sequelize, DataTypes } from "sequelize";

//creando instancia de base de datos
const sequelize = new Sequelize('mysql://root@localhost:3306/expressdb', {})


//probando conexion
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    sequelize.sync()
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

//modelo sql

const Persona = sequelize.define('persona', {

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

const app = express()
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('Hello World')
})

//listar
app.get('/listar', async (req, res) => {

    try {
        const respuesta = await Persona.findAll()
        return res.status(200).json({ "res": respuesta })
    } catch (error) {
        return res.status(404).json({ 'msg': error })
    }
})

//crear una persona
app.post('/crear', async (req, res) => {

    try {
        const nombre = req.body.nombre
        const apellido = req.body.apellido
        const nuevaPersona = Persona.build({ nombre, apellido })
        const respuesta = await nuevaPersona.save()
        return res.status(200).json({ 'msg': "recibido", "res": respuesta })
    } catch (error) {
        return res.status(404).json({ 'msg': error })
    }
})
app.put('/editar/:id', async (req, res) => {

    try {

        const nombre = req.body.nombre
        const apellido = req.body.apellido
        const id = req.params.id

        //edito un registro y como la funcion me regresa solo el id uso el mismo id para buscar la persona y traerla de nuevo
        //para regresarla en la respuesta json
        const personaEditada = await Persona.update({ nombre, apellido },{where:{id}})

        const persona = await Persona.findOne({where:{id:personaEditada}})
        
        return res.status(200).json({ 'msg': "persona editada", "res": persona })
    } catch (error) {
        return res.status(404).json({ 'msg': error })
    }
})

//borra una persona
app.delete('/borrar/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        await Persona.destroy({
            where:{id:req.params.id}
        })
        return res.status(200).json({ 'msg': "persona borrada" })
    } catch (error) {
        return res.status(404).json({ 'msg': error })
    }
})

app.listen(3000, () => {
    console.log("App corriendo en puerto 3000")
})

