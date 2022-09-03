import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DealershipService {

  collectionName = 'Dealership';

  constructor(private firestore: AngularFirestore) { }

  getDealerships() {
    return this.firestore.collection('Dealership').snapshotChanges();
  }

  createDealership(dealership) {
    return this.firestore.collection(this.collectionName).add(dealership);
  }

  getDealership(id: string){
    return this.firestore.collection(this.collectionName).doc(id);
  }

  updateDealership(id, dealership) {
    this.firestore.doc(this.collectionName + '/' + id).update(dealership);
  }

  deleteDealership(id) {
    this.firestore.doc(this.collectionName + '/' + id).delete();
  }
}
