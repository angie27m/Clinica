import { Examen } from './../../../_model/Examen';
import { ExamenService } from './../../../_service/examen.service';
import { ExamenesDialogoconsulComponent } from './../examenes-consultas/examenes-dialogoconsul/examenes-dialogoconsul.component';
import { ConsultaExamenDto } from './../../../_model/ConsultaExamenDto';
import { ConsultaExamenId } from './../../../_model/ConsultaExamenId';
import { FormControl, FormGroup } from '@angular/forms';
import { ConsultaExamenService } from './../../../_service/consultaExamen.service';
import { Params, ActivatedRoute } from '@angular/router';
import { DetallesConsultasDialogoComponent } from './detalles-consultas-dialogo/detalles-consultas-dialogo.component';
import { DetalleConsulta } from './../../../_model/DetalleConsulta';
import { DetalleConsultaService } from './../../../_service/detalleConsulta.service';
import { MatSort, MatTableDataSource, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Consulta } from 'src/app/_model/Consulta';

@Component({
  selector: 'app-detalles-consultas',
  templateUrl: './detalles-consultas.component.html',
  styleUrls: ['./detalles-consultas.component.css']
})
export class DetallesConsultasComponent implements OnInit {

  form: FormGroup;
  displayedColumns: string[] = ['id', 'diagnostico', 'tratamiento', 'acciones'];
  dataSource = new MatTableDataSource<DetalleConsulta>();
  displayedColumnsEx: string[] = ['nombre', 'descripcion', 'infoAdicional', 'acciones'];
  dataSourceEx = new MatTableDataSource<ConsultaExamenId>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  detalleConsulta: DetalleConsulta;
  idConsulta: Consulta;
  idExamen: number;
  variableEnvio: number;
  isAdding: boolean = false;
  consultaExdto: ConsultaExamenDto;
  idEx: Examen;

  constructor(private snackBar: MatSnackBar,
    private service: DetalleConsultaService,
    private serviceEx: ConsultaExamenService,
    private serviceExamen: ExamenService,
    private dialogo: MatDialog
  ) { }

  ngOnInit(): void {
    console.log('Consulta id: ' + this.variableEnvio);
    this.inicializarFormulario();
    this.consultaExdto = new ConsultaExamenDto();
    this.service.variableReactiva.subscribe(data => {
      this.listar();
      console.log(data);
      this.mostrarMensaje(data, 'AVISO');
    });
    this.serviceEx.variableReactiva.subscribe(data => {
      this.listarEx();
      console.log(data);
      this.mostrarMensaje(data, 'AVISO');
    });
    this.listar();
    this.listarEx();
  }

  listar() {
    if (this.variableEnvio != undefined) {
      this.serviceEx.listarPorIdConsulta(this.variableEnvio).subscribe(data => {
        this.dataSource = new MatTableDataSource(data.consulta.detalleConsulta);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  guardarDetalle() {
    let detalle = new DetalleConsulta();
    detalle.diagnostico = this.form.value['diagnostico'];
    detalle.tratamiento = this.form.value['tratamiento'];
    this.detalleConsulta = new DetalleConsulta();
    this.detalleConsulta.consulta = new Consulta();
    this.detalleConsulta.consulta.id = this.variableEnvio;
    this.detalleConsulta.diagnostico = detalle.diagnostico;
    this.detalleConsulta.tratamiento = detalle.tratamiento;
    this.consultaExdto = new ConsultaExamenDto();
    console.log(this.detalleConsulta);
    this.service.guardar(this.detalleConsulta).subscribe(() => {
      this.service.variableReactiva.next('Se ha guardado correctamente');
    });
    this.ocultarDetalle();
  }

  abrirForm() {
    this.isAdding = true;
  }

  abrirDialogo(obj?: DetalleConsulta) {
    const consulta = obj != null ? obj : new DetalleConsulta();
    this.dialogo.open(DetallesConsultasDialogoComponent, {
      width: '250px',
      data: consulta
    })
  }

  inicializarFormulario() {
    this.form = new FormGroup({
      'diagnostico': new FormControl(''),
      'tratamiento': new FormControl('')
    });
  }

  eliminar(id: number) {
    this.service.eliminar(id).subscribe(() => {
      this.listar();
      this.mostrarMensaje('Detalle consulta eliminado correctamente', 'AVISO');
    });
  }

  listarEx() {
    if (this.variableEnvio != undefined) {
      this.serviceEx.listarVista(this.variableEnvio).subscribe(data => {
        this.dataSourceEx = new MatTableDataSource(data);
        this.dataSourceEx.sort = this.sort;
        this.dataSourceEx.paginator = this.paginator;
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

  eliminarEx(nombre: string) {
    this.serviceExamen.listarNombre(nombre).subscribe(data => {
      this.consultaExdto.idConsulta = this.variableEnvio;
      console.log(data);
      this.consultaExdto.idExamen = data;
      this.eliminarE();
    });    
  }

  eliminarE(){
    this.serviceEx.eliminar(this.consultaExdto).subscribe(() => {
      this.listarEx();
      this.mostrarMensaje('Exámen consulta eliminado correctamente', 'AVISO');
    });
  }

  applyFilterEx(valor: string) {
    this.dataSourceEx.filter = valor.trim().toLowerCase();
  }

  applyFilter(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  ocultarDetalle() {
    this.isAdding = false;
    this.inicializarFormulario();
  }

  mostrarMensaje(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
