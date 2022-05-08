import { Component, OnInit,ElementRef, Input, Output, NgZone } from '@angular/core';
import { FormBuilder,Validators,FormGroup, AnyForUntypedForms } from '@angular/forms';
import { AngularDelegate } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router,Route } from '@angular/router';
import { PostService } from '../services/post.service';
import { getApp } from 'firebase/app';
import {getFirestore, collection,onSnapshot, addDoc, doc,setDoc} from 'firebase/firestore'
import { Clients } from '../models/Clients';
import { ActivatedRoute } from '@angular/router';
import { snapshotChanges } from '@angular/fire/compat/database';
import { ClientService } from '../services/Client.service';


@Component({
  selector: 'app-view-client-account',
  templateUrl: './view-client-account.page.html',
  styleUrls: ['./view-client-account.page.scss'],
})
export class ViewClientAccountPage implements OnInit {

  
  private FirebaseApp = getApp();
  private db = getFirestore(this.FirebaseApp);
  private Clientid: String;
 private currentClient;


    public Clientpage : FormGroup;
    public eventList: Clients[] = [];
    ClientList: any;   //[]

  
  
  constructor(public clientService: ClientService , private zone: NgZone,private toastCtrl: ToastController,private service: PostService, 
    private formBuilder: FormBuilder,private router: Router, private route: ActivatedRoute) { 

this.clientService.get_Clients().subscribe((res)=>{

this.ClientList = res.map(e =>{

return{

ClientID: e.payload.doc.id,
Title: e.payload.doc.data()['Title'],
FirstName: e.payload.doc.data()['FirstName'],
LastName: e.payload.doc.data()['LastName'],
PhoneNumber: e.payload.doc.data()['PhoneNumber'],
Email: e.payload.doc.data()['Email'],
Address: e.payload.doc.data()['Address'],




}




})

console.log(this.ClientList)


}, (err:any) => {
console.log(err);
})






/*this.Clientpage = this.formBuilder.group({Title: ['', Validators.compose([Validators.required])], 
FirstName: ['', Validators.compose([Validators.required])],
LastName: ['', Validators.compose([Validators.required])],
PhoneNumber: ['', Validators.compose([Validators.required])],
Email: ['', Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
Address: ['', Validators.compose([Validators.required])],


});


*/

  }


viewClient(): void{

//this is the update user method



  //const FirebaseApp = getApp();
  //const db = getFirestore(FirebaseApp);
  const ClientCollection = collection(this.db,'Client')

  addDoc(ClientCollection, this.Clientpage.value);







console.log(this.Clientpage.value)

}

  



  

  logForm(){
    console.log(this.Clientpage.value)
    
  }



  ngOnInit() {

this.Clientid = this.route.snapshot.params.id;
console.log(this.Clientid);

if(this.Clientid !== 'new'){
this.currentClient = doc(this.db,'Client/${id}');    //to load data onto the form
onSnapshot<Clients>(this.currentClient, snapshot => {
this.Clientpage.setValue({

Title: snapshot.data().Title,
FirstName: snapshot.data().FirstName,
LastName: snapshot.data().LastName,
PhoneNumber: snapshot.data().PhoneNumber,
Email: snapshot.data().Email,
Address: snapshot.data().Address




});

});



}













    /*
     const ClientCollection = collection(db,'Client')
onSnapshot<Clients>(ClientCollection, snapshot => {
       this.zone.run(() =>{
       this.eventList = snapshot.docs.map(d => d.data());
       console.log(this.eventList)


      });



     });

    //this.clientList = JSON.parse(sessionStorage.getItem('Client'));

*/

  }

  async removeAlert(){

    let toast = await this.toastCtrl.create({
      message: 'The client was removed',
      duration: 3000,
      position: 'top',
    });

  }
  deleteClient(){
    this.removeAlert();
    sessionStorage.removeItem('Client')
    
  }


  update(){   

    //this.createform.patchValue({

   //title: this.ClientDate.title

   //first_name: this.ClientData.first_name,

   //last_name: this.ClientData.last_name,

   //username: this.ClientData.username,

   //email: this.ClientData.email,

 //})





}





back(){

  this.router.navigate(['SearchclientaccountPage'])
}




}





function deleteClient(item: any, any: any) {
  throw new Error('Function not implemented.');
}


