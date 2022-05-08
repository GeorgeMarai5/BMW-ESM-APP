import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";



@Injectable({

    providedIn: 'root'
})


export class ClientService{

collectionName = 'Client'

constructor(private firestore: AngularFirestore){





}

get_Clients(){
return this.firestore.collection(this.collectionName).snapshotChanges();




}

delete_Client(ClientID){

return this.firestore.doc(this.collectionName + '/' + ClientID).delete();


}


}

