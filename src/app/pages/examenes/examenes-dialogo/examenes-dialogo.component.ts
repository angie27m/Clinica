import { ExamenService } from './../../../_service/examen.service';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { Examen } from './../../../_model/Examen';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-examenes-dialogo',
  templateUrl: './examenes-dialogo.component.html',
  styleUrls: ['./examenes-dialogo.component.css']
})
export class ExamenesDialogoComponent implements OnInit {

  examen: Examen;
  isValid: boolean = true;
  isSaving: boolean;

  constructor(private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: Examen,
    private dialogRef: MatDialogRef<ExamenesDialogoComponent>,
    private service: ExamenService
  ) { }

  ngOnInit() {
    if (this.data.id == null) {
      this.isSaving = true;
    } else {
      this.isSaving = false;
    }
    this.examen = new Examen();
    this.examen.id = this.data.id;
    this.examen.nombre = this.data.nombre;
    this.examen.descripcion = this.data.descripcion;
  }

  operar() {
    if (this.isSaving) {
      this.service.guardar(this.examen).subscribe(() => {
        console.log(this.examen);
        this.service.variableReactiva.next('Se ha guardado correctamente');
        this.cerrarDialogo();
      });
    } else {
      this.service.editar(this.examen).subscribe(() => {
        console.log(this.examen);
        this.service.variableReactiva.next('Se ha editado correctamente');
        this.cerrarDialogo();
      });
    }
  }

  cerrarDialogo() {
    this.dialogRef.close();
  }
}
