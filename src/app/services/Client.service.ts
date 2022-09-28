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

      getClient(id: string){
        return this.firestore.collection(this.collectionName).doc(id);
      }

      delete_Client(ClientID) {
        this.firestore.doc(this.collectionName + '/' + ClientID).delete();
      }


}