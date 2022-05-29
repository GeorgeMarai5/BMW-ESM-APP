import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';


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
    return this.firestore.collection(this.collectionName).doc(FleetId).get();
  }

  getFleet(id: string){
    return this.firestore.collection(this.collectionName).doc(id);
  }

  update_Fleet(FleetID,Fleet) {
    this.firestore.doc(this.collectionName + '/' + FleetID).update(Fleet);
  }

  updateFleet(id, fleets) {
    this.firestore.doc(this.collectionName + '/' + id).update(fleets);
  }

  deleteFleet(id: string) {
    this.FleetRef = this.db.object('/Fleet/' + id);
    this.FleetRef.remove();
  }




  delete_Fleet(Fleet_ID) {
    this.firestore.doc(this.collectionName + '/' + Fleet_ID).delete();
  }
}