import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../models/Vehicle';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.page.html',
  styleUrls: ['./edit-vehicle.page.scss'],
})

export class EditVehiclePage implements OnInit {

  vehicles: Vehicle;
  vehicle = {};
  plans = [];
  models = [];
  editVehicleForm: FormGroup;
  isSubmitted = false;
  data: any;
id: any
item: any
  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, public service: VehicleService, public router: Router, public toastCtrl: ToastController) {
      this.route.params.subscribe(params => {
          this.data = params.id;
      });
    this.editVehicleForm = new FormGroup({
      VINNum: new FormControl('', [Validators.required, Validators.min(17), Validators.max(17)]),
      vehicleModel: new FormControl('', Validators.required),
      Registration: new FormControl('', Validators.required),
      warrantyPlan: new FormControl('', Validators.required)
    })
  }
  submitForm() {
    this.service.updateItem(this.id, this.item).subscribe((response) => {
      this.router.navigate(['/tabs/search/vehiclee']);
    });
console.log(this.data)
  }
  // submitForm(){
  //   this.isSubmitted = true;
  //   if(!this.editVehicleForm.valid){
  //     return false;
  //   }
  //   else{
  //       const dealership = {
  //         VIN_Number: this.editVehicleForm.get('VINNum').value,
  //         VehicleModel: this.editVehicleForm.get('vehicleModel').value,
  //         Registration: this.editVehicleForm.get('Registration').value,
  //         Warranty: this.editVehicleForm.get('warrantyPlan').value,
  //       }

  //     this.service.updateVehicle(this.data, dealership)
  //     this.presentToast();
  //   }

  //   this.router.navigate(['/tabs/view/vehicle', this.data]);
  // }

  ngOnInit() {
    // this.service.getVehicle(this.data).valueChanges().subscribe(res =>{
    //   console.log(res)
    //   this.editVehicleForm.setValue({
    //     VINNum: res['VIN_Number'],
    //     vehicleModel: res['VehicleModel'], 
    //     Registration: res['Registration'], 
    //     warrantyPlan: res['Warranty']
    //   })
    // });
  }

  get errorControl() {
    return this.editVehicleForm.controls;
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Vehicle has been updated successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}