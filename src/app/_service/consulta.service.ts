import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Consulta } from '../_model/Consulta';

@Injectable({
    providedIn: 'root'
  })
  export class ConsultaService {
  
    variableReactiva = new Subject<string>();
    url: string =  `${environment.HOST}/consultas`;
    
    constructor(private http: HttpClient) { }
  
    listar() {
      return this.http.get<Consulta[]>(`${this.url}/buscar`);
     
    }
  
    listarPorId(id: number) {
      return this.http.get<Consulta>(`${this.url}/buscar/${id}`);
    }
  
    guardar(consulta: Consulta){
      return this.http.post<number>(`${this.url}/guardar`, consulta);
    }
  
    editar(consulta: Consulta){
      return this.http.put(`${this.url}/editar`, consulta);
    }

    eliminar(id: number) {
      return this.http.delete(`${this.url}/eliminar/${id}`);
    }
  
  }