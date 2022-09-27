import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Employee } from "../models/Employee";



@Injectable({

    providedIn: 'root'
})


export class EmployeeService{

  apiUrl = 'https://localhost:7163/api/Employees';

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
     'Content-Type': 'application/json'
     })
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
    
    
      createEmployee(Employee: Employee){
        return this.httpClient.post(this.apiUrl + '/api/Employees' , Employee, this.httpOptions)
    
    
      }
    
    
      getEmployeeList(): Observable<Employee> {
        return this.httpClient
          .get<Employee>(this.apiUrl + '/api/Employees/GetAllEmployees')
          .pipe(
            retry(2),
            catchError(this.handleError)
          )
      }
    
      
      // Get single student data by ID
      getEmployee(id): Observable<Employee> {
        return this.httpClient
          .get<Employee>(this.apiUrl + '/api/Employees/id?id=' + id)
          .pipe(
            retry(2),
            catchError(this.handleError)
          )
      }
      
      // Update item by id
      updateEmployee(item): Observable<Employee> {
        return this.httpClient
          .put<Employee>(this.apiUrl + '/api/Employees/UpdateEmployees' + '?' + item, this.httpOptions)
          .pipe(
            retry(2),
            catchError(this.handleError)
          )
      }
       
      deleteEmployees(id): Observable<{}> {
      
        return this.httpClient.delete(this.apiUrl + '/api/Employees/DeleteEmployees?id=' +  id , this.httpOptions)
          .pipe(
            catchError(this.handleError)
          );
      }
    
}