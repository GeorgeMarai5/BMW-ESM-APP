import { Injectable } from '@angular/core';
import { Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry,catchError, tap, map } from 'rxjs/operators';
import { EmployeeRole } from 'app/models/EmployeeRole';

@Injectable({
  providedIn: 'root'
})
export class EmployeeRoleService {

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

  CreateEmployeeRole(EmployeeRole: EmployeeRole){
    return this.httpClient.post(this.apiUrl + '/api/EmployeeRoles/CreateEmployeeRole' , EmployeeRole, this.httpOptions)
  }

  getEmployeeRoleList(): Observable<EmployeeRole> {
    return this.httpClient
      .get<EmployeeRole>(this.apiUrl + '/api/EmployeeRoles/GetEmployeeRoles')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getEmployeeRole(id): Observable<EmployeeRole> {
    return this.httpClient
      .get<EmployeeRole>(this.apiUrl + '/api/EmployeeRoles/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  updateEmployeeRole(item): Observable<EmployeeRole> {
    return this.httpClient
      .put<EmployeeRole>(this.apiUrl + '/api/EmployeeRoles/PutEmployeeRole' + '?' + item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  delete(id) {
    return this.httpClient
      .delete<EmployeeRole>(this.apiUrl + '/api/EmployeeRoles' + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deleteEmployeeRole(id): Observable<{}> {
    return this.httpClient.delete(this.apiUrl + '/api/EmployeeRoles/' +  id , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}