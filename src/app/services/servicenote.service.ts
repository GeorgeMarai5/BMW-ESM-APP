import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { ServiceNote } from '../models/ServiceNote';

@Injectable({
  providedIn: 'root',
})
export class ServiceNoteService {
  // intiateService(value: any) {
  //   throw new Error('Method not implemented.');
  // }

  // ServiceRef: AngularFireObject<any>;
  // readService() {
  //   return this.firestore.collection(this.collectionName).snapshotChanges();
  // }
  // collectionName = 'Service_Note';

  constructor(private httpClient: HttpClient) {}

  // getServices(id: string) {
  //   return this.firestore.collection('Service').snapshotChanges();
  // }



  apiUrl = 'https://localhost:7292/api'
  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  // createServiceNote(createNote: ServiceNote){
  //   return this.httpClient.post(`${this.apiUrl}/PostService_Note`, createNote, this.httpOptions)
  // }
  createServiceNote(data: any) {
    return this.httpClient.post(this.apiUrl + "/ServiceNote/Create", data);
  }

  // getServiceNote(id: string) {
  //   return this.firestore.collection(this.collectionName).doc(id);
  // }
  getServiceNotes(): Observable<any[]> {
    return this.httpClient.get<any>(this.apiUrl + "/ServiceNote")
  }
  updateServiceNote(id: number | string, data: any) {
    this.httpClient.put(this.apiUrl + "/ServiceNote/${id}", data)
  }
  deleteServiceNote(id:number | string) {
    this.httpClient.delete(this.apiUrl + "/ServiceNote/${id}")
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
