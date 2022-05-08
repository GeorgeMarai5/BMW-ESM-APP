import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";

export class ClientService{
  ClientId: String
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Email: string;
  Address: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private ngFirestore: AngularFirestore, private router: Router) { }

  

  getClients() {
    return this.ngFirestore.collection('User').snapshotChanges();
  }


  getClient(userID) {
    return this.ngFirestore.collection('User').doc(userID).valueChanges();
  }

  
}

