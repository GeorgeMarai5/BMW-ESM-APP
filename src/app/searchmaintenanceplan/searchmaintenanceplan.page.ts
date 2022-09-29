import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router,Route } from '@angular/router';
import { PostService } from '../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { MaintenancePlanService } from '../services/MaintenancePlan.service';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MaintenancePlan } from '../models/Maintenance-Plan';
import { AlertController } from '@ionic/angular';

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
maintenancePlanID: string;
data: any;

constructor(public planService: MaintenancePlanService, public alertController: AlertController, private zone: NgZone,private toastCtrl: ToastController,private service: PostService, 
  public fb: FormBuilder,private router: Router, private route: ActivatedRoute, public authService: AuthService, private firestore: AngularFirestore) {
   // this.plans = {} as MaintenancePlan; 
service = {} as MaintenancePlanService;
}

ngOnInit(){
  this.getAllMaintenancePlans();
    // this.planform = this.fb.group({
    //   PlanName: ['', [Validators.required]],
    //   Description: ['', [Validators.required]],
    //   Duration: ['', [Validators.required]],
    //   Price: ['', [Validators.required]],
    // });
  }
    // this.planService.getMaintenancePlanList().subscribe(data => {
    //   this.maintenanceplanList = data.map(e => {

    //     return {
    //       id: e.payload.doc.id,
    //       PlanName: e.payload.doc.data()['Plan_Name'],
    //       Description: e.payload.doc.data()['Description'],
    //       Duration: e.payload.doc.data()['Duration'],
    //       Price: e.payload.doc.data()['Price']
    //     };
    //   });

    //   console.log(this.maintenanceplanList);

    // }
  // )}

  async getAllMaintenancePlans(){

    this.service.getMaintenancePlanList().subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }

  async deleteMaintenancePlan(item){
    this.service.deleteMaintenancePlan(item.fleetId).subscribe(Response => {
      console.log(Response);
      this.getAllMaintenancePlans()

    });
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
