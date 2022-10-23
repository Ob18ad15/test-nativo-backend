import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importamos los Componentes que se asocian con cada una de las rutas disponibles 

import { TareaComponent } from './pages/tarea/tarea.component'
import { TareasComponent } from './pages/tareas/tareas.component'



//configuracion de rutas
// path: '**' cualquier ruta no valida se redicciona a la pagina de lista de tareas
//tarea/:id esta ruta requiere el id de la tarea para visualizarla individualmente
const routes: Routes = [
  { path: 'tareas', component: TareasComponent} ,
  { path: 'tarea/:id', component: TareaComponent},
  { path: '**' , pathMatch: 'full', redirectTo: 'tareas'},
];


// importamos nuestras rutas principales RouterModule.forRoot( routes )
// exportamos RouterModule para que tenga alcance global desde cualquier modulo
@NgModule({
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [
    RouterModule
  ]
})

//AppRoutingModule Lo exportamos para registrarlo en el archivo appModule

export class AppRoutingModule { }
