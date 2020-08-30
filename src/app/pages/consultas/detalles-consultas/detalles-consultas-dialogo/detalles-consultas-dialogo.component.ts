import { DetalleConsultaService } from './../../../../_service/detalleConsulta.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DetalleConsulta } from './../../../../_model/DetalleConsulta';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-detalles-consultas-dialogo',
  templateUrl: './detalles-consultas-dialogo.component.html',
  styleUrls: ['./detalles-consultas-dialogo.component.css']
})
export class DetallesConsultasDialogoComponent implements OnInit {

  detalleConsulta: DetalleConsulta;
  isValid: boolean = true;

  constructor(private dialogRef: MatDialogRef<DetallesConsultasDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DetalleConsulta,
    private snackBar: MatSnackBar,
    private service: DetalleConsultaService
  ) { }

  ngOnInit() {    
    this.detalleConsulta = new DetalleConsulta();
    this.detalleConsulta.id = this.data.id;
    this.detalleConsulta.diagnostico = this.data.diagnostico;
    this.detalleConsulta.tratamiento = this.data.tratamiento;
  }

  operar() {
    this.validar();
    if (this.isValid == true) {
      console.log(this.detalleConsulta);
      this.service.editar(this.detalleConsulta).subscribe(() => {
        this.service.variableReactiva.next('Se ha editado correctamente');
        this.cerrarDialogo();
      });
    }
  }

  validar() {
    if (this.detalleConsulta.diagnostico != null) {
      if (this.detalleConsulta.diagnostico.length < 3 || this.detalleConsulta.diagnostico.length > 49) {
        this.mostrarMensaje('El diagnóstico debe contener mínimo 3 caracteres y máximo 50', 'ERROR');
        this.isValid = false;
      }else{
        this.isValid = true;
      }
    } 
    if (this.detalleConsulta.tratamiento != null) {
      if (this.detalleConsulta.tratamiento.length < 3 || this.detalleConsulta.tratamiento.length > 49) {
        this.mostrarMensaje('El tratamiento debe contener mínimo 3 caracteres y máximo 50', 'ERROR');
        this.isValid = false;
      }else{
        this.isValid = true;
      }
    } 
  }

  mostrarMensaje(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  cerrarDialogo() {
    this.dialogRef.close();
  }
}