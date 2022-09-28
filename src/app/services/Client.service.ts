import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Clients } from '../models/Clients';
import { retry, catchError } from 'rxjs/operators';
import { Model } from 'app/models/Model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})

export class ClientService {

 apiUrl = 'https://localhost:7163';

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
  headers: new HttpHeaders({
   'Content-Type': 'application/json'
   })
    }
   
    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      return throwError('Something bad happened; please try again later.');
    }
  
  createClient(createClient: Clients){
    return this.httpClient.post(this.apiUrl + '/api/Clients/CreateClient' , Clients, this.httpOptions)
  }

  getTeamList(): Observable<Clients> {
    return this.httpClient
      .get<Clients>(this.apiUrl + '/api/Clients/GetClientList')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getTeam(id): Observable<Clients> {
    return this.httpClient
      .get<Clients>(this.apiUrl + '/api/Clients/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  updateTeam(item): Observable<Clients> {
    return this.httpClient
      .put<Clients>(this.apiUrl + '/api/Clients/' + '?' + item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
  deleteTeam(id): Observable<{}> {
  
    return this.httpClient.delete(this.apiUrl + '/api/Clients/' +  id , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}




// import { Injectable } from "@angular/core";
// import { AngularFireDatabase } from "@angular/fire/compat/database";
// import { AngularFirestore } from "@angular/fire/compat/firestore";
// import { Clients } from "../models/Clients";



// @Injectable({

//     providedIn: 'root'
// })


// export class ClientService{

//     collectionName = 'Client';


//     constructor(
//         private firestore: AngularFirestore
//       ) { }

//       read_Clients() {
//         return this.firestore.collection(this.collectionName).snapshotChanges();
//       }

//       getClient(id: string){
//         return this.firestore.collection(this.collectionName).doc(id);
//       }

//       delete_Client(ClientID) {
//         this.firestore.doc(this.collectionName + '/' + ClientID).delete();
//       }


// }