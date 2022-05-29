import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { MaintenancePlan } from "../models/Maintenance-Plan";



@Injectable({

    providedIn: 'root'
})


export class MaintenancePlanService{

  collectionName = 'Maintenance';

  constructor(private firestore: AngularFirestore) { }

  getPlans() {
    return this.firestore.collection('Maintenance').snapshotChanges();
  }

  getMaintenancePlan(id: string){
    return this.firestore.collection(this.collectionName).doc(id);
  }

  updateMaintenancePlan(id, maintenance) {
    this.firestore.doc(this.collectionName + '/' + id).update(maintenance);
  }

}