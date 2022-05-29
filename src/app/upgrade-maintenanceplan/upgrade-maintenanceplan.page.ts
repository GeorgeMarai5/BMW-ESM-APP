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
  
  plans: MaintenancePlan;
  maintenanceplan = {};
  upgradePlanForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, 
    public planService: MaintenancePlanService, public firestore: AngularFirestore, public router: Router) {
    this.route.params.subscribe(params => {
      this.data = params.id;
  });
  this.upgradePlanForm = new FormGroup({
    PlanName: new FormControl('', Validators.required),
    NewPlanName: new FormControl('', Validators.required)
  });

  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.upgradePlanForm.valid){
      return false;
    }
    else{
        const maintenanceplan = {
          NewPlanName: this.upgradePlanForm.get('NewPlanName').value
        }
        this.planService.upgradeMaintenancePlan(this.data, maintenanceplan)
        alert("Maintenance Plan was successfully upgraded.");
      }
      this.router.navigate(['/tabs/view/maintenanceplan', this.data]);
  }

  ngOnInit() {
    this.planService.getMaintenancePlan(this.data).valueChanges()
    .subscribe(res =>{
    console.log(res)
    this.upgradePlanForm.setValue({
      PlanName: res['Plan_Name'],
      NewPlanName: ''
    })
    });
  }

  get errorControl() {
    return this.upgradePlanForm.controls;
  }
}