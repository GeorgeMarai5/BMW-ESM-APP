import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Vehicle } from '../models/Vehicle';
import { retry, catchError } from 'rxjs/operators';
import { VehicleModel } from 'app/models/VehicleModel';

@Injectable({
  providedIn: 'root',
})

export class VehicleService {

 apiUrl = 'https://localhost:7163/api/Vehicles';

 httpOptions ={
  headers: new HttpHeaders({
    ContentType: 'application/json'
  })
}

constructor(private httpClient: HttpClient) { }

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

createVehicle(Vehicle: Vehicle){
  return this.httpClient.post(this.apiUrl + '/api/Vehicles/Create' , Vehicle, this.httpOptions)
}

getVehicleList(): Observable<Vehicle> {
  return this.httpClient
    .get<Vehicle>(this.apiUrl + '/GetAllVehicles')
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

getVehicl(): Observable<Vehicle> {
  return this.httpClient
    .get<Vehicle>(this.apiUrl + '/GetAllVehicles')
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}



getVehicleModelList(): Observable<VehicleModel> {
  return this.httpClient
    .get<VehicleModel>(this.apiUrl + '/VehicleModel')
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get single student data by ID
getVehicle(id): Observable<Vehicle> {
  return this.httpClient
    .get<Vehicle>(this.apiUrl + '/api/Vehicle/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Update item by id
updateVehicle(id, item): Observable<Vehicle> {
  return this.httpClient
    .put<Vehicle>(this.apiUrl + '/api/Vehicle/UpdateVehicle' + id, item, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Delete item by id
delete(id) {
  return this.httpClient
    .delete<Vehicle>(this.apiUrl + '/api/Vehicle' + '/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

deleteVehicle(id): Observable<{}> {

  return this.httpClient.delete(this.apiUrl + '/api/Vehicle/' +  id , this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
}

  getYear(yearCode: string){
    let yearFromCode = '';
    switch(yearCode){
      case 'Y':
        yearFromCode = '2000';
        break;
      case '1':
        yearFromCode = '2001'; 
        break;
      case '2':
        yearFromCode = '2002'; 
        break;
      case '3':
        yearFromCode = '2003'; 
        break;
      case '4':
        yearFromCode = '2004'; 
        break;
      case '5':
        yearFromCode = '2005'; 
        break;
      case '6':
        yearFromCode = '2006'; 
        break;
      case '7':
        yearFromCode = '2007'; 
        break;
      case '8':
        yearFromCode = '2008'; 
        break;
      case '9':
        yearFromCode = '2009'; 
        break;
      case 'A':
        yearFromCode = '2010'; 
        break;
      case 'B':
        yearFromCode = '2011'; 
        break;
      case 'C':
        yearFromCode = '2012'; 
        break;
      case 'D':
        yearFromCode = '2013'; 
        break;
      case 'E':
        yearFromCode = '2014'; 
        break;
      case 'F':
        yearFromCode = '2015'; 
        break;
      case 'G':
        yearFromCode = '2016'; 
        break;
      case 'H':
        yearFromCode = '2017'; 
        break;
      case 'J':
        yearFromCode = '2018'; 
        break;
      case 'K':
        yearFromCode = '2019'; 
        break;
      case 'L':
        yearFromCode = '2020'; 
        break;
      case 'M':
        yearFromCode = '2021'; 
        break;
      case 'N':
        yearFromCode = '2022'; 
        break;
      case 'P':
        yearFromCode = '2023'; 
        break;
      case 'R':
        yearFromCode = '2024'; 
        break;
      case 'S':
        yearFromCode = '2025'; 
        break;
      case 'T':
        yearFromCode = '2026'; 
        break;
      case 'V':
        yearFromCode = '2027'; 
        break;
      case 'W':
        yearFromCode = '2028'; 
        break;
      case 'X':
        yearFromCode = '2029'; 
        break;
      default:
        yearFromCode = 'No Year';
        break;
    }
    return yearFromCode;
  }
}
