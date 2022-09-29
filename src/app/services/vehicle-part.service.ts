// import { Observable, throwError } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
// //import { Vehicle_Part } from '../models/Vehicle_Part';
// import { retry, catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class VehiclePartService {

//   apiUrl = 'https://localhost:7292/api/VehiclePart';

//   constructor(private httpClient: HttpClient) {}

//   httpOptions = {
//    headers: new HttpHeaders({
//     'Content-Type': 'application/json'
//     })
//     }
    
//   createVehiclePart(item): Observable<Vehicle_Part> {
//     return this.httpClient
//       .post<Vehicle_Part>(this.apiUrl , JSON.stringify(item), this.httpOptions)  
//   }

// getVehiclePart(id): Observable<Vehicle_Part> {
//   return this.httpClient
//     .get<Vehicle_Part>(this.apiUrl + '/' + id)
// }

// getVehiclePartList(): Observable<Vehicle_Part> {
//   return this.httpClient
//     .get<Vehicle_Part>(this.apiUrl)
// }

// updateVehiclePart(id, item): Observable<Vehicle_Part> {
//   return this.httpClient
//     .put<Vehicle_Part>(this.apiUrl + '/' + id, JSON.stringify(item), this.httpOptions)
// }

// deleteVehiclePart(id) {
//   return this.httpClient
//     .delete<Vehicle_Part>(this.apiUrl + '/' + id, this.httpOptions)
// }
// }
