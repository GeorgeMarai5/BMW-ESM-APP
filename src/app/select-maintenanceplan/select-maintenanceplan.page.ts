import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MaintenancePlan } from '../models/Maintenance-Plan';
import { AuthService } from '../services/auth.service';
import { MaintenancePlanService } from '../services/MaintenancePlan.service';
import { PostService } from '../services/post.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-select-maintenanceplan',
  templateUrl: './select-maintenanceplan.page.html',
  styleUrls: ['./select-maintenanceplan.page.scss'],
})

export class SelectMaintenanceplanPage implements OnInit {

  maintenanceplanList = [];
  plans: MaintenancePlan;
  planForm : UntypedFormGroup;
  data: any;
  isSubmitted = false;
 
  constructor(public planService: MaintenancePlanService , private zone: NgZone,private toastCtrl: ToastController, private service: PostService, 
    public fb: UntypedFormBuilder,private router: Router, private route: ActivatedRoute, public authService: AuthService, 
    public alertController: AlertController,private firestore: AngularFirestore) { 
      this.route.params.subscribe(params => {
        this.data = params.id;
      });
      this.planForm = new UntypedFormGroup({
        PlanName: new UntypedFormControl('', Validators.required),
        Description: new UntypedFormControl('', Validators.required),
        Duration: new UntypedFormControl('', Validators.required),
        Price: new UntypedFormControl('', Validators.required)
      })
    }

  ngOnInit() {
  
  }

  submitForm(){

  }

  get errorControl() {
    return this.planForm.controls;
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Select Plan',
      message: 'Are you sure you would like to select this plan?',
      buttons: ['Select', 'Cancel']
    });

    await alert.present();
  }
}