import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../models/Employee';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  apiUrl = 'https://localhost:7292';
  httpClient: any;

  constructor(private http: HttpClient) { 

  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };


  createTeamMember(teamMember: Employee) {
    return this.httpClient.post(this.apiUrl + '/api/Employee/Create' , teamMember, this.httpOptions)
  }

  getTeamMember(id): Observable<{}> {
    return this.httpClient.get(this.apiUrl + '/api/Employee/id?id=' +  id , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getTeamMemberList(): Observable<Employee> {
    return this.http
      .get<Employee>(this.apiUrl + '/api/Employee/GetAllEmployees')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateTeamMember(id, item): Observable<Employee> {
    return this.http
      .put<Employee>(this.apiUrl + '/api/Employee/UpdateEmployee' + id, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deleteTeamMember(id) {
    return this.http
      .delete<Employee>(this.apiUrl + '/api/Employee/DeleteEmployee?id=' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}
