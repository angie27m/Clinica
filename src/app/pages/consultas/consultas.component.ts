import { ExamenesConsultasComponent } from './examenes-consultas/examenes-consultas.component';
import { DetallesConsultasComponent } from './detalles-consultas/detalles-consultas.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsultasDialogoComponent } from './consultas-dialogo/consultas-dialogo.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { Consulta } from 'src/app/_model/Consulta';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})

export class ConsultasComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombreMedico', 'fecha', 'detalle', 'acciones'];
  dataSource = new MatTableDataSource<Consulta>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  idConsulta: Consulta;
  consulta: number;

  constructor(
    public route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private service: ConsultaService,
    private dialogo: MatDialog,
    public router: Router
  ) { }

  ngOnInit() {
    this.service.variableReactiva.subscribe(data => {
      this.listar();
      this.mostrarMensaje(data, 'AVISO');
    });
    this.listar();
  }

  onChildLoaded(component: DetallesConsultasComponent | ExamenesConsultasComponent) {
    component.variableEnvio = this.consulta;
  }

  listar() {
    this.service.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(data);
    });
  }

  abrirDialogo(obj?: Consulta) {
    const consulta = obj != null ? obj : new Consulta();
    this.dialogo.open(ConsultasDialogoComponent, {
      width: '270px',
      data: consulta
    })
  }

  abrirDetalle(obj: number) {
    this.consulta = obj;
    this.router.navigate([`/consultas/detalles-consultas`]);
  }

  eliminar(id: number) {
    this.service.eliminar(id).subscribe(() => {
      this.listar();
      this.mostrarMensaje('Consulta eliminada correctamente', 'AVISO');
    });
  }

  applyFilter(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  mostrarMensaje(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
