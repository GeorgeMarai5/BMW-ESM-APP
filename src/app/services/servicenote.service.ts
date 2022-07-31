import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ServiceNote } from '../models/ServiceNote';

@Injectable({
  providedIn: 'root',
})
export class ServiceNoteService {
  intiateService(value: any) {
    throw new Error('Method not implemented.');
  }

  ServiceRef: AngularFireObject<any>;
  readService() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }
  collectionName = 'Service_Note';

  constructor(private firestore: AngularFirestore) {}

  // getServices(id: string) {
  //   return this.firestore.collection('Service').snapshotChanges();
  // }

  createServiceNote(ServiceNote) {
    return this.firestore.collection(this.collectionName).add(ServiceNote);
  }

  getServiceNote(id: string) {
    return this.firestore.collection(this.collectionName).doc(id);
  }
  getServiceNotes() {
    return this.firestore.collection('Service_Note').snapshotChanges();
  }
  updateServiceNote(id, service) {
    this.firestore.doc(this.collectionName + '/' + id).update(service);
  }
  deleteServiceNote(id) {
    this.firestore.doc(this.collectionName + '/' + id).delete();
  }
}
// export class ServiceNoteService {
//   apiUrl = 'https://localhost:7005/api/';

//   httpOptions = {
//     headers: new HttpHeaders({
//       ContentType: 'application/json',
//     }),
//   };

//   constructor(private httpClient: HttpClient) {}

//   GetServiceNote(GetServiceNote: ServiceNote) {
//     return this.httpClient.post(
//       `${this.apiUrl}ServiceNoteController/GetServiceNote`,
//       GetServiceNote,
//       this.httpOptions
//     );
//   }

//   DeleteServiceNote(DeleteServiceNote: ServiceNote) {
//     return this.httpClient.delete<ServiceNote>(
//       `${this.apiUrl}ServiceNoteController/DeleteServiceNote`
//     );
//   }
// }
