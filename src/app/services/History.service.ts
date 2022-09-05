import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ModelService } from '../models/ModelService';
import { Service } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  apiUrl = 'https://localhost:7292'
  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { 

  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
    
  }


  AddFleet(Service: ModelService){
    return this.httpClient.post(this.apiUrl + '/api/Service/Create' , Service, this.httpOptions)
  }


  getServiceList(): Observable<ModelService> {
    return this.httpClient
      .get<ModelService>(this.apiUrl + '/api/Service/GetAllServices')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  updateService(item): Observable<Service> {
    return this.httpClient
      .put<Service>(this.apiUrl + '/api/Service/UpdateService' + '?' + item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deleteService(id): Observable<{}> {
    return this.httpClient.delete(this.apiUrl + '/api/Service/DeleteService?id=' +  id , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  getService(id): Observable<{}> {
    return this.httpClient.get(this.apiUrl + '/api/Service/id?id=' +  id , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

}