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

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
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
    return throwError(
      'Something bad happened; please try again later.');
  };


  createTeamMember(item): Observable<Employee> {
    return this.http
      .post<Employee>(this.apiUrl, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getTeamMember(id): Observable<Employee> {
    return this.http
      .get<Employee>(this.apiUrl + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getTeamMembers(): Observable<Employee> {
    return this.http
      .get<Employee>(this.apiUrl)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateTeamMember(id, item): Observable<Employee> {
    return this.http
      .put<Employee>(this.apiUrl + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deleteTeamMember(id) {
    return this.http
      .delete<Employee>(this.apiUrl + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}
