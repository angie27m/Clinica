import { ExamenesDialogoconsulComponent } from './pages/consultas/examenes-consultas/examenes-dialogoconsul/examenes-dialogoconsul.component';
import { DetallesConsultasDialogoComponent } from './pages/consultas/detalles-consultas/detalles-consultas-dialogo/detalles-consultas-dialogo.component';
import { MedicosDialogoComponent } from './pages/medicos/medicos-dialogo/medicos-dialogo.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './_material/material/material.module';
import { ServerErrorInterceptorService } from './_shared/server-error-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Not404Component } from './pages/not404/not404.component';
import { ErrorComponent } from './pages/error/error.component';
import { ConsultasComponent } from './pages/consultas/consultas.component';
import { ConsultasDialogoComponent } from './pages/consultas/consultas-dialogo/consultas-dialogo.component';
import { MatDatepickerModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MedicosComponent } from './pages/medicos/medicos.component';
import { ExamenesComponent } from './pages/examenes/examenes.component';
import { ExamenesDialogoComponent } from './pages/examenes/examenes-dialogo/examenes-dialogo.component';
import { DetallesConsultasComponent } from './pages/consultas/detalles-consultas/detalles-consultas.component';
import { ExamenesConsultasComponent } from './pages/consultas/examenes-consultas/examenes-consultas.component';
import { GuardarConsultasComponent } from './pages/consultas/guardar-consultas/guardar-consultas.component';


@NgModule({
  declarations: [
    AppComponent,
    ConsultasComponent,
    Not404Component,
    ErrorComponent,
    ConsultasComponent,
    ConsultasDialogoComponent,
    InicioComponent,
    MedicosComponent,
    MedicosDialogoComponent,
    ExamenesComponent,
    ExamenesDialogoComponent,
    DetallesConsultasComponent,
    DetallesConsultasDialogoComponent,
    ExamenesConsultasComponent,
    ExamenesDialogoconsulComponent,
    GuardarConsultasComponent
  ], entryComponents: [
    ConsultasDialogoComponent,
    MedicosDialogoComponent,
    ExamenesDialogoComponent,
    DetallesConsultasDialogoComponent,
    ExamenesDialogoconsulComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
