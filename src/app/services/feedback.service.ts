
import { Injectable } from '@angular/core';
import { Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry,catchError, tap, map } from 'rxjs/operators';
import { Feedback } from '../models/Feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

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


//   createFleet(Feedback: Feedback){
//     return this.httpClient.post(this.apiUrl + '/api/Fleets/Create' , Fleet, this.httpOptions)


//   }


  getFeedbackList(): Observable<Feedback> {
    return this.httpClient
      .get<Feedback>(this.apiUrl + '/api/Feedbacks/GetAllFeedback')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}
  
//   // Get single student data by ID
//   getFleet(id): Observable<Feedback> {
//     return this.httpClient
//       .get<Feedback>(this.apiUrl + '/api/Fleets/' + id)
//       .pipe(
//         retry(2),
//         catchError(this.handleError)
//       )
//   }
  
//   // Update item by id
//   updateFleet(item): Observable<Fleet> {
//     return this.httpClient
//       .put<Fleet>(this.apiUrl + '/api/Fleets/' + item, this.httpOptions)
//       .pipe(
//         retry(2),
//         catchError(this.handleError)
//       )
//   }

//   updatefleet(id, item): Observable<Fleet> {
//     return this.httpClient
//       .put<Fleet>(this.apiUrl + '/api/Fleets/' + id, item, this.httpOptions)
//       .pipe(
//         retry(2),
//         catchError(this.handleError)
//       )
//   }
  
//   // Delete item by id
//   delete(id) {
//     return this.httpClient
//       .delete<Fleet>(this.apiUrl + '/api/Fleets' + '/' + id, this.httpOptions)
//       .pipe(
//         retry(2),
//         catchError(this.handleError)
//       )
//   }



//   deleteFleet(id): Observable<{}> {
  
//     return this.httpClient.delete(this.apiUrl + '/api/Fleets/' +  id , this.httpOptions)
//       .pipe(
//         catchError(this.handleError)
//       );
//   }
