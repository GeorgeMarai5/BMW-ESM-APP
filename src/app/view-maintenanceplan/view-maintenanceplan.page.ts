import { Component, OnInit,ElementRef, Input, Output, NgZone } from '@angular/core';
import { FormBuilder,Validators,FormGroup, AnyForUntypedForms } from '@angular/forms';
import { AngularDelegate } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router,Route } from '@angular/router';
import { PostService } from '../services/post.service';
import { getApp } from 'firebase/app';
import {getFirestore, collection,onSnapshot, addDoc, doc,setDoc, QuerySnapshot} from 'firebase/firestore'
import { MaintenancePlan } from '../models/Maintenance-Plan';
import { ActivatedRoute } from '@angular/router';
import { snapshotChanges } from '@angular/fire/compat/database';
import { MaintenancePlanService } from '../services/MaintenancePlan.service';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-view-maintenanceplan',
  templateUrl: './view-maintenanceplan.page.html',
  styleUrls: ['./view-maintenanceplan.page.scss'],
})
export class ViewMaintenancePlanPage implements OnInit {
  
    planList = [];
    plans: MaintenancePlan;
    planform : FormGroup;
 
    constructor(public planService: MaintenancePlanService , private zone: NgZone,private toastCtrl: ToastController,private service: PostService, 
    public fb: FormBuilder,private router: Router, private route: ActivatedRoute, public authService: AuthService, private firestore: AngularFirestore) { 

    this.plans = {} as MaintenancePlan;

    }
    ngOnInit() {

      this.planform = this.fb.group({
        Title: [''],
        FirstName: [''],
        LastName: [''],
        PhoneNumber: ['']
      })


    this.planService.read_Plans().subscribe(data =>{

    this.planList = data.map(e =>{

    return{
      Title: e.payload.doc.data()['Title'],
      FirstName: e.payload.doc.data()['FirstName'],
      LastName: e.payload.doc.data()['lastName'],
      PhoneNumber: e.payload.doc.data()['phone'],
    };

    })

    }

    )}

    }