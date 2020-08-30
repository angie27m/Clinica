import { ConsultaExamenService } from './../../../_service/consultaExamen.service';
import { ConsultaExamenDto } from './../../../_model/ConsultaExamenDto';
import { Direccion } from './../../../_model/Direccion';
import { Medico } from './../../../_model/Medico';
import { Consulta } from './../../../_model/Consulta';
import { ExamenService } from './../../../_service/examen.service';
import { DetalleConsultaService } from './../../../_service/detalleConsulta.service';
import { MedicoService } from './../../../_service/medico.service';
import { ConsultaService } from './../../../_service/consulta.service';
import { Examen } from './../../../_model/Examen';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { DetalleConsulta } from './../../../_model/DetalleConsulta';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-guardar-consultas',
  templateUrl: './guardar-consultas.component.html',
  styleUrls: ['./guardar-consultas.component.css']
})
export class GuardarConsultasComponent implements OnInit {

  consulta: Consulta;
  lista: Medico[];
  item: Medico;
  detalle: DetalleConsulta;
  listaDet: DetalleConsulta[];
  itemDet: DetalleConsulta;
  examen: Examen;
  listaEx: Examen[];
  itemEx: Examen;
  listaD: Array<DetalleConsulta>;
  listaE: Examen[];
  consultaE: ConsultaExamenDto;
  viewExamen: boolean = true;
  viewDetalle: boolean = true;
  minDate: Date;
  maxDate: Date;
  isValid: boolean;
  isValidDtl: boolean;
  isValidEx: boolean;

  displayedColumnsDtl: string[] = ['id', 'diagnostico', 'tratamiento', 'acciones'];
  dataSourceDtl = new MatTableDataSource<DetalleConsulta>();
  displayedColumnsEx: string[] = ['nombre', 'descripcion', 'acciones'];
  dataSourceEx = new MatTableDataSource<Examen>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private snackBar: MatSnackBar,
    private service: ConsultaService,
    private servMed: MedicoService,
    private servDtl: DetalleConsultaService,
    private serviEx: ConsultaExamenService,
    private servEx: ExamenService) { }

  ngOnInit() {
    this.consultarMedicos();
    this.consultarDetalles();
    this.consultarExamenes();
    this.consulta = new Consulta();
    this.consulta.medico = new Medico();
    this.consultaE = new ConsultaExamenDto();
    this.listaD = [];
    this.listaE = [];
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 0, 5, 0);
    if (this.item !== undefined) {
      this.consulta.medico.id = this.item.id;
      this.consulta.medico.nombreMedico = this.item.nombreMedico;
      this.consulta.medico.direccion = new Direccion();
      this.consulta.medico.direccion.detalle = this.item.direccion.detalle;
    }
  }

  guardarConsulta() {
    this.validarConsulta();
    if (this.isValid === true) {
      this.consulta.detalleConsulta = this.listaD;
      this.service.guardar(this.consulta).subscribe((data) => {
        this.guardarFinal(data);
        this.mostrarMensaje('Guardado correctamente', 'AVISO');
      });
    }
  }

  validarConsulta() {
    if (this.consulta.fecha === 'undefined/00 00:00:00' || this.consulta.fecha === 'undefined' || this.consulta.fecha === null) {
      this.isValid = false;
      this.mostrarMensaje('La fecha es requerida', 'ERROR');
    } else {
      this.isValid = true;
    }
    if (this.consulta.medico.id != null) {
      this.isValid = true;
    } else {
      this.isValid = false;
      this.mostrarMensaje('El nombre médico es requerido', 'ERROR');
    }
  }

  guardarDetalle() {
    this.validarDetalle();
    if (this.isValidDtl === true) {
      this.listaD.push(this.itemDet);
      this.listarDetalle();
    }
  }

  validarDetalle() {
    if (this.itemDet != null) {
      this.isValidDtl = true;
    } else {
      this.isValidDtl = false;
      this.mostrarMensaje('No ha seleccionado un detalle', 'ERROR');
    }
  }

  listarDetalle() {
    this.consultarDetalles();
    this.dataSourceDtl = new MatTableDataSource(this.listaD);
    this.dataSourceDtl.sort = this.sort;
    this.dataSourceDtl.paginator = this.paginator;
  }

  listarExamen() {
    this.consultarExamenes();
    this.dataSourceEx = new MatTableDataSource(this.listaE);
    this.dataSourceEx.sort = this.sort;
    this.dataSourceEx.paginator = this.paginator;
  }

  guardarFinal(intCon: number) {
    for (let i = 0, len = this.listaE.length; i < len; i++) {
      this.llenarConE(this.listaE[i], intCon);
    }
  }

  llenarConE(value: Examen, intCon: number) {
    if (this.consultaE !== undefined) {
      this.consultaE.idConsulta = intCon;
      this.consultaE.idExamen = value.id;
      this.serviEx.guardar(this.consultaE).subscribe(() => { });
    }
  }

  guardarExamen() {
    this.validarExamen();
    if (this.isValidEx === true) {
      this.listaE.push(this.itemEx);
      this.listarExamen();
    }
  }

  validarExamen() {
    if (this.itemEx != null) {
      this.isValidEx = true;
    } else {
      this.isValidEx = false;
      this.mostrarMensaje('Seleccione un exámen, campo requerido', 'ERROR');
    }
    if (this.consultaE.infoAdicional != null) {
      this.isValidEx = true;
    } else {
      this.isValidEx = false;
      this.mostrarMensaje('Información adicional requerida', 'ERROR');
    }
  }

  eliminarDetalle(obj: DetalleConsulta) {
    const indice = this.listaD.indexOf(obj);
    this.listaD.splice(indice);
    this.listarDetalle();
  }

  eliminarExamen(obj: Examen) {
    const indice = this.listaE.indexOf(obj);
    this.listaE.splice(indice);
    this.listarExamen();
  }

  consultarMedicos() {
    this.servMed.listar().subscribe(data => {
      this.lista = data;
    });
  }

  consultarDetalles() {
    let index;
    this.servDtl.listar().subscribe(data => {
      this.listaDet = data;
      if (this.itemDet !== undefined) {
        for (let i = 0, len = this.listaDet.length; i < len; i++) {
          if (this.listaDet[i].diagnostico === this.itemDet.diagnostico) {
            index = i;
          }
        }
        this.listaEx.splice(index, 1);
      }
    });
  }

  consultarExamenes() {
    let index;
    this.servEx.listar().subscribe(data => {
      this.listaEx = data;
      if (this.itemEx !== undefined) {
        for (let i = 0, len = this.listaEx.length; i < len; i++) {
          if (this.listaEx[i].nombre === this.itemEx.nombre) {
            index = i;
          }
        }
        this.listaEx.splice(index, 1);
      }
    });
  }

  mostrarMensaje(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  mostrarDetalle() {
    this.consultarDetalles();
    this.viewDetalle = false;
  }

  mostrarExamen() {
    this.consultarExamenes();
    this.viewExamen = false;
  }
}
