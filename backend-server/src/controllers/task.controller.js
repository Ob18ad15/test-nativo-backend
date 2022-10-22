
//Importamos el modelo de la tareas
const Task = require('../models/task.models');

const getTasks = (req, res) => {
  try {
    return res.json({
      mensaje: 'listado de todas las tarea'
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
    const { titulo, descripcion, creador } = req.body;
    const existeTitulo = await Task.findOne({ titulo })

    if (existeTitulo) {
      return res.status(400).json({
        error: 'El titulo de la tarea debe ser unico'
      })
    }

    const task = new Task(req.body);
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

module.exports = {
  getTasks,
  createTasks,
}