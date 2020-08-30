import { Direccion } from './../../../_model/Direccion';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MedicoService } from './../../../_service/medico.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Medico } from './../../../_model/Medico';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-medicos-dialogo',
  templateUrl: './medicos-dialogo.component.html',
  styleUrls: ['./medicos-dialogo.component.css']
})
export class MedicosDialogoComponent implements OnInit {
  medico: Medico;
  form: FormGroup;
  isValid: boolean = true;
  isSaving: boolean;

  constructor(private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: Medico,
    private dialogRef: MatDialogRef<MedicosDialogoComponent>,
    private service: MedicoService
  ) { }

  ngOnInit() {
    if (this.data.id == null) {
      this.isSaving = true;
      this.data.direccion = new Direccion();
    } else {
      this.isSaving = false;
    }

    this.medico = new Medico();
    this.medico.id = this.data.id;
    this.medico.nombreMedico = this.data.nombreMedico;
    this.medico.direccion = new Direccion();
    this.medico.direccion.detalle = this.data.direccion.detalle;
    console.log(this.data);
  }

  operar() {

    if (this.isSaving) {
      this.service.guardar(this.medico).subscribe(() => {
        console.log(this.medico);
        this.service.variableReactiva.next('Se ha guardado correctamente');
        this.cerrarDialogo();
      });
    } else {
      this.service.editar(this.medico).subscribe(() => {
        console.log(this.medico);
        this.service.variableReactiva.next('Se ha editado correctamente');
        this.cerrarDialogo();
      });
    }
  }

  cerrarDialogo() {
    this.dialogRef.close();
  }

}
