import { ExamenesDialogoComponent } from './examenes-dialogo/examenes-dialogo.component';
import { ExamenService } from './../../_service/examen.service';
import { MatTableDataSource, MatSnackBar, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { Examen } from './../../_model/Examen';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrls: ['./examenes.component.css']
})
export class ExamenesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'acciones'];
  dataSource = new MatTableDataSource<Examen>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  examen: Examen;

  constructor(private snackBar: MatSnackBar,
    private service: ExamenService,
    private dialogo: MatDialog
  ) { }

  ngOnInit() {
    this.service.variableReactiva.subscribe(data => {
      this.listar();
      console.log(data);
      this.mostrarMensaje(data,'AVISO');
    });
    this.listar();
    }

  listar() {
    this.service.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(data);
    });
  }

  guardar() {
    this.service.guardar(this.examen).subscribe(() => {
      console.log(this.examen);
      this.service.variableReactiva.next('Se ha guardado correctamente');
    });
  }

  eliminar(id: number) {
    this.service.eliminar(id).subscribe(() => {
      this.listar();
      this.mostrarMensaje('Examen eliminado correctamente','AVISO');
    });
  }

  abrirDialogo(obj?: Examen) {   
    const consulta = obj != null ? obj : new Examen();
    this.dialogo.open(ExamenesDialogoComponent, {
      width: '270px',
      data: consulta
    })
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
