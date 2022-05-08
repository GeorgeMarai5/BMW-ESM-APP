import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";

export class User{
  userID: number;
  userType: string;
  userEmail: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private ngFirestore: AngularFirestore, private router: Router) { }

  create(user: User) {
    return this.ngFirestore.collection('User').add(user);
  }

  getUsers() {
    return this.ngFirestore.collection('User').snapshotChanges();
  }

  getUser(userID) {
    return this.ngFirestore.collection('User').doc(userID).valueChanges();
  }

  
}
