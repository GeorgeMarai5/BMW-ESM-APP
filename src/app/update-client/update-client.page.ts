import { Component, OnInit,ElementRef, Input, Output, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, FormControl } from "@angular/forms";
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
  selector: 'app-update-client',
  templateUrl: './update-client.page.html',
  styleUrls: ['./update-client.page.scss'],
})

export class UpdateClientPage implements OnInit {
  
  updateClientForm: FormGroup;
  isSubmitted = false;

  constructor(public fb: FormBuilder, public authService: AuthService) {
    this.updateClientForm = new FormGroup({
      title: new FormControl('', Validators.required),
      fName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      lName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      phoneNum: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl()
    });
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.updateClientForm.valid){
      return false;
    }
    else{
      console.log(this.updateClientForm.value);
    }
    return false;
  }

  ngOnInit() {
    this.updateClientForm.setValue({title: '', fName: '', lName: '', phoneNum: '', email: '', address: ''});
  }

  get errorControl() {
    return this.updateClientForm.controls;
  }
}




