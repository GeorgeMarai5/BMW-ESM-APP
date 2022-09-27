import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Dealership } from '../models/Dealership';
import { retry, catchError } from 'rxjs/operators';
import { Model } from 'app/models/Model';

@Injectable({
  providedIn: 'root',
})

export class DealershipService {

 apiUrl = 'https://localhost:7163/Dealerships/PostDealership';

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

    createDealership(dealership: Dealership): Observable<Dealership> {
    
      return this.httpClient
        .post<Dealership>(this.apiUrl, dealership).pipe(
          retry(2),
          catchError(this.handleError))
    }

    // createDealership(item): Observable<Dealership> {
    //   return this.httpClient
    //     .post<Dealership>(this.apiUrl , JSON.stringify(item), this.httpOptions).pipe(
    //       retry(2),
    //       catchError(this.handleError))
    // }

  //     createPlayer(player): Observable<Player> {
  //   return this.httpClient.post<Player>(this.apiURL + '/players/', JSON.stringify(player), this.httpOptions)
  //     .pipe(
  //       catchError(this.errorHandler)
  //     );
  // }
    // createDealership(Dealership: Dealership){
    //   return this.httpClient.post(this.apiUrl + '/api/Dealerships/PostDealership' , Dealership, this.httpOptions)
    // }
  
    getDealershipList(): Observable<Dealership> {
      return this.httpClient
        .get<Dealership>(this.apiUrl + '/api/Dealerships/GetAllDealerships')
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
  
    // Get single student data by ID
    getDealership(id): Observable<Dealership> {
      return this.httpClient
        .get<Dealership>(this.apiUrl + '/api/Dealerships/id?id=' + id)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
    
    // Update item by id
    updateDealership(item): Observable<Dealership> {
      return this.httpClient
        .put<Dealership>(this.apiUrl + '/api/Dealerships/PutDealership' + '?' + item, this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
    
    // Delete item by id
    delete(id) {
      return this.httpClient
        .delete<Dealership>(this.apiUrl + '/api/Fleet/DeleteFleet' + '/' + id, this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }
  
  
  
    deleteDealership(id): Observable<{}> {
    
      return this.httpClient.delete(this.apiUrl + '/api/Dealerships/DeleteDealership?id=' +  id , this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    }
  
// createDealership(item): Observable<Dealership> {
//     return this.httpClient
//       .post<Dealership>(this.apiUrl, JSON.stringify(item), this.httpOptions)  
//   }

// getDealership(id): Observable<Dealership> {
//   return this.httpClient
//     .get<Dealership>(this.apiUrl + '/' + id)
// }

// getDealershipList(): Observable<Dealership> {
//   return this.httpClient
//     .get<Dealership>(this.apiUrl)
// }

// updateDealership(id, item): Observable<Dealership> {
//   return this.httpClient
//     .put<Dealership>(this.apiUrl + '/' + id, JSON.stringify(item), this.httpOptions)
// }

// deleteDealership(id) {
//       return this.httpClient
//    .delete<Dealership>(this.apiUrl + '/' + id, this.httpOptions)
// }

}
// import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { throwError, Observable } from 'rxjs';
// import { retry, catchError } from 'rxjs/operators';
// import { Dealership } from '../models/Dealership';

// @Injectable({
//   providedIn: 'root'
// })
// export class DealershipService {

//   apiUrl = 'https://localhost:7163'
//   httpOptions ={
//     headers: new HttpHeaders({
//       ContentType: 'application/json'
//     })
//   }

//   constructor(private httpClient: HttpClient) { 

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

//   AssignDealership(dealership: Dealership){
//     return this.httpClient.post(this.apiUrl + '/api/Dealerships' , dealership, this.httpOptions)
//   }

//   getList(): Observable<Dealership> {
//     return this.httpClient
//       .get<Dealership>(this.apiUrl + '/api/Dealership/')
//       .pipe(
//         retry(2),
//         catchError(this.handleError)
//       )
//   }


//   getItem(id): Observable<Dealership> {
//     return this.httpClient
//       .get<Dealership>(this.apiUrl + '/api/Dealership/GetDealership/1')
//       .pipe(
//         retry(2),
//         catchError(this.handleError)
//       )
//   }










  
//   updateItem(id, item): Observable<Dealership> {
//     return this.httpClient
//       .put<Dealership>(this.apiUrl + '/UpdateDealership' + '/' + id, JSON.stringify(item), this.httpOptions)
//       .pipe(
//         retry(2),
//         catchError(this.handleError)
//       )
//   }
  
//   deleteItem(id) {
//     return this.httpClient
//       .delete<Dealership>(this.apiUrl + '/DeleteDealership' + '/' + id, this.httpOptions)
//       .pipe(
//         retry(2),
//         catchError(this.handleError)
//       )
//   }
// }




  /*collectionName = 'Dealership';

  constructor(private firestore: AngularFirestore) { }

  getDealerships() {
    return this.firestore.collection('Dealership').snapshotChanges();
  }

  createDealership(dealership) {
    return this.firestore.collection(this.collectionName).add(dealership);
  }

  getDealership(id: string){
    return this.firestore.collection(this.collectionName).doc(id);
  }

  updateDealership(id, dealership) {
    this.firestore.doc(this.collectionName + '/' + id).update(dealership);
  }

  deleteDealership(id) {
    this.firestore.doc(this.collectionName + '/' + id).delete();
  }
  */

