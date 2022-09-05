import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Dealership } from '../models/Dealership';

@Injectable({
  providedIn: 'root'
})
export class DealershipService {

  apiUrl = 'https://localhost:7292'
  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { 

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

  AssignDealership(dealership: Dealership){
    return this.httpClient.post(this.apiUrl + '/api/Dealership/Create' , dealership, this.httpOptions)
  }

  getList(): Observable<Dealership> {
    return this.httpClient
      .get<Dealership>(this.apiUrl + '/api/Dealership/GetAllDealerships')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  getItem(id): Observable<Dealership> {
    return this.httpClient
      .get<Dealership>(this.apiUrl + '/DealershipByid' + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  updateItem(id, item): Observable<Dealership> {
    return this.httpClient
      .put<Dealership>(this.apiUrl + '/UpdateDealership' + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  deleteItem(id) {
    return this.httpClient
      .delete<Dealership>(this.apiUrl + '/DeleteDealership' + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}




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

