import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class FleetService {

  collectionName = 'Fleet';
  FleetRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase,
    private firestore: AngularFirestore
  ) { }

  create_Fleet(Fleet) {
    return this.firestore.collection(this.collectionName).add(Fleet);
  }

  read_Fleet() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  get_Fleet(FleetId){
    return this.firestore.collection(this.collectionName).doc(FleetId).get()
  }

  update_Fleet(FleetID,Fleet) {
    this.firestore.doc(this.collectionName + '/' + FleetID).update(Fleet);
  }



  deleteFleet(id: string) {
    this.FleetRef = this.db.object('/Fleet/' + id);
    this.FleetRef.remove();
  }




  delete_Fleet(Fleet_ID) {
    this.firestore.doc(this.collectionName + '/' + Fleet_ID).delete();
  }
}