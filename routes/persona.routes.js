import {Router} from 'express'
import {getPersonas,createPersona,editPersona,deletePersona} from '../controllers/persona.controllers.js'

export const router = Router()

//listar todas las personas
router.get('/listar',getPersonas)

//crear una persona
router.post('/crear',createPersona)

//editar una persona
router.put('/editar/:id',editPersona)

//borra una persona
router.delete('/borrar/:id',deletePersona )

 
