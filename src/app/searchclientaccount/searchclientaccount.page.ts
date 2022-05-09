import { Component, OnInit,ElementRef, Input, Output, NgZone } from '@angular/core';
import { FormBuilder,Validators,FormGroup, AnyForUntypedForms } from '@angular/forms';
import { AngularDelegate } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router,Route } from '@angular/router';
import { PostService } from '../services/post.service';
import { getApp } from 'firebase/app';
import {getFirestore, collection,onSnapshot, addDoc, doc,setDoc, QuerySnapshot} from 'firebase/firestore'
import { Clients } from '../models/Clients';
import { ActivatedRoute } from '@angular/router';
import { snapshotChanges } from '@angular/fire/compat/database';
import { ClientService } from '../services/Client.service';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-searchclientaccount',
  templateUrl: './searchclientaccount.page.html',
  styleUrls: ['./searchclientaccount.page.scss'],
})


export class SearchclientaccountPage implements OnInit {

//   searchTerm: string;
//   clients:any = [];
//   public list: Array<Object> = [];
//   private searchedItem: any;
//   public searchField: FormControl;
//  // public clientList$: Observable<any[]>;
//   id: string;
//   name: string;
//   phone: number;
//   email: string;
  
 // Filter: string;
public clientList: any;
//clientList= [];
    
clients: Clients;
clientform : FormGroup;



constructor(public clientService: ClientService , private zone: NgZone,private toastCtrl: ToastController,private service: PostService, 
  public fb: FormBuilder,private router: Router, private route: ActivatedRoute, public authService: AuthService, private firestore: AngularFirestore) { 

this.clients = {} as Clients;

  }




  ngOnInit() {

    this.clientform = this.fb.group({
      Title: [''],
      FirstName: [''],
      LastName: [''],
      PhoneNumber: [''],
      Email: [''],
      Address: [''],
    })


this.clientService.read_Clients().subscribe(data =>{


this.clientList = data.map(e =>{

return{

id: e.payload.doc.id,
Title: e.payload.doc.data()['Title'],
FirstName: e.payload.doc.data()['FirstName'],
LastName: e.payload.doc.data()['lastName'],
PhoneNumber: e.payload.doc.data()['phone'],
Email: e.payload.doc.data()['email'],
Address: e.payload.doc.data()['Address'],
};

})
console.log(this.clientList);


});}}
