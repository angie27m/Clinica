import { DetalleConsulta } from './../_model/DetalleConsulta';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DetalleConsultaService {

  variableReactiva = new Subject<string>();
  url: string = `${environment.HOST}/detalleConsultas`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<DetalleConsulta[]>(`${this.url}/buscar`);
  }

  listarPorId(id: number) {
    return this.http.get<DetalleConsulta>(`${this.url}/buscar/${id}`);
  }

  guardar(detalleConsulta: DetalleConsulta) {
    return this.http.post(`${this.url}/guardar`, detalleConsulta);
  }

  editar(detalleConsulta: DetalleConsulta) {
    return this.http.put(`${this.url}/editar`, detalleConsulta);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`);
  }

}