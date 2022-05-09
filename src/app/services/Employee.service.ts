import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { employee } from "../models/Employee";



@Injectable({

    providedIn: 'root'
})


export class EmployeeService{

    collectionName = 'Employee';


    constructor(
        private firestore: AngularFirestore
      ) { }

      read_Employee() {
        return this.firestore.collection(this.collectionName).snapshotChanges();
      }


/*

      update_student(Title, FirstName, LastName, PhoneNumber, Email, address) {
        this.firestore.doc(this.collectionName + '/' + recordID).update(record);
      }




      delete_student(record_id) {
        this.firestore.doc(this.collectionName + '/' + record_id).delete();
      }
    */
    
}