import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Team } from '../models/team';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

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


  createItem(item): Observable<Team> {
    return this.http
      .post<Team>(this.apiUrl, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getTeam(id): Observable<Team> {
    return this.http
      .get<Team>(this.apiUrl + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getTeams(): Observable<Team> {
    return this.http
      .get<Team>(this.apiUrl)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateTeam(id, item): Observable<Team> {
    return this.http
      .put<Team>(this.apiUrl + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deleteTeam(id) {
    return this.http
      .delete<Team>(this.apiUrl + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}