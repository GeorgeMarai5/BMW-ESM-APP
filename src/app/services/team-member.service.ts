import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  collectionName = 'Employee';

  constructor(private firestore: AngularFirestore) { }

  getTeamMembers() {
    return this.firestore.collection('Employee').snapshotChanges();
  }

  createTeamMember(teamMember) {
    return this.firestore.collection(this.collectionName).add(teamMember);
  }

  getTeamMember(id: string){
    return this.firestore.collection(this.collectionName).doc(id);
  }

  updateTeamMember(id, teamMember) {
    this.firestore.doc(this.collectionName + '/' + id).update(teamMember);
  }

  deleteTeamMember(id) {
    this.firestore.doc(this.collectionName + '/' + id).delete();
  }

}
