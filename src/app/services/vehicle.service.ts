import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private firestore: AngularFirestore) { }

  getVehicles() {
    return this.firestore.collection('Vehicle').snapshotChanges();
  }
}
