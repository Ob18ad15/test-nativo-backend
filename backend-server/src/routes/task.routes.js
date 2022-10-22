const { Router } = require ('express');
const { getTasks, createTasks } = require ('../controllers/task.controller');
const { verificarCampos } = require ('../middleware/validaciones.campos')

// importar paquete para crear validacioines de la data o campos recibida en las peticiones
const { check } = require('express-validator')


const router = Router();

//Defino las rutas y controladores que van a procesar las peticiones y defino los midelware para los campos recibidos
//listar
router.get('/', getTasks );

// crear nueva tarea
router.post('/', 
[
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('creador', 'El titulo es obligatorio').not().isEmpty(),
    verificarCampos
],createTasks );




module.exports = router;