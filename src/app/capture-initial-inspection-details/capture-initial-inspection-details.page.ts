import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
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
  inspectionDetailsForm: FormGroup;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, public firestore: AngularFirestore, 
    public service: VehicleService, public router: Router, public toastCtrl: ToastController) { 
      this.route.params.subscribe(params => {
        this.data = params['id'];
      });
    }

  ngOnInit() {
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
}
