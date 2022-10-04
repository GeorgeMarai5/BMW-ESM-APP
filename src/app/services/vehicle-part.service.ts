import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Part } from '../models/Part';

@Injectable({
  providedIn: 'root'
})
export class VehiclePartService {

  apiUrl = 'https://localhost:7163'
  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { 

  }
  

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
    
  }

  createPart(Part: Part){
    return this.httpClient.post(this.apiUrl + 'api/Parts/CreatePart' , Part, this.httpOptions)
  }

  getPartList(): Observable<Part> {
    return this.httpClient
      .get<Part>(this.apiUrl + '/api/Parts/GetAllParts')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getPart(id): Observable<{}> {
    return this.httpClient.get(this.apiUrl + '/api/Parts/id?id=' +  id , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updatePart(id, item): Observable<Part> {
    return this.httpClient
      .put<Part>(this.apiUrl + '/api/Parts/' + id, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  delete(id) {
    return this.httpClient
      .delete<Part>(this.apiUrl + '/api/Parts' + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deletePart(id): Observable<{}> {
    return this.httpClient.delete(this.apiUrl + '/api/Parts/' +  id , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

}
