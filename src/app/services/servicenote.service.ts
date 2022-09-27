import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Service_Note } from '../models/Service_Note';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServiceNoteService {
  
  apiUrl = 'https://localhost:7163';
 
  constructor(private httpClient: HttpClient) {}

  httpOptions ={
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


  createServiceNote(createServiceNote: Service_Note){
    return this.httpClient.post(this.apiUrl + '/api/ServiceNotes/CreateServiceNote' , Service_Note, this.httpOptions)
  }

  getServiceNoteList(): Observable<Service_Note> {
    return this.httpClient
      .get<Service_Note>(this.apiUrl + '/api/ServiceNotes/GetServiceNoteList')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getServiceNote(id): Observable<Service_Note> {
    return this.httpClient
      .get<Service_Note>(this.apiUrl + '/api/ServiceNotes/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  updateServiceNote(item): Observable<Service_Note> {
    return this.httpClient
      .put<Service_Note>(this.apiUrl + '/api/ServiceNotes/' + '?' + item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  deleteServiceNote(id): Observable<{}> {
  
    return this.httpClient.delete(this.apiUrl + '/api/ServiceNotes/' +  id , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // };


  // createServiceNote(createNote: ServiceNote){
  //   return this.httpClient.post(`${this.apiUrl}/PostService_Note`, createNote, this.httpOptions)
  // }
  // createServiceNote(item): Observable<Service_Note> {
  //   return this.httpClient
  //     .post<Service_Note>(this.apiUrl , JSON.stringify(item), this.httpOptions)
      
  // }

  // .pipe(
  //   retry(2),
  //   catchError(this.handleError)


  // createServiceNote(data: any) {
  //   return this.httpClient.post(this.apiUrl + "/ServiceNote/Create", data);
  // }

  // getServiceNote(id: string) {
  //   return this.firestore.collection(this.collectionName).doc(id);
  // }


// // Get single student data by ID
// getServiceNote(id): Observable<Service_Note> {
//   return this.httpClient
//     .get<Service_Note>(this.apiUrl + '/' + id)

// }

// // Get students data
// getServiceNoteList(): Observable<Service_Note> {
//   return this.httpClient
//     .get<Service_Note>(this.apiUrl)
  
// }

// // Update item by id
// updateServiceNote(id, item): Observable<Service_Note> {
//   return this.httpClient
//     .put<Service_Note>(this.apiUrl + '/' + id, JSON.stringify(item), this.httpOptions)

// }

// // Delete item by id
// deleteServiceNote(id) {
//   return this.httpClient
//     .delete<Service_Note>(this.apiUrl + '/' + id, this.httpOptions)

// }




  // getServiceNotes(): Observable<any[]> {
  //   return this.httpClient.get<any>(this.apiUrl + "/ServiceNote")
  // }
  // updateServiceNote(id: number | string, data: any) {
  //   this.httpClient.put(this.apiUrl + "/ServiceNote/${id}", data)
  // }
  // deleteServiceNote(id:number | string) {
  //   this.httpClient.delete(this.apiUrl + "/ServiceNote/${id}")
  // }
}

// export class ServiceNoteService {
//   apiUrl = 'https://localhost:7005/api/';

//   httpOptions = {
//     headers: new HttpHeaders({
//       ContentType: 'application/json',
//     }),
//   };

//   constructor(private httpClient: HttpClient) {}

//   GetServiceNote(GetServiceNote: ServiceNote) {
//     return this.httpClient.post(
//       `${this.apiUrl}ServiceNoteController/GetServiceNote`,
//       GetServiceNote,
//       this.httpOptions
//     );
//   }

//   DeleteServiceNote(DeleteServiceNote: ServiceNote) {
//     return this.httpClient.delete<ServiceNote>(
//       `${this.apiUrl}ServiceNoteController/DeleteServiceNote`
//     );
//   }
// }


// intiateService(value: any) {
  //   throw new Error('Method not implemented.');
  // }

  // ServiceRef: AngularFireObject<any>;
  // readService() {
  //   return this.firestore.collection(this.collectionName).snapshotChanges();
  // }
  // collectionName = 'Service_Note';

  
  // getServices(id: string) {
  //   return this.firestore.collection('Service').snapshotChanges();
  // }