import { Injectable } from '@angular/core';
import { Vehicle } from '../models/Vehicle';
import { Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry,catchError, tap, map } from 'rxjs/operators';
import { Model } from '../models/Model';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  collectionName = 'Vehicle';
  apiUrl = 'https://localhost:7292'
  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }                                             //private db: AngularFireDatabase,private firestore: AngularFirestore
  

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



  // getVehicles() {
  //   return this.firestore.collection('Vehicle').snapshotChanges();
  // }

  createVehicle(Vehicle: Vehicle) {
    return this.httpClient.post(this.apiUrl + '/Vehicle', Vehicle, this.httpOptions);
  }

  // getVehicle(id: string){
  //   return this.firestore.collection(this.collectionName).doc(id);
  // }

  // updateVehicle(id, vehicle) {
  //   this.firestore.doc(this.collectionName + '/' + id).update(vehicle);
  // }

  // deleteVehicle(id) {
  //   this.firestore.doc(this.collectionName + '/' + id).delete();
  // }


  
  getList(): Observable<Vehicle> {
    return this.httpClient
      .get<Vehicle>(this.apiUrl + '/api/Vehicle/GetAllVehicles')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getListModelAndYear(): Observable<Model> {
    return this.httpClient
      .get<Model>(this.apiUrl + '/api/Vehicle/GetModelANDYear')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }




  
  // Get single student data by ID
  getItem(id): Observable<Vehicle> {
    return this.httpClient
      .get<Vehicle>(this.apiUrl + '/VehicleByid' + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  // Update item by id
  updateItem(id, item): Observable<Vehicle> {
    return this.httpClient
      .put<Vehicle>(this.apiUrl + '/UpdateVehicle' + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  // Delete item by id
  delete(id) {
    return this.httpClient
      .delete<Vehicle>(this.apiUrl + '/api/Vehicle/DeleteVehicle' + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }



  deleteVehicle(id: string): Observable<{}> {
  
    return this.httpClient.delete(this.apiUrl + '/api/Vehicle/DeleteVehicle' + '/${' + id +'}' , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteVehicles(id): Observable<{}> {
  
    return this.httpClient.delete(this.apiUrl + '/api/Vehicle/DeleteVehicle?id=' +  id , this.httpOptions)
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
