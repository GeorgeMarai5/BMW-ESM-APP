import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { TeamType } from '../models/TeamType';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class TeamTypeService {

 apiUrl = 'https://localhost:7163';

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
  
  
    createTeam(TeamType: TeamType){
      return this.httpClient.post(this.apiUrl + '/api/TeamTypes/CreateTeamType' , TeamType, this.httpOptions)
  
  
    }
  
  
    getTeamTypeList(): Observable<TeamType> {
      return this.httpClient
        .get<TeamType>(this.apiUrl + '/api/TeamTypes/GetAllTeamTypes')
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
  
    
    // Get single student data by ID
    getTeamType(id): Observable<TeamType> {
      return this.httpClient
        .get<TeamType>(this.apiUrl + '/api/TeamTypes/' + id)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
    
    // Update item by id
    updateteamType(item): Observable<TeamType> {
      return this.httpClient
        .put<TeamType>(this.apiUrl + '/api/TeamTypes/' + item, this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
  
    updateTeamType(id, item): Observable<TeamType> {
      return this.httpClient
        .put<TeamType>(this.apiUrl + '/api/TeamTypes/' + id, item, this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
    
    // Delete item by id
    delete(id) {
      return this.httpClient
        .delete<TeamType>(this.apiUrl + '/api/TeamTypes' + '/' + id, this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
  
  
  
    deleteTeamType(id): Observable<{}> {
    
      return this.httpClient.delete(this.apiUrl + '/api/Teams/' +  id , this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    }
  

}