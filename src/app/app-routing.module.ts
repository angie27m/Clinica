import { GuardarConsultasComponent } from './pages/consultas/guardar-consultas/guardar-consultas.component';
import { ExamenesDialogoconsulComponent } from './pages/consultas/examenes-consultas/examenes-dialogoconsul/examenes-dialogoconsul.component';
import { ExamenesConsultasComponent } from './pages/consultas/examenes-consultas/examenes-consultas.component';
import { DetallesConsultasComponent } from './pages/consultas/detalles-consultas/detalles-consultas.component';
import { ExamenesComponent } from './pages/examenes/examenes.component';
import { MedicosComponent } from './pages/medicos/medicos.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ConsultasComponent } from './pages/consultas/consultas.component';
import { ErrorComponent } from './pages/error/error.component';
import { Not404Component } from './pages/not404/not404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'consultas', component: ConsultasComponent, children: [
      { path: 'guardar-consultas', component: GuardarConsultasComponent },
      { path: 'examenes-consultas', component: ExamenesConsultasComponent },
      { path: 'detalles-consultas', component: DetallesConsultasComponent }
    ]
  },
  { path: 'not404', component: Not404Component },
  { path: 'inicio', component: InicioComponent },
  { path: 'medicos', component: MedicosComponent },
  { path: 'examenes', component: ExamenesComponent },
  { path: 'error/:status/:message', component: ErrorComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '**', redirectTo: 'not404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

