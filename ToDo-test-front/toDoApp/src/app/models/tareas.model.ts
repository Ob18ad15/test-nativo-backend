export class TareaModel {
  _id: string;
  titulo: string;
  creador: string;
  estado: boolean;
  descripcion: string;

  // cuando cree una tarea siempre inicia en false para determinar que no se ha completado
  constructor() {
    this.estado = false;
    this._id = '';
    this.titulo = '';
    this.creador = '';
    this.descripcion = '';
  } 
}

