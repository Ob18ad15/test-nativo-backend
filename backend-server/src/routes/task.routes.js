const { Router } = require ('express');
const { getTasks, createTasks, updateTask, getTaskID  } = require ('../controllers/task.controller');
// Importamos midelware que valida los valores recibidos de un request
const { verificarCampos } = require ('../middleware/validaciones.campos')

// importar paquete para crear validacioines de la data o campos recibida en las peticiones
const { check } = require('express-validator')


const router = Router();

//Defino las rutas y controladores que van a procesar las peticiones y defino los midelware para los campos recibidos
//listar
router.get('/', getTasks );

router.get('/:id', getTaskID);

// crear nueva tarea
router.post('/', 
[
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('creador', 'El nombre del creador es obligatorio').not().isEmpty(),
    verificarCampos
],createTasks );

// Actualizar Tareas
router.put('/:id',
[
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('creador', 'El nombre del creador es obligatorio').not().isEmpty(),
    verificarCampos
],
 updateTask)




module.exports = router;