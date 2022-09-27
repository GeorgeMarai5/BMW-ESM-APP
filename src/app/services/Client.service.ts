import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Clients } from "../models/Clients";



@Injectable({

    providedIn: 'root'
})


export class ClientService{

  apiUrl = 'https://localhost:7163';

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
    
    
      createClient(Client: Clients){
        return this.httpClient.post(this.apiUrl + '/api/Clients' , Client, this.httpOptions)
    
    
      }
    
    
      getClientList(): Observable<Clients> {
        return this.httpClient
          .get<Clients>(this.apiUrl + '/api/Clients/GetAllClients')
          .pipe(
            retry(2),
            catchError(this.handleError)
          )
      }
    
      
      // Get single student data by ID
      getClient(id): Observable<Clients> {
        return this.httpClient
          .get<Clients>(this.apiUrl + '/api/Clients/id?id=' + id)
          .pipe(
            retry(2),
            catchError(this.handleError)
          )
      }
      
      // Update item by id
      updateClient(item): Observable<Clients> {
        return this.httpClient
          .put<Clients>(this.apiUrl + '/api/Clients/UpdateClients' + '?' + item, this.httpOptions)
          .pipe(
            retry(2),
            catchError(this.handleError)
          )
      }
       
      deleteClient(id): Observable<{}> {
      
        return this.httpClient.delete(this.apiUrl + '/api/Clients/DeleteClients?id=' +  id , this.httpOptions)
          .pipe(
            catchError(this.handleError)
          );
      }


}