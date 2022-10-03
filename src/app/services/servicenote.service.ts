import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Service_Note } from '../models/Service_Note';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class ServiceNoteService {

 apiUrl = 'https://localhost:7163/api';

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

     createServiceNote(ServiceNote: Service_Note){
      return this.httpClient.post(this.apiUrl + '/CreateServiceNote' , ServiceNote, this.httpOptions)
    }
  
     getServiceNoteList(): Observable<Service_Note> {
       return this.httpClient
       .get<Service_Note>(this.apiUrl + 'GetAllServiceNotes')
         .pipe(
           retry(2),
           catchError(this.handleError)
         )
     }
  
     getServiceNote(id): Observable<Service_Note> {
       return this.httpClient
         .get<Service_Note>(this.apiUrl + '/api/ServiceNotes/id?id=' + id)
         .pipe(
           retry(2),
           catchError(this.handleError)
         )
     }
    
     updateServiceNote(id, item): Observable<Service_Note> {
       return this.httpClient
         .put<Service_Note>(this.apiUrl + '/api/ServiceNotes/PutServiceNote' + id, item, this.httpOptions)
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
   }