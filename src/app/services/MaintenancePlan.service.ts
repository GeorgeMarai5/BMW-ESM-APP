import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { MaintenancePlan } from "../models/Maintenance-Plan";



@Injectable({

    providedIn: 'root'
})


export class MaintenancePlanService{

    collectionName = 'Plans';


    constructor(
        private firestore: AngularFirestore
      ) { }

      read_Plans() {
        return this.firestore.collection(this.collectionName).snapshotChanges();
      }


/*

      upgrade_Plan(PlanName, Description, Duration, Price) {
        this.firestore.doc(this.collectionName + '/' + recordID).update(record);
      }
    
      */
}