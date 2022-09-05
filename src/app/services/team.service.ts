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
  

  constructor(private httpClient: HttpClient) { 

  }

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
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


  createTeam(team: Team) {
    return this.httpClient.post(this.apiUrl + '/api/Team/Create' , team, this.httpOptions)
  }

  getTeam(id): Observable<{}> {
    return this.httpClient.get(this.apiUrl + '/api/Team/id?id=' +  id , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getTeamList(): Observable<Team> {
    return this.httpClient
      .get<Team>(this.apiUrl + '/api/Team/GetAllTeams')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getServiceType(): Observable<Team> {
    return this.httpClient
      .get<Team>(this.apiUrl + '/api/Team/GetServiceType')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }









  updateTeam(item): Observable<Team> {
    return this.httpClient
      .put<Team>(this.apiUrl + '/api/Team/UpdateTeam' + '?' + item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deleteTeam(id) {
    return this.httpClient
      .delete<Team>(this.apiUrl + '/api/Team/DeleteTeam?id=' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}