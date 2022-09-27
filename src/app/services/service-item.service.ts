import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { ServiceItem } from '../models/ServiceItem';
import { retry, catchError } from 'rxjs/operators';
import { Model } from 'app/models/Model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})

export class TeamService {

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
  
  createServiceItem(createServiceItem: ServiceItem){
    return this.httpClient.post(this.apiUrl + '/api/ServiceItems/CreateServiceItem' , ServiceItem, this.httpOptions)
  }

  getServiceItemList(): Observable<ServiceItem> {
    return this.httpClient
      .get<ServiceItem>(this.apiUrl + '/api/ServiceItems/GetServiceItemList')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getServiceItem(id): Observable<ServiceItem> {
    return this.httpClient
      .get<ServiceItem>(this.apiUrl + '/api/ServiceItems/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  updateServiceItem(item): Observable<ServiceItem> {
    return this.httpClient
      .put<ServiceItem>(this.apiUrl + '/api/ServiceItems/UpdateServiceItem' + '?' + item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  deleteServiceItem(id): Observable<{}> {
  
    return this.httpClient.delete(this.apiUrl + '/api/ServiceItems/' +  id , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}




// import { Observable, throwError } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
// import { ServiceItem } from '../models/ServiceItem';
// import { retry, catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })

// export class ServiceItemService {

//  apiUrl = 'https://localhost:7292/api/ServiceItem';

//   constructor(private httpClient: HttpClient) {}

//   httpOptions = {
//   headers: new HttpHeaders({
//    'Content-Type': 'application/json'
//    })
//     }
   
// createServiceItem(item): Observable<ServiceItem> {
//     return this.httpClient
//       .post<ServiceItem>(this.apiUrl , JSON.stringify(item), this.httpOptions)  
//   }

// getServiceItem(id): Observable<ServiceItem> {
//   return this.httpClient
//     .get<ServiceItem>(this.apiUrl + '/' + id)
// }

// getServiceItemList(): Observable<ServiceItem> {
//   return this.httpClient
//     .get<ServiceItem>(this.apiUrl)
// }

// updateServiceItem(id, item): Observable<ServiceItem> {
//   return this.httpClient
//     .put<ServiceItem>(this.apiUrl + '/' + id, JSON.stringify(item), this.httpOptions)
// }

// deleteServiceItem(id) {
//       return this.httpClient
//    .delete<ServiceItem>(this.apiUrl + '/' + id, this.httpOptions)
// }

// }