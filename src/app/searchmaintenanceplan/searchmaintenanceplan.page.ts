import { Component, OnInit,ElementRef, Input, Output, NgZone } from '@angular/core';
import { FormBuilder,Validators,FormGroup, AnyForUntypedForms } from '@angular/forms';
import { AngularDelegate } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router,Route } from '@angular/router';
import { PostService } from '../services/post.service';
import { getApp } from 'firebase/app';
import {getFirestore, collection,onSnapshot, addDoc, doc,setDoc, QuerySnapshot} from 'firebase/firestore'
import { ActivatedRoute } from '@angular/router';
import { snapshotChanges } from '@angular/fire/compat/database';
import { MaintenancePlanService } from '../services/MaintenancePlan.service';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MaintenancePlan } from '../models/Maintenance-Plan';

@Component({
  selector: 'app-searchmaintenanceplan',
  templateUrl: './searchmaintenanceplan.page.html',
  styleUrls: ['./searchmaintenanceplan.page.scss'],
})

export class SearchMaintenancePlanPage implements OnInit {

maintenanceplanList = [];
plans: MaintenancePlan;
planform : FormGroup;
searchTerm: string;

constructor(public planService: MaintenancePlanService , private zone: NgZone,private toastCtrl: ToastController,private service: PostService, 
  public fb: FormBuilder,private router: Router, private route: ActivatedRoute, public authService: AuthService, private firestore: AngularFirestore) {
    this.plans = {} as MaintenancePlan; 
}

ngOnInit(){
    this.planform = this.fb.group({
      PlanName: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Duration: ['', [Validators.required]],
      Price: ['', [Validators.required]],
  });

  this.service.getPlans().subscribe(data => {
    this.maintenanceplanList = data.map(e => {

      return {
        PlanName: e.payload.doc.data()['Plan Name'],
        Description: e.payload.doc.data()['Description'],
        Duration: e.payload.doc.data()['Duration'],
        yPriceear: e.payload.doc.data()['Price']
      };
    })
    console.log(this.maintenanceplanList);
  }
  )}
}
