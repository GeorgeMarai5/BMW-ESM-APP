import { Injectable } from '@angular/core';
import { Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry,catchError, tap, map } from 'rxjs/operators';
import { VehicleService } from '../models/VehicleService';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {


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


  createService(Service: VehicleService){
    return this.httpClient.post(this.apiUrl + '/api/Services/Create' , Service, this.httpOptions)


  }


  getServiceList(): Observable<VehicleService> {
    return this.httpClient
      .get<VehicleService>(this.apiUrl + '/api/Services/GetAll')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  

  getService(id): Observable<VehicleService> {
    return this.httpClient
      .get<VehicleService>(this.apiUrl + '/api/Services/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  

  updateservice(item): Observable<VehicleService> {
    return this.httpClient
      .put<VehicleService>(this.apiUrl + '/api/Services/' + item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateService(id, item): Observable<VehicleService> {
    return this.httpClient
      .put<VehicleService>(this.apiUrl + '/api/Services/' + id, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  
  delete(id) {
    return this.httpClient
      .delete<VehicleService>(this.apiUrl + '/api/Services' + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }



  deleteService(id): Observable<{}> {
  
    return this.httpClient.delete(this.apiUrl + '/api/Services/' +  id , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }



// import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import {
//   AngularFireDatabase,
//   AngularFireList,
//   AngularFireObject
// } from '@angular/fire/compat/database';
// @Injectable({
//   providedIn: 'root'
// })
// export class ServiceService {
//   intiateService(value: any) {
//     throw new Error('Method not implemented.');
//   }

//   ServiceRef: AngularFireObject<any>;
//   readService() {
//     return this.firestore.collection(this.collectionName).snapshotChanges();
//   }
//   collectionName = 'Service';

//   constructor(private firestore: AngularFirestore) { }

//   // getServices(id: string) {
//   //   return this.firestore.collection('Service').snapshotChanges();
//   // }

//   createService(Service) {
//     return this.firestore.collection(this.collectionName).add(Service);
//   }

//   getService(id: string){
//     return this.firestore.collection(this.collectionName).doc(id);
//   }
//   getServices() {
//     return this.firestore.collection('Service').snapshotChanges();
//   }
//   updateService(id, service) {
//     this.firestore.doc(this.collectionName + '/' + id).update(service);
//   }
//   deleteService(id) {
//     this.firestore.doc(this.collectionName + '/' + id).delete();
//   }


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