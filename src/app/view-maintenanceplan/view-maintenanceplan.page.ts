import { Component, OnInit, NgZone } from '@angular/core';
import { UntypedFormBuilder,Validators,UntypedFormGroup,UntypedFormControl  } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { MaintenancePlan } from '../models/Maintenance-Plan';
import { ActivatedRoute } from '@angular/router';
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
  planform : UntypedFormGroup;
  data: any;

  constructor(public planService: MaintenancePlanService , private zone: NgZone,private toastCtrl: ToastController,private service: PostService, 
  public fb: UntypedFormBuilder,private router: Router, private route: ActivatedRoute, public authService: AuthService, private firestore: AngularFirestore) { 
    this.route.params.subscribe(params => {
      this.data = params.id;
    });

    this.planform = new UntypedFormGroup({
      PlanName: new UntypedFormControl('', Validators.required),
      Description: new UntypedFormControl('', Validators.required),
      Duration: new UntypedFormControl('', Validators.required),
      Price: new UntypedFormControl('', Validators.required)
    });
  }

  ngOnInit() {
    // this.planService.getMaintenancePlan(this.data).valueChanges()
    //   .subscribe(res =>{
    //   console.log(res)
    //   this.planform.setValue({
    //     PlanName: res['Plan_Name'], 
    //     Description: res['Description'],
    //     Duration: res['Duration'], 
    //     Price: res['Price']
    //   })
    // });
  }

  navToUpdate() {
    this.router.navigate(['/tabs/upgrade/maintenanceplan', this.data]);
  }
}