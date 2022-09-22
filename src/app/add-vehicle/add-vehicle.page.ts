import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.page.html',
  styleUrls: ['./add-vehicle.page.scss'],
})
export class AddVehiclePage implements OnInit {

  models = [];
  plans = [];
  addVehicleForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, 
    public service: VehicleService, public router: Router, public toastCtrl: ToastController) { 
    this.route.params.subscribe(params => {
      this.data = params['id'];
    });
    this.addVehicleForm = new FormGroup({
      VINNum: new FormControl('', [Validators.required, Validators.min(17), Validators.max(17)]),
      vehicleModel: new FormControl('', Validators.required),
      Registration: new FormControl('', Validators.required),
      warrantyPlan: new FormControl('', Validators.required)
    })
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.addVehicleForm.valid){
      return false;
    }
    else{
      const vehicle = {
        VIN_Number: this.addVehicleForm.get('VINNum').value,
        VehicleModel: this.addVehicleForm.get('vehicleModel').value,
        Registration: this.addVehicleForm.get('Registration').value,
        Warranty: this.addVehicleForm.get('warrantyPlan').value,
        FleetID: ''
      }

      if(this.data != null || this.data != undefined){
        vehicle.FleetID = this.data;
      }
      else{
        vehicle.FleetID = '';
      }
      //this.service.updateVehicle(this.data, vehicle)
      this.presentToast()
    }
    this.router.navigate(['/tabs/view/fleet'], this.data);
  }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }

    this.addVehicleForm.setValue({VINNum: '', vehicleModel: '', Registration: '', warrantyPlan: ''});
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'A new vehicle has been added to the fleet.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  get errorControl() {
    return this.addVehicleForm.controls;
  }

}