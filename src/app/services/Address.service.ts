import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Address } from '../models/address';
import { retry, catchError } from 'rxjs/operators';
import { Model } from 'app/models/Model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})

export class AddressService {

 apiUrl = 'https://localhost:7163';

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
  
  createAddress(createAddress: Address){
    return this.httpClient.post(this.apiUrl + '/api/Addresses/CreateAddress' , Address, this.httpOptions)
  }

  getAddressList(): Observable<Address> {
    return this.httpClient
      .get<Address>(this.apiUrl + '/api/Addresses/GetAddressList')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getAddress(id): Observable<Address> {
    return this.httpClient
      .get<Address>(this.apiUrl + '/api/Addresses/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  updateAddress(item): Observable<Address> {
    return this.httpClient
      .put<Address>(this.apiUrl + '/api/Addresses/' + '?' + item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  deleteAddress(id): Observable<{}> {
  
    return this.httpClient.delete(this.apiUrl + '/api/Addresses/' +  id , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}



// import { Observable, throwError } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
// import { Address } from '../models/Address';
// import { retry, catchError } from 'rxjs/operators';
// import { Model } from 'app/models/Model';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// @Injectable({
//   providedIn: 'root',
// })

// export class AddressService {

//  apiUrl = 'https://localhost:7163/api/Addresses';

//   constructor(private httpClient: HttpClient) {}

//   httpOptions = {
//   headers: new HttpHeaders({
//    'Content-Type': 'application/json'
//    })
//     }


//     private handleError(error: HttpErrorResponse) {
//           if (error.error instanceof ErrorEvent) {
//            // A client-side or network error occurred. Handle it accordingly.
//             console.error('An error occurred:', error.error.message);
//            } else {
//             // The backend returned an unsuccessful response code.
//              // The response body may contain clues as to what went wrong,
//             console.error(
//              `Backend returned code ${error.status}, ` +
//                `body was: ${error.error}`);
//           }
//            // return an observable with a user-facing error message
//          return throwError('Something bad happened; please try again later.');
          
//         }

   
// createAddress(item): Observable<Address> {
//     return this.httpClient
//       .post<Address>(this.apiUrl , JSON.stringify(item), this.httpOptions)  
//   }

//   getList(): Observable<Address> {
//        return this.httpClient
//          .get<Address>(this.apiUrl + '/getAll')
//          .pipe(
//           retry(2),
//            catchError(this.handleError)
//          )
//      }

// getAddressList(): Observable<Address> {
//   return this.httpClient
//     .get<Address>(this.apiUrl)
// }

// updateAddress(id, item): Observable<Address> {
//   return this.httpClient
//     .put<Address>(this.apiUrl + '/' + id, JSON.stringify(item), this.httpOptions)
// }

// deleteAddress(id) {
//       return this.httpClient
//    .delete<Address>(this.apiUrl + '/' + id, this.httpOptions)
// }
// }
// import { Observable, of, throwError } from 'rxjs';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { retry,catchError, tap, map } from 'rxjs/operators';
// import { Injectable } from '@angular/core';
// import { Address } from '../models/Address';


// @Injectable({
//   providedIn: 'root'
// })
// export class AddressService {

//   apiUrl = 'https://localhost:7292'
//   httpOptions ={
//     headers: new HttpHeaders({
//       ContentType: 'application/json'
//     })
//   }

//   constructor(private httpClient: HttpClient) {   

//   }

//   get(){
//     return this.httpClient.get<Address[]>("https://localhost:7292/address")
//   }

//   private handleError(error: HttpErrorResponse) {
//     if (error.error instanceof ErrorEvent) {
//       // A client-side or network error occurred. Handle it accordingly.
//       console.error('An error occurred:', error.error.message);
//     } else {
//       // The backend returned an unsuccessful response code.
//       // The response body may contain clues as to what went wrong,
//       console.error(
//         `Backend returned code ${error.status}, ` +
//         `body was: ${error.error}`);
//     }
//     // return an observable with a user-facing error message
//     return throwError('Something bad happened; please try again later.');
    
//   }





  
//   private extractData(res: Response) {
//     let body = res;
//     return body || { };
//   }




//   AddAddress(address: Address){
//     return this.httpClient.post(this.apiUrl + '/Create' , address, this.httpOptions)


//   }





// ////////////////////////////////////////real


// getList(): Observable<Address> {
//   return this.httpClient
//     .get<Address>(this.apiUrl + '/GetAllAddresses')
//     .pipe(
//       retry(2),
//       catchError(this.handleError)
//     )
// }

// // Create a new item
// createAddress(item): Observable<Address> {
//   return this.httpClient
//     .post<Address>(this.apiUrl + '/Create',JSON.stringify(item), this.httpOptions)
//     .pipe(
//       retry(2),
//       catchError(this.handleError)
//     )
// }

// // Get single student data by ID
// getItem(id): Observable<Address> {
//   return this.httpClient
//     .get<Address>(this.apiUrl + '/AddressByid' + '/' + id)
//     .pipe(
//       retry(2),
//       catchError(this.handleError)
//     )
// }

// // Update item by id
// updateItem(id, item): Observable<Address> {
//   return this.httpClient
//     .put<Address>(this.apiUrl + '/UpdateAddress' + '/' + id, JSON.stringify(item), this.httpOptions)
//     .pipe(
//       retry(2),
//       catchError(this.handleError)
//     )
// }

// // Delete item by id
// deleteItem(id) {
//   return this.httpClient
//     .delete<Address>(this.apiUrl + '/DeleteAddress' + '/' + id, this.httpOptions)
//     .pipe(
//       retry(2),
//       catchError(this.handleError)
//     )
// }












// /////////////////////////////////////////////////////real



//   getAddressID(id): Observable<Address[]> {
//     return this.httpClient.get<Address[]>('https://localhost:7292/api/AddressByid' + id)
//       .pipe(
//         tap(_ => console.log(`Address fetched: ${id}`)),
//         catchError(this.handleError)
//       );
//   }





//   GetAddress(): Observable<any>{
//     return this.httpClient.get(`${this.apiUrl}/GetAllAddresses`)
//     .pipe(map(result => result))
//   }





// }



