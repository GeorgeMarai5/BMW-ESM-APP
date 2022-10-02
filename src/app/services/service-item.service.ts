import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { ServiceItem } from '../models/ServiceItem';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class ServiceItemService {

  apiUrl = 'https://localhost:7163/api/ServiceItems';

  constructor(private httpClient: HttpClient) {}

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
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


  createServiceItem(ServiceItem: ServiceItem){
    return this.httpClient.post(this.apiUrl + '/CreateServiceItem' , ServiceItem, this.httpOptions)
  }


  getServiceItemList(): Observable<ServiceItem> {
    return this.httpClient
      .get<ServiceItem>(this.apiUrl + '/GetAllServiceItems')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get single student data by ID
  getServiceItem(id): Observable<ServiceItem> {
    return this.httpClient
      .get<ServiceItem>(this.apiUrl + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  

  updateserviceItem(id, item): Observable<ServiceItem> {
    return this.httpClient
      .put<ServiceItem>(this.apiUrl + '/' + id, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  deleteServiceItem(id): Observable<{}> {
  
    return this.httpClient.delete(this.apiUrl + '/' +  id , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

}