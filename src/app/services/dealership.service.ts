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

 apiUrl = 'https://localhost:7163/api/Dealerships';

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
  headers: new HttpHeaders({
   'Content-Type': 'application/json'
   })
    }
    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      return throwError('Something bad happened; please try again later.'); 
    }
    
    
    
    
     createDealership(dealership: Dealership){
      return this.httpClient.post(this.apiUrl + '/CreateDealerships' , dealership, this.httpOptions)
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
    
     updateDealership(id, item): Observable<Dealership> {
       return this.httpClient
         .put<Dealership>(this.apiUrl + '/api/Dealerships/PutDealership' + id, item, this.httpOptions)
         .pipe(
           retry(2),
           catchError(this.handleError)
         )
     }
    
  
     deleteDealership(id): Observable<{}> {
       return this.httpClient.delete(this.apiUrl + '/api/Dealerships/' +  id , this.httpOptions)
         .pipe(
           catchError(this.handleError)
         );
     }
   }