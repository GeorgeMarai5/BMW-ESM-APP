import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl } from "@angular/forms";
import { Router,Route } from '@angular/router';
import { MaintenancePlan } from '../models/Maintenance-Plan';
import { ActivatedRoute } from '@angular/router';
import { MaintenancePlanService } from '../services/MaintenancePlan.service';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-upgrade-maintenanceplan',
  templateUrl: './upgrade-maintenanceplan.page.html',
  styleUrls: ['./upgrade-maintenanceplan.page.scss'],
})

export class UpgradeMaintenancePlanPage implements OnInit {
  
  plans: MaintenancePlan;
  maintenanceplans = [];
  upgradePlanForm: UntypedFormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: UntypedFormBuilder, public authService: AuthService, public planService: MaintenancePlanService, 
    public firestore: AngularFirestore, public router: Router, public toastCtrl: ToastController) {
    this.route.params.subscribe(params => {
      this.data = params.id;
    });

    this.upgradePlanForm = new UntypedFormGroup({
      PlanName: new UntypedFormControl('', Validators.required),
      NewPlanName: new UntypedFormControl('', Validators.required)
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

      this.planService.updateMaintenancePlan(this.data, maintenanceplan)
      this.presentToast();
    }

    this.router.navigate(['/tabs/view/maintenanceplan', this.data]);

  }

  ngOnInit() {
    // this.planService.getMaintenancePlan(this.data).valueChanges().subscribe(res =>{
    //   console.log(res)
    //   this.upgradePlanForm.setValue({
    //     PlanName: res['Plan_Name'],
    //     NewPlanName: ''
    //   })
    // });
  }

  back(){
    this.router.navigate(['tabs/view/maintenanceplan', this.data]);
  }

  get errorControl() {
    return this.upgradePlanForm.controls;
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Maintenance plan has been upgraded successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}