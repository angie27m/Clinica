import { ConsultaExamenDto } from './../../../../_model/ConsultaExamenDto';
import { ConsultaExamenId } from './../../../../_model/ConsultaExamenId';
import { Examen } from './../../../../_model/Examen';
import { Consulta } from './../../../../_model/Consulta';
import { ConsultaExamen } from './../../../../_model/ConsultaExamen';
import { ExamenService } from '../../../../_service/examen.service';
import { ConsultaExamenService } from '../../../../_service/consultaExamen.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-examenes-dialogoconsul',
  templateUrl: './examenes-dialogoconsul.component.html',
  styleUrls: ['./examenes-dialogoconsul.component.css']
})
export class ExamenesDialogoconsulComponent implements OnInit {

  lista: Examen[];
  consulta: Consulta;
  vista: ConsultaExamenDto;
  consulta_id: number;

  constructor(private dialogRef: MatDialogRef<ExamenesDialogoconsulComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ConsultaExamenDto,
    private snackBar: MatSnackBar,
    private service: ConsultaExamenService,
    private servEx: ExamenService
  ) { }

  ngOnInit() {
    this.consultarExamenes();
    this.vista = new ConsultaExamenDto();
    this.vista.idConsulta = this.data.idConsulta;
    this.vista.idExamen = this.data.idExamen;
    this.vista.infoAdicional = this.data.infoAdicional;
  }

  guardar() {
    //this.validar();
    this.service.guardar(this.vista).subscribe(() => {
      this.service.variableReactiva.next('Se ha guardado correctamente');
    });
  }

  consultarExamenes() {
    this.servEx.listar().subscribe(data => {
      this.lista = data;
      console.log('Listar examenes:');
      console.log(this.lista);
    });
  }

  validar() {

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
