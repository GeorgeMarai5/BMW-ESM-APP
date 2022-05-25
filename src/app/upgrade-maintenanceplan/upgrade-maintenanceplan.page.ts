import { Component, OnInit,ElementRef, Input, Output, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, FormControl } from "@angular/forms";
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
  selector: 'app-upgrade-maintenanceplan',
  templateUrl: './upgrade-maintenanceplan.page.html',
  styleUrls: ['./upgrade-maintenanceplan.page.scss'],
})

export class UpgradeMaintenancePlanPage implements OnInit {
  
  upgradePlanForm: FormGroup;
  isSubmitted = false;

  constructor(public fb: FormBuilder, public authService: AuthService) {
    this.upgradePlanForm = new FormGroup({
      PlanName: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      Duration: new FormControl('', Validators.required),
      Price: new FormControl('', Validators.required),
    });
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.upgradePlanForm.valid){
      return false;
    }
    else{
      console.log(this.upgradePlanForm.value);
    }
    return false;
  }

  ngOnInit() {
    this.upgradePlanForm.setValue({PlanName: '', Description: '', Duration: '', Price: ''});
  }

  get errorControl() {
    return this.upgradePlanForm.controls;
  }
}