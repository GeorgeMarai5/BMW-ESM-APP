import { Injectable } from '@angular/core';
import { Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry,catchError, tap, map } from 'rxjs/operators';
import { Clients } from '../models/Clients';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  //collectionName = 'Fleet';
  //FleetRef: AngularFireObject<any>;
  apiUrl = 'https://localhost:7163'
  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
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


  createClient(Client: Clients){
    return this.httpClient.post(this.apiUrl + '/api/Clients/Create' , Clients, this.httpOptions)


  }


  GetClientList(): Observable<Clients> {
    return this.httpClient
      .get<Clients>(this.apiUrl + '/api/Clients/GetAll')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  
  // Get single student data by ID
  getClients(id): Observable<Clients> {
    return this.httpClient
      .get<Clients>(this.apiUrl + '/api/Clients/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  // Update item by id
  updateClient(item): Observable<Clients> {
    return this.httpClient
      .put<Clients>(this.apiUrl + '/api/Clients/' + '?' + item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  // Delete item by id
  deleteClient(id) {
    return this.httpClient
      .delete<Clients>(this.apiUrl + '/api/Clients' + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }



  deleteClients(id): Observable<{}> {
  
    return this.httpClient.delete(this.apiUrl + '/api/Clients/' +  id , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

}







































