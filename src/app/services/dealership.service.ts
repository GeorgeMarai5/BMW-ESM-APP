import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Dealership } from '../models/Dealership';
import { retry, catchError } from 'rxjs/operators';
import { Address } from 'app/models/Address';

@Injectable({
  providedIn: 'root',
})

export class DealershipService {

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

    createDealership(Dealership: Dealership){
      return this.httpClient.post(this.apiUrl + '/api/Dealerships/CreateDealerships' , Dealership , this.httpOptions)
    }

    createDealerships(Dealership: Dealership,address: Address){
      return this.httpClient.post(this.apiUrl + '/api/Dealerships/CreateDealerships' , Dealership && address, this.httpOptions)
    }
  
    getDealershipList(): Observable<Dealership> {
      return this.httpClient
        .get<Dealership>(this.apiUrl + '/api/Dealerships/GetAllDealerships')
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
  
    getDealership(id): Observable<Dealership> {
      return this.httpClient
        .get<Dealership>(this.apiUrl + '/api/Dealerships/id?id=' + id)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
    
    updateDealership(item): Observable<Dealership> {
      return this.httpClient
        .put<Dealership>(this.apiUrl + '/api/Dealerships/PutDealership' + '?' + item, this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
    
    /*delete(id) {
      return this.httpClient
        .delete<Dealership>(this.apiUrl + '/api/Fleet/DeleteFleet' + '/' + id, this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
    */
  
    deleteDealership(id): Observable<{}> {
      return this.httpClient.delete(this.apiUrl + '/api/Dealerships/' +  id , this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    }
  }