

  import { Component, OnInit,ElementRef, Input, Output, NgZone } from '@angular/core';
  import { FormBuilder,Validators,FormGroup, AnyForUntypedForms } from '@angular/forms';
  import { AngularDelegate } from '@ionic/angular';
  import { Observable } from 'rxjs';
  import { ToastController } from '@ionic/angular';
  import { Router,Route } from '@angular/router';
  import { PostService } from '../services/post.service';
  import { getApp } from 'firebase/app';
  import {getFirestore, collection,onSnapshot,Firestore, addDoc, doc,setDoc} from 'firebase/firestore'
  import { Clients } from '../models/Clients';
  import { ActivatedRoute } from '@angular/router';
  import { snapshotChanges } from '@angular/fire/compat/database';
import * as firebase from 'firebase/compat';
 
  
  
  @Component({
    selector: 'app-update-client',
  templateUrl: './update-client.page.html',
  styleUrls: ['./update-client.page.scss'],
  })
  export class UpdateClientPage implements OnInit {
  
    
    private FirebaseApp = getApp();
    private db = getFirestore(this.FirebaseApp);
    
    private Clientid: String;
   private currentClient;
  
  
      public Clientpage : FormGroup;
      public eventList: Clients[] = [];
      ClientList: [];
  
    
    
    constructor(private zone: NgZone,private toastCtrl: ToastController,private service: PostService, private formBuilder: FormBuilder,private router: Router, private route: ActivatedRoute) { 
  this.Clientpage = this.formBuilder.group({Title: ['', Validators.compose([Validators.required])], 
  FirstName: ['', Validators.compose([Validators.required])],
  LastName: ['', Validators.compose([Validators.required])],
  PhoneNumber: ['', Validators.compose([Validators.required])],
  Email: ['', Validators.compose([Validators.required])],
  Address: ['', Validators.compose([Validators.required])],
  
   });
  
    }
  
  
  viewClient(): void{
  
  //this is the update user method
  
  
  
    //const FirebaseApp = getApp();
    //const db = getFirestore(FirebaseApp);
    const ClientCollection = collection(this.db,'Client')
  
    addDoc(ClientCollection, this.Clientpage.value);
  
  
  
  
  
  
  
  console.log(this.Clientpage.value)
  
  }
  
    
  UpdateClient(Client){

   

//return firebase.collection('Client').doc(Client.id).update(Client);


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

  NavToUpdatePassword(){
  
    this.router.navigate(['password-reset'])
  }
  
  
  
  
  }
  
  
  
  
