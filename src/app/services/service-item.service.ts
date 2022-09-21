// import { Observable, throwError } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
// //import { Service_Item } from '../models/Service_Item';
// import { retry, catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class ServiceItemService {

//   apiUrl = 'https://localhost:7292/api/ServiceItem';

//   constructor(private httpClient: HttpClient) {}

//   httpOptions = {
//    headers: new HttpHeaders({
//     'Content-Type': 'application/json'
//     })
//     }
    
//   createServiceItem(item): Observable<Service_Item> {
//     return this.httpClient
//       .post<Service_Item>(this.apiUrl , JSON.stringify(item), this.httpOptions)  
//   }

// getServiceItem(id): Observable<Service_Item> {
//   return this.httpClient
//     .get<Service_Item>(this.apiUrl + '/' + id)
// }

// getServiceItemList(): Observable<Service_Item> {
//   return this.httpClient
//     .get<Service_Item>(this.apiUrl)
// }

// updateServiceItem(id, item): Observable<Service_Item> {
//   return this.httpClient
//     .put<Service_Item>(this.apiUrl + '/' + id, JSON.stringify(item), this.httpOptions)
// }

// deleteServiceItem(id) {
//   return this.httpClient
//     .delete<Service_Item>(this.apiUrl + '/' + id, this.httpOptions)
// }
// }
