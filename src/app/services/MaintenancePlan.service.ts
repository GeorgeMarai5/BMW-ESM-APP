import { Injectable } from '@angular/core';
import { Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry,catchError, tap, map } from 'rxjs/operators';
import { MaintenancePlan } from '../models/Maintenance-Plan';

@Injectable({
  providedIn: 'root'
})
export class MaintenancePlanService {

  //collectionName = 'Fleet';
  //FleetRef: AngularFireObject<any>;
  apiUrl = 'https://localhost:7163'
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


  createMaintenancePlan(MaintenancePlan: MaintenancePlan){
    return this.httpClient.post(this.apiUrl + '/api/MaintenancePlans/Create' , MaintenancePlan, this.httpOptions)


  }


  getMaintenancePlanList(): Observable<MaintenancePlan> {
    return this.httpClient
      .get<MaintenancePlan>(this.apiUrl + '/api/MaintenancePlans/GetAll')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  
  // Get single student data by ID
  getMaintenancePlan(id): Observable<MaintenancePlan> {
    return this.httpClient
      .get<MaintenancePlan>(this.apiUrl + '/api/MaintenancePlans/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateMaintenancePlan(id, item): Observable<MaintenancePlan> {
    return this.httpClient
      .put<MaintenancePlan>(this.apiUrl + '/api/MaintenancePlans/PutMaintenancePlan' + id, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
 
  

  deleteMaintenancePlan(id): Observable<{}> {
    return this.httpClient.delete(this.apiUrl + '/api/MaintenancePlans/' +  id , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}




// import { Observable, throwError } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
// import { MaintenancePlan } from '../models/Maintenance-Plan';
// import { retry, catchError } from 'rxjs/operators';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// @Injectable({
//   providedIn: 'root',
// })

// export class MaintenancePlanService {

//  apiUrl = 'https://localhost:7163/api/MaintenancePlans';

//   constructor(private httpClient: HttpClient) {}

//   httpOptions = {
//   headers: new HttpHeaders({
//    'Content-Type': 'application/json'
//    })
//     }
   
// createMaintenancePlan(item): Observable<MaintenancePlan> {
//     return this.httpClient
//       .post<MaintenancePlan>(this.apiUrl , JSON.stringify(item), this.httpOptions)  
//   }

// getMaintenancePlan(id): Observable<MaintenancePlan> {
//   return this.httpClient
//     .get<MaintenancePlan>(this.apiUrl + '/' + id)
// }

// getMaintenancePlanList(): Observable<MaintenancePlan> {
//   return this.httpClient
//     .get<MaintenancePlan>(this.apiUrl)
// }

// updateMaintenancePlan(id, item): Observable<MaintenancePlan> {
//   return this.httpClient
//     .put<MaintenancePlan>(this.apiUrl + '/' + id, JSON.stringify(item), this.httpOptions)
// }

// deleteMaintenancePlan(id) {
//       return this.httpClient
//    .delete<MaintenancePlan>(this.apiUrl + '/' + id, this.httpOptions)
// }

// }

// import { Injectable } from "@angular/core";
// import { AngularFireDatabase } from "@angular/fire/compat/database";
// import { AngularFirestore } from "@angular/fire/compat/firestore";
// import { MaintenancePlan } from "../models/Maintenance-Plan";



// @Injectable({

//     providedIn: 'root'
// })


// export class MaintenancePlanService{

//   collectionName = 'Maintenance';

//   constructor(private firestore: AngularFirestore) { }

//   getPlans() {
//     return this.firestore.collection('Maintenance').snapshotChanges();
//   }

//   getMaintenancePlan(id: string){
//     return this.firestore.collection(this.collectionName).doc(id);
//   }

//   upgradeMaintenancePlan(id, maintenance) {
//     this.firestore.doc(this.collectionName + '/' + id).update(maintenance);
//   }

// }