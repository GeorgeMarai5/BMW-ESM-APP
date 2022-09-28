import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../models/Employee';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  apiUrl = 'https://localhost:7163';

  constructor(private httpClient: HttpClient) { 

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


  createTeamMember(createTeamMember: Employee){
    return this.httpClient.post(this.apiUrl + '/api/Employee/CreateTeamMember' , Employee, this.httpOptions)
  }

  getTeamMemberList(): Observable<Employee> {
    return this.httpClient
      .get<Employee>(this.apiUrl + '/api/Employee/GetTeamMemberList')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getTeamMember(id): Observable<Employee> {
    return this.httpClient
      .get<Employee>(this.apiUrl + '/api/Employee/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  updateTeamMember(item): Observable<Employee> {
    return this.httpClient
      .put<Employee>(this.apiUrl + '/api/Employee/' + '?' + item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  deleteTeamMember(id): Observable<{}> {
  
    return this.httpClient.delete(this.apiUrl + '/api/Employee/' +  id , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
