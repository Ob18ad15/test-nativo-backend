import { Component, OnInit } from '@angular/core';
// importamos el modelo de la tarea
import { TareaModel } from '../../models/tareas.model'
// importamos el servicio que se encargara de toda la logioca del crude
import { TareasService }  from '../../services/tareas.service'

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  //variable para controlar la carga de mensaje y mostrar el mensaje cuando se está cargando la data
  cargando = false;
  tareas: TareaModel[] = [];

  constructor(private tareaService: TareasService) { }

  ngOnInit() {
    this.cargando = true;
    this.tareaService.getTareas().subscribe(res => {
      this.tareas = res;
      this.cargando = false;
    });
  }

}
