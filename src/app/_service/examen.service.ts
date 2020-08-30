import { Examen } from './../_model/Examen';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ExamenService {

  variableReactiva = new Subject<string>();
  url: string = `${environment.HOST}/examenes`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Examen[]>(`${this.url}/buscar`);
  }

  listarPorId(id: number) {
    return this.http.get<Examen>(`${this.url}/buscar/${id}`);
  }

  guardar(examen: Examen) {
    return this.http.post(`${this.url}/guardar`, examen);
  }

  editar(examen: Examen) {
    return this.http.put(`${this.url}/editar`, examen);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`);
  }

  listarNombre(nombre: string){
    return this.http.get<number>(`${this.url}/buscarNombre/${nombre}`);
  }
}