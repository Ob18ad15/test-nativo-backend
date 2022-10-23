
//Importamos el modelo de la tareas
const Task = require('../models/task.models');

const getTasks = async (req, res) => {
  try {
    task = await Task.find()
    return res.json({
      mensaje: task
    });

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrió un error',
      error
    })
  }
}

const createTasks = async (req, res) => {
  try {
    // validar si el titulo es unico
    const { titulo } = req.body;
    const existeTitulo = await Task.findOne({ titulo })

    if (existeTitulo) {
      return res.status(400).json({
        error: 'El titulo de la tarea debe ser unico'
      })
    }

       // Recibimos los valores de la petición y solo tomamos campos validos por si se envia campos adicionales
       const body = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        creador: req.body.creador,
        estado: req.body.estado,
      }

    const task = new Task(body);
    await task.save();

    return res.json({
      mensaje: task
    });  

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: 'Ocurrió un error validar logs',
      error: this.error
    })
  }
}

const updateTask = async (req, res) => {
  try {
    // leer el valor recibido en la url de la peticion
    const _id = req.params.id;

    // Busca en la BD la tarea por  el uid recibido
    const taskInDB = await Task.findById({ _id })
    // validar que la tarea que  exista en la BD
    if (!taskInDB) {
      return res.status(404).json({
        error: 'el id de la tarea no existe en la BD'
      })

    }

    // Recibimos los valores de la petición
    const body = {
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      creador: req.body.creador,
      estado: req.body.estado,
    }
    // ejecutamos la actualización pasando el uid para actualizar el registro
    const tareaToUpdate = await Task.findByIdAndUpdate(_id, body)
    res.json({
      mensaje: 'Tarea actualizada exitosamente',
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mensaje: 'Ocurrió un error al actualizar... validar logs',
      error
    })
  }
}

// Obtener tarea por su id

const getTaskID = async(req, res) => {
  try {

    const _id = req.params.id;
    const taskDB = await Task.findOne({_id})
    return res.json(taskDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrió un error al consultar la tarea por ID',
      error
    })
  }

}

module.exports = {
  getTasks,
  createTasks,
  updateTask,
  getTaskID
}