import { ConsultaExamenDto } from './../_model/ConsultaExamenDto';
import { ConsultaExamenId } from './../_model/ConsultaExamenId';
import { ConsultaExamen } from './../_model/ConsultaExamen';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ConsultaExamenService {

  variableReactiva = new Subject<string>();
  url: string = `${environment.HOST}/consultasexamenes`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<ConsultaExamen[]>(`${this.url}/buscar`);
  }

  listarPorIdConsulta(id: number) {
    return this.http.get<ConsultaExamen>(`${this.url}/buscarPorIdConsulta/${id}`);
  }

  listarPorId(id: number) {
    return this.http.get<ConsultaExamen>(`${this.url}/buscar/${id}`);
  }

  listarVista(id: number) {
    return this.http.get<ConsultaExamenId[]>(`${this.url}/busqueda/${id}`);
  }

  guardar(consultaExamenDto: ConsultaExamenDto) {
    return this.http.post(`${this.url}/guardar`, consultaExamenDto);
  }

  eliminar(consultaExamenDto: ConsultaExamenDto){
    return this.http.post(`${this.url}/eliminar`, consultaExamenDto);
  }
}