import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  intiateService(value: any) {
    throw new Error('Method not implemented.');
  }

  ServiceRef: AngularFireObject<any>;
  readService() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }
  collectionName = 'Vehicle_Service_History';

  constructor(private firestore: AngularFirestore) { }

  // getServices(id: string) {
  //   return this.firestore.collection('Service').snapshotChanges();
  // }

  createHistory(Service) {
    return this.firestore.collection(this.collectionName).add(Service);
  }

  getHistory(id: string){
    return this.firestore.collection(this.collectionName).doc(id);
  }
  gethistory() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }
  updatehistory(id, service) {
    this.firestore.doc(this.collectionName + '/' + id).update(service);
  }
  deletehistory(id) {
    this.firestore.doc(this.collectionName + '/' + id).delete();
  }

}