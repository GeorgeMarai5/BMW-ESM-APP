import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Clients } from "../models/Clients";



@Injectable({

    providedIn: 'root'
})


export class ClientService{

    collectionName = 'Client';


    constructor(
        private firestore: AngularFirestore
      ) { }

      read_Clients() {
        return this.firestore.collection(this.collectionName).snapshotChanges();
      }


/*

      update_student(Title, FirstName, LastName, PhoneNumber, Email, address) {
        this.firestore.doc(this.collectionName + '/' + recordID).update(record);
      }




      delete_client(record_id) {
        this.firestore.doc(this.collectionName + '/' + record_id).delete();
      }
    */
    
}