import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PartInfoService {

  collectionName = 'Part';

  constructor(private firestore: AngularFirestore) { }

  getParts() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  getPart(id: string){
    return this.firestore.collection(this.collectionName).doc(id);
  }
}
