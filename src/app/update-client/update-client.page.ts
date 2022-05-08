import { Component, OnInit } from '@angular/core';
import { Clients } from '../models/Clients';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.page.html',
  styleUrls: ['./update-client.page.scss'],
})
export class UpdateClientPage implements OnInit {


  clients: any;

  constructor(private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController) { }
  

ionViewWillEnter(){
this.getposts();
}


async getposts(){

let loader = this.loadingCtrl.create({
message: "please wait..."
});

(await loader).present();

try{

this.firestore.collection('Client').
snapshotChanges().subscribe(data => {

this.clients = data.map(e => {
return{

id: e.payload.doc.id,
ClientID: e.payload.doc.data()["clientid"],
Title: e.payload.doc.data()["Title"],
FirstName: e.payload.doc.data()["FirstName"],
LastName: e.payload.doc.data()["LastName"],
PhoneNumber: e.payload.doc.data()["Phone"],
Email: e.payload.doc.data()["email"],
Address: e.payload.doc.data()["Address"],




};

});

});



//dismiss loader
(await loader).dismiss();
} catch(e){
  this.showToast(e);


}





}

showToast(message){

}


  
  ngOnInit() {
  }


  /*let field = document.getElementById("field");

  
  if (sessionStorage.getItem("autosave")) {
    
    field.value = sessionStorage.getItem("autosave");
  }
  
  
  field.addEventListener("change", function() {
   
    sessionStorage.setItem("autosave", field.value);
  });

*/




}
