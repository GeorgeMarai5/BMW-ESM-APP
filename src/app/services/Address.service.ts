import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Address } from '../models/Address';
import { retry, catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})

export class AddressService {

 apiUrl = 'https://localhost:7163/api/Addresses';

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

        AddAddress(address: Address){
               return this.httpClient.post(this.apiUrl , address, this.httpOptions)
          
        }
             
createAddress(item): Observable<Address> {
    return this.httpClient
      .post<Address>(this.apiUrl , JSON.stringify(item), this.httpOptions)  
  }

  getList(): Observable<Address> {
       return this.httpClient
         .get<Address>(this.apiUrl + '/getAll')
         .pipe(
          retry(2),
           catchError(this.handleError)
         )
     }

getAddressList(): Observable<Address> {
  return this.httpClient
    .get<Address>(this.apiUrl)
}

updateAddress(id, item): Observable<Address> {
  return this.httpClient
    .put<Address>(this.apiUrl + '/' + id, JSON.stringify(item), this.httpOptions)
}

getItem(id): Observable<Address> {
     return this.httpClient
       .get<Address>(this.apiUrl  + '/' + id)
       .pipe(
         retry(2),
         catchError(this.handleError)
       )
   }

deleteAddress(id) {
      return this.httpClient
   .delete<Address>(this.apiUrl + '/' + id, this.httpOptions)
}

}