import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
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
  upgradePlanForm: FormGroup;
  isSubmitted = false;
  data: any;
id: any;
  constructor(private activatedRoute: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, public planService: MaintenancePlanService, 
    public firestore: AngularFirestore, public router: Router, public toastCtrl: ToastController) {
    // this.route.params.subscribe(params => {
    //   this.data = params.id;
    // });

    // this.upgradePlanForm = new FormGroup({
    //   PlanName: new FormControl('', Validators.required),
    //   NewPlanName: new FormControl('', Validators.required)
    // });
  }

  submitForm(){
    // this.isSubmitted = true;
    // if(!this.upgradePlanForm.valid){
    //   return false;
    // }
    // else{
    //   const maintenanceplan = {
    //     NewPlanName: this.upgradePlanForm.get('NewPlanName').value
    //   }

    //   this.planService.updateMaintenancePlan(this.data, maintenanceplan)
    //   this.presentToast();
    // }

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
  async updateMaintenancePlan(id, data){

    this.planService.updateMaintenancePlan(this.id,this.data).subscribe(response => {
      console.log(response);
      
    })
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