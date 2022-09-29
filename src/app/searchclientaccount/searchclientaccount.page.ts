import { Component, OnInit,ElementRef, Input, Output, NgZone } from '@angular/core';
import { UntypedFormBuilder,Validators,UntypedFormGroup, AnyForUntypedForms } from '@angular/forms';
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

  searchTerm: string;
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
  clientform : UntypedFormGroup;



constructor(public clientService: ClientService , private zone: NgZone,private toastCtrl: ToastController,private service: PostService, 
  public fb: UntypedFormBuilder,private router: Router, private route: ActivatedRoute, public authService: AuthService, private firestore: AngularFirestore) { 

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
    });

    this.clientService.GetClientList().subscribe(data =>{
      this.clientList.subscribe(e => {
        return{
          id: e.payload.doc.id,
          Title: data.Title,
          FirstName: data.FirstName,
          LastName: data.LastName,
          PhoneNumber: data.PhoneNumber,
          Email: data.Email,
          Address: data.address,
          };
        });

      console.log(this.clientList);

    });
  }

  async removeClient(id){

  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Client has been removed successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}
