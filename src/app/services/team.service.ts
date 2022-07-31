import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  collectionName = 'Team';

  constructor(private firestore: AngularFirestore) { }

  getTeams() {
    return this.firestore.collection('Team').snapshotChanges();
  }

  createTeam(team) {
    return this.firestore.collection(this.collectionName).add(team);
  }

  getTeam(id: string){
    return this.firestore.collection(this.collectionName).doc(id);
  }

  updateTeam(id, team) {
    this.firestore.doc(this.collectionName + '/' + id).update(team);
  }

  deleteTeam(id) {
    this.firestore.doc(this.collectionName + '/' + id).delete();
  }

}