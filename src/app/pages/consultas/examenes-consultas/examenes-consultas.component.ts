import { ConsultaExamenDto } from './../../../_model/ConsultaExamenDto';
import { ActivatedRoute } from '@angular/router';
import { ExamenesDialogoconsulComponent } from './examenes-dialogoconsul/examenes-dialogoconsul.component';
import { ExamenService } from './../../../_service/examen.service';
import { ConsultaExamenService } from './../../../_service/consultaExamen.service';
import { ConsultaExamenId } from './../../../_model/ConsultaExamenId';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-examenes-consultas',
  templateUrl: './examenes-consultas.component.html',
  styleUrls: ['./examenes-consultas.component.css']
})
export class ExamenesConsultasComponent implements OnInit {

  displayedColumnsEx: string[] = ['nombre', 'descripcion', 'infoAdicional', 'acciones'];
  dataSourceEx = new MatTableDataSource<ConsultaExamenId>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  variableEnvio: number;
  nullDetalle: boolean = false;

  constructor(
    public route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private service: ConsultaExamenService,
    private dialogo: MatDialog
  ) { }

  ngOnInit(): void {
    this.service.variableReactiva.subscribe(data => {
      this.listarEx();
      console.log(data);
      this.mostrarMensaje(data, 'AVISO');
    });
    this.listarEx();
  }

  listarEx() {
    if (this.variableEnvio != undefined) {
      this.service.listarVista(this.variableEnvio).subscribe(data => {
        if (data.length == 0) {
          this.nullDetalle = true;
        } else {
          this.nullDetalle = false;
          this.dataSourceEx = new MatTableDataSource(data);
          this.dataSourceEx.sort = this.sort;
          this.dataSourceEx.paginator = this.paginator;
        }
      });
    }
  }

  abrirDialogoEx(obj?: ConsultaExamenDto) {
    const consultaEx = obj != null ? obj : new ConsultaExamenDto();
    consultaEx.idConsulta = this.variableEnvio;
    this.dialogo.open(ExamenesDialogoconsulComponent, {
      width: '280px',
      data: consultaEx
    })
  }

  eliminarEx(idEx: number) {
    
  }
  
  applyFilterEx(valor: string) {
    this.dataSourceEx.filter = valor.trim().toLowerCase();
  }

  mostrarMensaje(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
