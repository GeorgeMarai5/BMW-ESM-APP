// import { Observable, throwError } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
// import { Fleet } from '../models/Fleet';
// import { retry, catchError } from 'rxjs/operators';
// import { Model } from 'app/models/Model';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// @Injectable({
//   providedIn: 'root',
// })

// export class FleetService {

//  apiUrl = 'https://localhost:7163/api/Fleets';

//   constructor(private httpClient: HttpClient) {}

//   httpOptions = {
//   headers: new HttpHeaders({
//    'Content-Type': 'application/json'
//    })
//     }
   
// createFleet(item): Observable<Fleet> {
//     return this.httpClient
//       .post<Fleet>(this.apiUrl , JSON.stringify(item), this.httpOptions)  
//   }

// getFleet(id): Observable<Fleet> {
//   return this.httpClient
//     .get<Fleet>(this.apiUrl + '/' + id)
// }

// getFleetList(): Observable<Fleet> {
//   return this.httpClient
//     .get<Fleet>(this.apiUrl)
// }

// updateFleet(id, item): Observable<Fleet> {
//   return this.httpClient
//     .put<Fleet>(this.apiUrl + '/' + id, JSON.stringify(item), this.httpOptions)
// }

// deleteFleet(id) {
//       return this.httpClient
//    .delete<Fleet>(this.apiUrl + '/' + id, this.httpOptions)
// }
// }

import { Injectable } from '@angular/core';
//import { Fleet } from '../models/fleet';
import { Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry,catchError, tap, map } from 'rxjs/operators';
import { Fleet } from '../models/fleet';

@Injectable({
  providedIn: 'root'
})
export class FleetService {

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


  createFleet(Fleet: Fleet){
    return this.httpClient.post(this.apiUrl + '/api/Fleets/Create' , Fleet, this.httpOptions)


  }


  getFleetList(): Observable<Fleet> {
    return this.httpClient
      .get<Fleet>(this.apiUrl + '/api/Fleet/GetAllFleets')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  
  // Get single student data by ID
  getFleet(id): Observable<Fleet> {
    return this.httpClient
      .get<Fleet>(this.apiUrl + '/api/Fleet/id?id=' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  // Update item by id
  updateFleet(item): Observable<Fleet> {
    return this.httpClient
      .put<Fleet>(this.apiUrl + '/api/Fleet/UpdateFleet' + '?' + item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  // Delete item by id
  delete(id) {
    return this.httpClient
      .delete<Fleet>(this.apiUrl + '/api/Fleet/DeleteFleet' + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }



  deleteFleet(id): Observable<{}> {
  
    return this.httpClient.delete(this.apiUrl + '/api/Fleet/DeleteFleet?id=' +  id , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  // getFleet(id): Observable<{}> {
  
  //   return this.httpClient.get<Fleet>(this.apiUrl + '/api/Fleet/id?id=' +  id , this.httpOptions)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  }
  
  




































/*

  import { AngularFirestore } from "@angular/fire/compat/firestore";
  import {AngularFireDatabase,AngularFireList,AngularFireObject} from '@angular/fire/compat/database';


  create_Fleet(Fleet) {
    return this.firestore.collection(this.collectionName).add(Fleet);
  }

  read_Fleet() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  get_Fleet(FleetId){
    return this.firestore.collection(this.collectionName).doc(FleetId).get();
  }

  getFleet(id: string){
    return this.firestore.collection(this.collectionName).doc(id);
  }

  update_Fleet(FleetID,Fleet) {
    this.firestore.doc(this.collectionName + '/' + FleetID).update(Fleet);
  }

  updateFleet(id, fleets) {
    this.firestore.doc(this.collectionName + '/' + id).update(fleets);
  }

  deleteFleet(id: string) {
    this.FleetRef = this.db.object('/Fleet/' + id);
    this.FleetRef.remove();
  }




  delete_Fleet(Fleet_ID) {
    this.firestore.doc(this.collectionName + '/' + Fleet_ID).delete();
  }
}

*/