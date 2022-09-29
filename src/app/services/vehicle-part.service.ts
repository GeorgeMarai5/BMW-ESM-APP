import { Injectable } from '@angular/core';
import { Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry,catchError, tap, map } from 'rxjs/operators';
import { Part } from '../models/part';

@Injectable({
  providedIn: 'root'
})
export class VehiclePartService {
  apiUrl = 'https://localhost:7163'
  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }                                             
  

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


  createPart(Part: Part){
    return this.httpClient.post(this.apiUrl + '/api/Parts/Create' , Part, this.httpOptions)


  }


  getPartList(): Observable<Part> {
    return this.httpClient
      .get<Part>(this.apiUrl + '/api/Parts/GetAll')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  
  // Get single student data by ID
  getPart(id): Observable<Part> {
    return this.httpClient
      .get<Part>(this.apiUrl + '/api/Parts/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  // Update item by id
  updatepart(item): Observable<Part> {
    return this.httpClient
      .put<Part>(this.apiUrl + '/api/Parts/' + item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updatePart(id, item): Observable<Part> {
    return this.httpClient
      .put<Part>(this.apiUrl + '/api/Parts/' + id, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
//   // Delete item by id
//   delete(id) {
//     return this.httpClient
//       .delete<Fleet>(this.apiUrl + '/api/Fleets' + '/' + id, this.httpOptions)
//       .pipe(
//         retry(2),
//         catchError(this.handleError)
//       )
//   }



  deletePart(id): Observable<{}> {
  
    return this.httpClient.delete(this.apiUrl + '/api/Parts/' +  id , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


}

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
