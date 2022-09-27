import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { AssignedPart } from '../models/AssignedPart';
import { retry, catchError } from 'rxjs/operators';
import { Model } from 'app/models/VehicleModel';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})

export class AssignedPartService {

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
  
  createAssignedPart(createAssignedPart: AssignedPart){
    return this.httpClient.post(this.apiUrl + '/api/AssignedParts/CreateAssignedPart' , AssignedPart, this.httpOptions)
  }

  getAssignedPartList(): Observable<AssignedPart> {
    return this.httpClient
      .get<AssignedPart>(this.apiUrl + '/api/AssignedParts/GetAssignedPartList')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getAssignedPart(id): Observable<AssignedPart> {
    return this.httpClient
      .get<AssignedPart>(this.apiUrl + '/api/AssignedParts/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  updateAssignedPart(item): Observable<AssignedPart> {
    return this.httpClient
      .put<AssignedPart>(this.apiUrl + '/api/AssignedParts/' + '?' + item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  deleteAssignedPart(id): Observable<{}> {
  
    return this.httpClient.delete(this.apiUrl + '/api/AssignedParts/' +  id , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}

// createAssignedPart(item): Observable<AssignedPart> {
//     return this.httpClient
//       .post<AssignedPart>(this.apiUrl , JSON.stringify(item), this.httpOptions)  
//   }

// getAssignedPart(id): Observable<AssignedPart> {
//   return this.httpClient
//     .get<AssignedPart>(this.apiUrl + '/' + id)
// }

// getAssignedPartList(): Observable<AssignedPart> {
//   return this.httpClient
//     .get<AssignedPart>(this.apiUrl)
// }

// updateAssignedPart(id, item): Observable<AssignedPart> {
//   return this.httpClient
//     .put<AssignedPart>(this.apiUrl + '/' + id, JSON.stringify(item), this.httpOptions)
// }

// deleteAssignedPart(id) {
//       return this.httpClient
//    .delete<AssignedPart>(this.apiUrl + '/' + id, this.httpOptions)
// }
// }
// import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { throwError, Observable } from 'rxjs';
// import { retry, catchError } from 'rxjs/operators';
// import { Part } from '../models/Part';

// @Injectable({
//   providedIn: 'root'
// })
// export class AssignedPartService {

//   apiUrl = 'https://localhost:7292'
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

//   AssignDealership(part: Part){
//     return this.httpClient.post(this.apiUrl + '/api/Part/Create' , part, this.httpOptions)
//   }

//   getList(): Observable<Part> {
//     return this.httpClient
//       .get<Part>(this.apiUrl + '/api/Part/GetAllParts')
//       .pipe(
//         retry(2),
//         catchError(this.handleError)
//       )
//   }


//   getItem(id): Observable<Part> {
//     return this.httpClient
//       .get<Part>(this.apiUrl + '/PartByid' + '/' + id)
//       .pipe(
//         retry(2),
//         catchError(this.handleError)
//       )
//   }
  
//   updateItem(id, item): Observable<Part> {
//     return this.httpClient
//       .put<Part>(this.apiUrl + '/UpdatePart' + '/' + id, JSON.stringify(item), this.httpOptions)
//       .pipe(
//         retry(2),
//         catchError(this.handleError)
//       )
//   }
  
//   deleteItem(id) {
//     return this.httpClient
//       .delete<Part>(this.apiUrl + '/DeletePart' + '/' + id, this.httpOptions)
//       .pipe(
//         retry(2),
//         catchError(this.handleError)
//       )
//   }
// }





//   /*collectionName = 'Vehicle';

//   constructor(private firestore: AngularFirestore) { }

//   getAssignedParts() {
//     return this.firestore.collection('Vehicle').snapshotChanges();
//   }

//   createAssignedPart(part) {
//     return this.firestore.collection(this.collectionName).add(part);
//   }

//   getAssignedPart(id: string){
//     return this.firestore.collection(this.collectionName).doc(id);
//   }

//   updateAssignedPart(id, part) {
//     this.firestore.doc(this.collectionName + '/' + id).update(part);
//   }

//   deleteAssignedPart(id) {
//     this.firestore.doc(this.collectionName + '/' + id).delete();
//   }
// */
