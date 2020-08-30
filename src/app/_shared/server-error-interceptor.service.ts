import { MatSnackBar } from '@angular/material';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServerErrorInterceptorService implements HttpInterceptor{

  constructor(private snackBar: MatSnackBar,
              private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request).pipe(retry(environment.REINTENTOS)).
    pipe(tap(event => {
      if (event instanceof HttpResponse) {
        if (event.body && event.body.error === true && event.body.errorMessage) {
          throw new Error(event.body.errorMessage);
        }
      }
    })).pipe(catchError((err) => {
      console.log(err);
      if(err.status!=0){
        this.router.navigate([`/error/${err.status}/${err.error.message}`]);
      }else{
        this.router.navigate([`/error/500/Error interno del servidor`]);
      }
      
      return EMPTY;
    }));

  }

}
