import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Part } from '../models/Part';

@Injectable({
  providedIn: 'root'
})
export class AssignedPartService {

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

  AssignDealership(part: Part){
    return this.httpClient.post(this.apiUrl + '/api/Part/Create' , part, this.httpOptions)
  }

  getList(): Observable<Part> {
    return this.httpClient
      .get<Part>(this.apiUrl + '/api/Part/GetAllParts')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  getItem(id): Observable<Part> {
    return this.httpClient
      .get<Part>(this.apiUrl + '/PartByid' + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  updateItem(id, item): Observable<Part> {
    return this.httpClient
      .put<Part>(this.apiUrl + '/UpdatePart' + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  deleteItem(id) {
    return this.httpClient
      .delete<Part>(this.apiUrl + '/DeletePart' + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}





  /*collectionName = 'Vehicle';

  constructor(private firestore: AngularFirestore) { }

  getAssignedParts() {
    return this.firestore.collection('Vehicle').snapshotChanges();
  }

  createAssignedPart(part) {
    return this.firestore.collection(this.collectionName).add(part);
  }

  getAssignedPart(id: string){
    return this.firestore.collection(this.collectionName).doc(id);
  }

  updateAssignedPart(id, part) {
    this.firestore.doc(this.collectionName + '/' + id).update(part);
  }

  deleteAssignedPart(id) {
    this.firestore.doc(this.collectionName + '/' + id).delete();
  }
*/
