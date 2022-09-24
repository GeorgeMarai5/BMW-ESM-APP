import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { MaintenancePlan } from '../models/Maintenance-Plan';
import { retry, catchError } from 'rxjs/operators';
import { Model } from 'app/models/Model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})

export class MaintenancePlanService {

 apiUrl = 'https://localhost:7163/api/MaintenancePlans';

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
  headers: new HttpHeaders({
   'Content-Type': 'application/json'
   })
    }
   
createMaintenancePlan(item): Observable<MaintenancePlan> {
    return this.httpClient
      .post<MaintenancePlan>(this.apiUrl , JSON.stringify(item), this.httpOptions)  
  }

getMaintenancePlan(id): Observable<MaintenancePlan> {
  return this.httpClient
    .get<MaintenancePlan>(this.apiUrl + '/' + id)
}

getMaintenancePlanList(): Observable<MaintenancePlan> {
  return this.httpClient
    .get<MaintenancePlan>(this.apiUrl)
}

updateMaintenancePlan(id, item): Observable<MaintenancePlan> {
  return this.httpClient
    .put<MaintenancePlan>(this.apiUrl + '/' + id, JSON.stringify(item), this.httpOptions)
}

deleteMaintenancePlan(id) {
      return this.httpClient
   .delete<MaintenancePlan>(this.apiUrl + '/' + id, this.httpOptions)
}

}

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