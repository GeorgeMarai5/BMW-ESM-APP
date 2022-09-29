import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Part } from '../models/Part';
import { AuthService } from '../services/auth.service';
import { PartInfoService } from '../services/part-info.service';

@Component({
  selector: 'app-assign-vehicle-part',
  templateUrl: './assign-vehicle-part.page.html',
  styleUrls: ['./assign-vehicle-part.page.scss'],
})
export class AssignVehiclePartPage implements OnInit {

  part: Part;
  types: [];
  parts = {};
  assignPartForm: UntypedFormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute,
    public fb: UntypedFormBuilder, 
    public authService: AuthService, 
    public service: PartInfoService, 
    public router: Router, 
    public toastCtrl: ToastController) {

      this.route.params.subscribe(params => {
          this.data = params.id;
      });
      this.assignPartForm = new UntypedFormGroup({
        partName: new UntypedFormControl('', Validators.required),
        partType: new UntypedFormControl('', Validators.required),
        Description: new UntypedFormControl('', Validators.required),
        partStock: new UntypedFormControl('', Validators.required)
      });

  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.assignPartForm.valid){
      return false;
    }
    else{
        const vehicleParts = {
          partName: this.assignPartForm.get('partName').value,
          partType: this.assignPartForm.get('partType').value,
          Description: this.assignPartForm.get('description').value
        }
        this.service.getPart(vehicleParts)
        this.presentToast()
      }
      this.router.navigate(['/tabs/search/vehicle-part']);
  }

  ngOnInit() {
    if(this.authService.isLoggedIn) {
      return true;
    }
    else {
      this.router.navigate(['/tabs/login']);
    }
  }

  get errorControl() {
    return this.assignPartForm.controls;
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Part has been successfully assigned.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}