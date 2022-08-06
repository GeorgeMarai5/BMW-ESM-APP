import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AssignedPartService {

  collectionName = 'Vehicle';

  constructor(private firestore: AngularFirestore) { }

  getAssignedParts() {
    return this.firestore.collection('Vehicle').snapshotChanges();
  }

  createAssignedPart(part) {
    return this.firestore.collection(this.collectionName).add(part);
  }

  getAssignedPart(id: string){
    return this.firestore.collection(this.collectionName).doc(id);
  }

  updateAssignedPart(id, part) {
    this.firestore.doc(this.collectionName + '/' + id).update(part);
  }

  deleteAssignedPart(id) {
    this.firestore.doc(this.collectionName + '/' + id).delete();
  }
}
