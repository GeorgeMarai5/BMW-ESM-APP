// import { Observable, throwError } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
// //import { Service_Invoice } from '../models/Service_Invoice';
// import { retry, catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class ServiceInvoiceService {

//   apiUrl = 'https://localhost:7292/api/ServiceInvoice';

//   constructor(private httpClient: HttpClient) {}

//   httpOptions = {
//    headers: new HttpHeaders({
//     'Content-Type': 'application/json'
//     })
//     }
    
//   createServiceInvoice(item): Observable<Service_Invoice> {
//     return this.httpClient
//       .post<Service_Invoice>(this.apiUrl , JSON.stringify(item), this.httpOptions)  
//   }

// getServiceInvoice(id): Observable<Service_Invoice> {
//   return this.httpClient
//     .get<Service_Invoice>(this.apiUrl + '/' + id)
// }

// getServiceInvoiceList(): Observable<Service_Invoice> {
//   return this.httpClient
//     .get<Service_Invoice>(this.apiUrl)
// }

// updateServiceInvoice(id, item): Observable<Service_Invoice> {
//   return this.httpClient
//     .put<Service_Invoice>(this.apiUrl + '/' + id, JSON.stringify(item), this.httpOptions)
// }

// deleteServiceInvoice(id) {
//   return this.httpClient
//     .delete<Service_Invoice>(this.apiUrl + '/' + id, this.httpOptions)
// }
// }
