import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { ServiceItem } from '../models/ServiceItem';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class ServiceItemService {

 apiUrl = 'https://localhost:7292/api/ServiceItem';

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
  headers: new HttpHeaders({
   'Content-Type': 'application/json'
   })
    }
   
createServiceItem(item): Observable<ServiceItem> {
    return this.httpClient
      .post<ServiceItem>(this.apiUrl , JSON.stringify(item), this.httpOptions)  
  }

getServiceItem(id): Observable<ServiceItem> {
  return this.httpClient
    .get<ServiceItem>(this.apiUrl + '/' + id)
}

getServiceItemList(): Observable<ServiceItem> {
  return this.httpClient
    .get<ServiceItem>(this.apiUrl)
}

updateServiceItem(id, item): Observable<ServiceItem> {
  return this.httpClient
    .put<ServiceItem>(this.apiUrl + '/' + id, JSON.stringify(item), this.httpOptions)
}

deleteServiceItem(id) {
      return this.httpClient
   .delete<ServiceItem>(this.apiUrl + '/' + id, this.httpOptions)
}

}