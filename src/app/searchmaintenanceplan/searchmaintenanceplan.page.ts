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

constructor(public planService: MaintenancePlanService, public alertController: AlertController, private zone: NgZone,private toastCtrl: ToastController,private service: PostService, 
  public fb: FormBuilder,private router: Router, private route: ActivatedRoute, public authService: AuthService, private firestore: AngularFirestore) {
    this.plans = {} as MaintenancePlan; 
}

ngOnInit(){
  var coll = document.getElementsByClassName("collapsible");
  var i;
  let up = document.getElementById('up');
  let down = document.getElementById('down');

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
        down.style.display = "none";
        up.style.display = "block";
      } else {
        content.style.display = "block";
        up.style.display = "none";
        down.style.display = "block";
      }
    });
  }
  
    this.planform = this.fb.group({
      PlanName: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Duration: ['', [Validators.required]],
      Price: ['', [Validators.required]],
    });
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
