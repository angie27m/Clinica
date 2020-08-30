import { MedicosDialogoComponent } from './medicos-dialogo/medicos-dialogo.component';
import { MedicoService } from './../../_service/medico.service';
import { Medico } from './../../_model/Medico';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'direccion', 'acciones'];
  dataSource = new MatTableDataSource<Medico>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  medico: Medico;

  constructor(private snackBar: MatSnackBar,
    private service: MedicoService,
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
    this.service.guardar(this.medico).subscribe(() => {
      console.log(this.medico);
      this.service.variableReactiva.next('Se ha guardado correctamente');
    });
  }

  eliminar(id: number) {
    this.service.eliminar(id).subscribe(() => {
      this.listar();
      this.mostrarMensaje('Medico eliminado correctamente','AVISO');
    });
  }

  abrirDialogo(obj?: Medico) {   
    const consulta = obj != null ? obj : new Medico();
    this.dialogo.open(MedicosDialogoComponent, {
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
