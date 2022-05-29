import { Component, OnInit,ElementRef, Input, Output, NgZone } from '@angular/core';
import { FormBuilder,Validators,FormGroup,FormControl  } from '@angular/forms';
import { AngularDelegate } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router,Route } from '@angular/router';
import { PostService } from '../services/post.service';
import { getApp } from 'firebase/app';
import { getFirestore, collection,onSnapshot, addDoc, doc,setDoc, QuerySnapshot } from 'firebase/firestore'
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
  
    maintenanceplan = {};
    plans: MaintenancePlan;
    planform : FormGroup;
    data: any;
 
    constructor(public planService: MaintenancePlanService , private zone: NgZone,private toastCtrl: ToastController,private service: PostService, 
    public fb: FormBuilder,private router: Router, private route: ActivatedRoute, public authService: AuthService, private firestore: AngularFirestore) { 
      this.route.params.subscribe(params => {
        this.data = params.id;
      });
      this.planform = new FormGroup({
        PlanName: new FormControl('', Validators.required),
        Description: new FormControl('', Validators.required),
        Duration: new FormControl('', Validators.required),
        Price: new FormControl('', Validators.required)
      })
    }

    ngOnInit() {

      this.planService.getMaintenancePlan(this.data).valueChanges()
        .subscribe(res =>{
        console.log(res)
        this.planform.setValue({
          PlanName: res['Plan_Name'], 
          Description: res['Description'],
          Duration: res['Duration'], 
          Price: res['Price']
        })
      });
    }

  navToUpdate() {
    this.router.navigate(['/tabs/upgrade/maintenanceplan', this.data]);
  }
}