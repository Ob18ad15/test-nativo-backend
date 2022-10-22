// import * as mongoose from 'mongoose';
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const taskSchema = new Schema({

  titulo: { type: String, unique: true, required: [true, 'Titulo obligatorio'] },
  descripcion: { type: String,  required: [true, 'DEscripcion es obligatoria'] },
  creador: { type: String, required: [true, 'nombre de creador es obligatorio'] },
  estado: { type: Boolean, default: false },
});

 /* sobrescribir  mombre de la clave _id que mongoose le coloca por default a los registros 
 por uno personalizado*/

/*  taskSchema.method('toJson', function (){
    const { __v, _id, ...objects} = this.toObject();
    object.uid = _id;
    return object
  }) */

// Convertir a un modelo 
module.exports = mongoose.model('Task', taskSchema);

