import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// importamos el modelo de la tarea
import { TareaModel } from '../models/tareas.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TareasService {
  private url = 'http://localhost:3001/api/tasks';
  constructor( private http: HttpClient) { }

  crearTarea (tarea : TareaModel){

    return this.http.post(`${ this.url }`, tarea );

  }

  // metodo para obtener todas las tareas realizando la peticion al backend
  getTareas (){
    return this.http.get(`${ this.url }`)
    .pipe(
      map(resp => this.crearArreglo(resp))
    )
  }

  //metodo para actualizar las tareas swe requier el id de la tarea
  actualizarTarea( id: string , tarea : TareaModel ) {
    console.log( id, tarea)
    return this.http.put(`${ this.url }/${ id }`, tarea );
  }

  // metodo que maniupula la respuestas de la petición y la comvierte en un arreglo 
  private crearArreglo ( task: object ) {
    let tareas: TareaModel[] = [];
    const arrayExtraer= Object.values(task);
    tareas =arrayExtraer[0]

     if (task === null) { return []; }

    return tareas
    
     
  }

  //metodo para obtener una tarea especifica
  // recibe el argumento y lo concatena a la url del
  getTarea (id: string) {

    return this.http.get(`${ this.url }/${ id }`);

  }
}
