import { Persona } from "../models/Persona.js"

export const getPersonas = async (req,res) =>{
    try {
        const respuesta = await Persona.findAll()
        return res.status(200).json({ "res": respuesta })
    } catch (error) {
        return res.status(404).json({ 'msg': error })
    }
}

export const createPersona = async (req, res) => {
    try {
        const nombre = req.body.nombre
        const apellido = req.body.apellido
        const nuevaPersona = Persona.build({ nombre, apellido })
        const respuesta = await nuevaPersona.save()
        return res.status(200).json({ 'msg': "recibido", "res": respuesta })
    } catch (error) {
        return res.status(404).json({ 'msg': error })
    }
}

export const editPersona = async (req, res) => {

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
}

export const deletePersona = async (req, res) => {
    try {
        console.log(req.params.id);
        await Persona.destroy({
            where:{id:req.params.id}
        })
        return res.status(200).json({ 'msg': "persona borrada" })
    } catch (error) {
        return res.status(404).json({ 'msg': error })
    }
}