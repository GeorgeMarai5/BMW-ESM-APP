import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { MaintenancePlan } from '../models/Maintenance-Plan';
import { AuthService } from '../services/auth.service';
import { MaintenancePlanService } from '../services/MaintenancePlan.service';
import { PostService } from '../services/post.service';
import { AlertController } from '@ionic/angular';
import { SelectMaintenanceplanHelpComponent } from 'app/components/select-maintenanceplan-help/select-maintenanceplan-help.component';

@Component({
  selector: 'app-select-maintenanceplan',
  templateUrl: './select-maintenanceplan.page.html',
  styleUrls: ['./select-maintenanceplan.page.scss'],
})

export class SelectMaintenanceplanPage implements OnInit {

  maintenanceplanList = [];
  plans: MaintenancePlan;
  planForm : FormGroup;
  data: any;
  isSubmitted = false;
 
  constructor(public planService: MaintenancePlanService , private zone: NgZone,private toastCtrl: ToastController, private service: PostService, 
    public fb: FormBuilder,private router: Router, private route: ActivatedRoute, public authService: AuthService, 
    public alertController: AlertController,private firestore: AngularFirestore,
    public helpModal: ModalController) { 
      this.route.params.subscribe(params => {
        this.data = params.id;
      });
      this.planForm = new FormGroup({
        PlanName: new FormControl('', Validators.required),
        Description: new FormControl('', Validators.required),
        Duration: new FormControl('', Validators.required),
        Price: new FormControl('', Validators.required)
      })
    }

  ngOnInit() {
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
  }

  submitForm(){

  }

  async showHelp(){
    const modal = await this.helpModal.create({
      component: SelectMaintenanceplanHelpComponent});
      return await modal.present();
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