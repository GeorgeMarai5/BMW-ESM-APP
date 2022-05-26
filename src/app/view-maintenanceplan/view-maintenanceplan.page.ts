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
    firebaseService: any;
 
    constructor(public planService: MaintenancePlanService , private zone: NgZone,private toastCtrl: ToastController,private service: PostService, 
    public fb: FormBuilder,private router: Router, private route: ActivatedRoute, public authService: AuthService, private firestore: AngularFirestore) { 

    this.plans = {} as MaintenancePlan;

    }
    ngOnInit() {

      this.planform = this.fb.group({
        PlanName: [''],
        Description: [''],
        Duration: [''],
        Price: ['']
      })


    this.planService.read_Plans().subscribe(data =>{

    this.planList = data.map(e =>{

    return{
      PlanName: e.payload.doc.data()['Plan Name'],
      Description: e.payload.doc.data()['Description'],
      Duration: e.payload.doc.data()['Duration'],
      Price: e.payload.doc.data()['Price'],
    };
  })
}
)}

    CreatePlan() {
      console.log(this.planform.value);
      this.firebaseService.create_plan(this.planform.value).then(resp => {
        this.planform.reset();
      })
        .catch(error => {
          console.log(error);
        });
    }
  
    EditPlan(record) {
      record.isEdit = true;
      record.EditPlanName = record.PlanName;
      record.EditDescription = record.Description;
      record.EditDuration = record.Duration;
      record.EditPrice = record.Price;
    }
  
    UpdateRecord(recordRow) {
      let record = {};
      record['Plan Name'] = recordRow.EditName;
      record['Description'] = recordRow.EditAge;
      record['Duration'] = recordRow.EditAddress;
      record['Price'] = recordRow.EditPrice;
      this.firebaseService.update_student(recordRow.id, record);
      recordRow.isEdit = false;
    }
    
    }

  

