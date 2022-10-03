import { Injectable } from '@angular/core';
import { Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry,catchError, tap, map } from 'rxjs/operators';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

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

  CreateEmployee(Employee: Employee){
    return this.httpClient.post(this.apiUrl + '/api/Employees/CreateEmployee' , Employee, this.httpOptions)
  }

  getEmployeeList(): Observable<Employee> {
    return this.httpClient
      .get<Employee>(this.apiUrl + '/api/Employees/GetAllEmployees')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getEmployee(id): Observable<Employee> {
    return this.httpClient
      .get<Employee>(this.apiUrl + '/api/Employees/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  updateEmployee(item): Observable<Employee> {
    return this.httpClient
      .put<Employee>(this.apiUrl + '/api/Employees/PutEmployee' + '?' + item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  deletes(id) {
    return this.httpClient
      .delete<Employee>(this.apiUrl + '/api/Employees' + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  delete(id): Observable<{}> {
    return this.httpClient.delete(this.apiUrl + '/api/Employees/' +  id , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}