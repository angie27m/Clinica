import { Medico } from './../_model/Medico';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MedicoService {

  variableReactiva = new Subject<string>();
  url: string = `${environment.HOST}/medicos`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Medico[]>(`${this.url}/buscar`);
  }

  listarPorId(id: number) {
    return this.http.get<Medico>(`${this.url}/buscar/${id}`);
  }

  guardar(medico: Medico) {
    return this.http.post(`${this.url}/guardar`, medico);
  }

  editar(medico: Medico) {
    return this.http.put(`${this.url}/editar`, medico);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`);
  }

}