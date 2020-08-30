import { Medico } from './../../../_model/Medico';
import { ConsultaService } from './../../../_service/consulta.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Consulta } from './../../../_model/Consulta';
import { Component, OnInit, Inject } from '@angular/core';
import { MedicoService } from 'src/app/_service/medico.service';

@Component({
  selector: 'app-consultas-dialogo',
  templateUrl: './consultas-dialogo.component.html',
  styleUrls: ['./consultas-dialogo.component.css']
})



export class ConsultasDialogoComponent implements OnInit {

  consulta: Consulta;
  isSaving: boolean;
  minDate: Date;
  maxDate: Date;
  fechadia: string;
  fechames: string;
  fechaani: string;
  isValid: boolean = true;
  lista: Medico[];


  constructor(private dialogRef: MatDialogRef<ConsultasDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Consulta,
    private snackBar: MatSnackBar,
    private service: ConsultaService,
    private servMed: MedicoService
  ) { }

  ngOnInit() {
    this.consultarMedicos();
    if (this.data.id == null) {
      this.isSaving = true;
    } else {
      this.isSaving = false;
    }
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 0, 5, 0);
    this.consulta = new Consulta();
    this.consulta.id = this.data.id;
    this.consulta.medico = new Medico();
    this.consulta.medico = this.data.medico;
    this.consulta.fecha = this.data.fecha;
  }

  consultarMedicos() {
    this.servMed.listar().subscribe(data => {
      this.lista = data;
    });
  }

  operar() {
    this.validar();
    if (this.isValid == true) {
      if (this.isSaving) {
        this.service.guardar(this.consulta).subscribe(() => {
          console.log(this.consulta);
          this.service.variableReactiva.next('Se ha guardado correctamente');
          this.cerrarDialogo();
        });
      } else {
        this.cambiarFormatoFecha();
        let fechaAux = this.fechadia + '/' + this.fechaani + '/' + this.fechames + ' 00:00:00';
        this.consulta.fecha = fechaAux;
        this.service.editar(this.consulta).subscribe(() => {
          this.service.variableReactiva.next('Se ha editado correctamente');
          this.cerrarDialogo();
        });
      }
    }
  }

  validar() {
    if (this.isSaving) {
      if (this.consulta.medico != null) {
        if (this.consulta.medico.nombreMedico.length < 3 || this.consulta.medico.nombreMedico.length > 49) {
          this.mostrarMensaje('El nombre médico debe contener mínimo 3 caracteres y máximo 50', 'ERROR');
          this.isValid = false;
        } else {
          this.isValid = true;
        }
      } else {
        this.isValid = false;
        this.mostrarMensaje('El nombre médico es requerido', 'ERROR');
      }
      if (this.consulta.fecha == 'undefined/00 00:00:00' || this.consulta.fecha == 'undefined' || this.consulta.fecha == null) {
        this.isValid = false;
        this.mostrarMensaje('La fecha es requerida', 'ERROR');
      } else {
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

  cambiarFormatoFecha() {
    if (this.consulta.fecha != '00/undefined/00 00:00:00' && this.consulta.fecha != null) {
      var str = this.consulta.fecha.toString();
      this.fechadia = str.substring(8, 10);
      this.fechames = str.substring(11, 15);
      if ((str.substring(4, 7)) == 'Jan')
        this.fechaani = '01';
      else if ((str.substring(4, 7)) == 'Feb')
        this.fechaani = '02';
      else if ((str.substring(4, 7)) == 'Mar')
        this.fechaani = '03';
      else if ((str.substring(4, 7)) == 'Apr')
        this.fechaani = '04';
      else if ((str.substring(4, 7)) == 'May')
        this.fechaani = '05';
      else if ((str.substring(4, 7)) == 'Jun')
        this.fechaani = '06';
      else if ((str.substring(4, 7)) == 'Jul')
        this.fechaani = '07';
      else if ((str.substring(4, 7)) == 'Aug')
        this.fechaani = '08';
      else if ((str.substring(4, 7)) == 'Sep')
        this.fechaani = '09';
      else if ((str.substring(4, 7)) == 'Oct')
        this.fechaani = '10';
      else if ((str.substring(4, 7)) == 'Nov')
        this.fechaani = '11';
      else if ((str.substring(4, 7)) == 'Dic')
        this.fechaani = '12';
    }
  }
}
