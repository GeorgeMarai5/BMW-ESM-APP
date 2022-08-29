import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  parts = {};
  assignPartForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, 
    public service: PartInfoService, public firestore: AngularFirestore, public router: Router, public toastCtrl: ToastController) {
      this.route.params.subscribe(params => {
          this.data = params.id;
      });
      this.assignPartForm = new FormGroup({
        partName: new FormControl('', Validators.required),
        partType: new FormControl('', Validators.required),
        Description: new FormControl('', Validators.required)
      });
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.assignPartForm.valid){
      return false;
    }
    else{
        const dealership = {
          partName: this.assignPartForm.get('partName').value,
          partType: this.assignPartForm.get('partType').value,
          Description: this.assignPartForm.get('description').value
        }
        //this.service.updatePart(this.data, dealership)
        this.presentToast()
      }
      this.router.navigate(['/tabs/view/dealership', this.data]);
  }

  ngOnInit() {
    this.service.getPart(this.data).valueChanges()
    .subscribe(res =>{
    console.log(res)
    this.assignPartForm.setValue({
      dealershipName: res['DealershipName'], 
      address: res['AddressName']
    })
    });
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
