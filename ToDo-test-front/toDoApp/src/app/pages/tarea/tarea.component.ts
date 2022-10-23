import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
// importamos el modelo de la tarea
import { TareaModel } from '../../models/tareas.model'
// importamos el servicio que se encargara de toda la logioca del crude
import { TareasService } from '../../services/tareas.service'



@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})

export class TareaComponent implements OnInit {
  // creamos una propiedad de tipo Tarea model
  tarea = new TareaModel();


  constructor(private tareaService: TareasService, private route: ActivatedRoute, private router:Router) {

  }

  ngOnInit(): void {

    // con el route obtengo el valor que llega en la url y con snapshop controlo los cambios que tiene la url
    const id = this.route.snapshot.paramMap.get('id');

    // Se valida que el valor que se va a pasar para el servicio nunca sea null
    const id_tarea: string = id !== null ? id : 'nuevo';

    /* si se cumple la condicion que el id que se recibe es diferente a nuevo me indica que debo realizar una peticion para traer la data
    desde el servicio */
    if (id_tarea !== 'nuevo') {

      this.tareaService.getTarea(id_tarea).subscribe(resp => {

        console.log(Object.values(resp))
        let tareas: TareaModel[] = [];
        const arrayExtraer = Object.values(resp);
        //desestructuramos los valores del array
        const [id, titulo, descripcion, creador, estado] = arrayExtraer

        // asignamos los valores al objeto tarea correspondientemente para mostrarlo en el form
        // this.tarea._id = id;
        this.tarea.titulo = titulo;
        this.tarea.descripcion = descripcion;
        this.tarea.creador = creador;
        this.tarea.estado = estado;

      })

    }

  }

  guardar(form: NgForm) {
    //console.log(form)


    // con el route obtengo el valor que llega en la url y con snapshop controlo los cambios que tiene la url
    const id = this.route.snapshot.paramMap.get('id');

    if (form.invalid) {
      console.log('form invalido');
      return;
    }


    //dependiendo del parametro recibido en la url se decide si es una actualización o un registro nuevo
    if (id == 'nuevo') {

      this.tareaService.crearTarea(this.tarea).subscribe(res => {
        console.log(res);
      })
    } else {
      // Se valida que el valor que se va a pasar para el servicio nunca sea null
      const id_tarea: string = id !== null ? id : 'nuevo';

      this.tareaService.actualizarTarea(id_tarea, this.tarea).subscribe(res => {
        console.log(res);
      })
    }
    // redirecionamiento Forzado
    this.router.navigate(['/']);

  }

  notificar(form: NgForm) {

    if (form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor complete todos los campos en el form!',

      })
      return;
    }

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {

      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
        this.guardar(form)
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
        form.resetForm();
        this.tarea.estado = false;

      }
    })



  }

}
