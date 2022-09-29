import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-capture-initial-inspection-details',
  templateUrl: './capture-initial-inspection-details.page.html',
  styleUrls: ['./capture-initial-inspection-details.page.scss'],
})
export class CaptureInitialInspectionDetailsPage implements OnInit {

  inspections: [];
  isSubmitted = false;
  data: any;
  checkList = {};
  inspectionDetailsForm: UntypedFormGroup;

  constructor(private route: ActivatedRoute, public fb: UntypedFormBuilder, public authService: AuthService, public firestore: AngularFirestore, 
    public service: VehicleService, public router: Router, public toastCtrl: ToastController) { 
      this.route.params.subscribe(params => {
        this.data = params['id'];
      });
    }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
    this.checkList = JSON.parse(sessionStorage.getItem('checkList'));
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Initial inspection details have been successfully captured.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }

  get errorControl() {
    return this.inspectionDetailsForm.controls;
  }
}
