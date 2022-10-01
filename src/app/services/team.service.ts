import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Team } from '../models/Team';
import { retry, catchError } from 'rxjs/operators';
import {ServiceType} from '../models/ServiceType';

@Injectable({
  providedIn: 'root',
})

export class TeamService {

 apiUrl = 'https://localhost:7163/api/Teams';
 apiURLS = 'https://localhost:7163/api/ServiceTypes';

  httpOptions = {
  headers: new HttpHeaders({
   'Content-Type': 'application/json'
   })
  }
   
    constructor(private httpClient: HttpClient) { }                                             //private db: AngularFireDatabase,private firestore: AngularFirestore
  

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
  
  
    createTeam(Team: Team){
      return this.httpClient.post(this.apiUrl + '/api/Teams/Create' , Team, this.httpOptions)
  
  
    }
  
  
    getTeamList(): Observable<Team> {
      return this.httpClient
        .get<Team>(this.apiUrl + '/GetAllTeams')
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }

    getServiceTypeList(): Observable<ServiceType> {
      return this.httpClient
        .get<ServiceType>(this.apiURLS + '/GetAllServiceTypes')
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
  
    
    // Get single student data by ID
    getTeam(id): Observable<Team> {
      return this.httpClient
        .get<Team>(this.apiUrl + '/api/Teams/' + id)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
    
    // Update item by id
    updateteam(item): Observable<Team> {
      return this.httpClient
        .put<Team>(this.apiUrl + '/api/Teams/' + item, this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
  
    updateTeam(id, item): Observable<Team> {
      return this.httpClient
        .put<Team>(this.apiUrl + '/api/Teams/' + id, item, this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
    
    // Delete item by id
    delete(id) {
      return this.httpClient
        .delete<Team>(this.apiUrl + '/api/Teams' + '/' + id, this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
  
  
  
    deleteTeam(id): Observable<{}> {
    
      return this.httpClient.delete(this.apiUrl + '/api/Teams/' +  id , this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    }
  

}