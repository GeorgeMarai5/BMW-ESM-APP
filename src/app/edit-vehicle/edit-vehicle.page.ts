import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../models/Vehicle';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.page.html',
  styleUrls: ['./edit-vehicle.page.scss'],
})
export class EditVehiclePage implements OnInit {

  vehicles: Vehicle;
  vehicle = {};
  editVehicleForm: FormGroup;
  isSubmitted = false;
  id: any;

  constructor(private route: ActivatedRoute, private router: Router, public fb: FormBuilder, 
    public authService: AuthService, public service: VehicleService, public firestore: AngularFirestore) { 
    this.editVehicleForm = new FormGroup({
      VINNum: new FormControl('', Validators.required),
      vehicleModel: new FormControl('', Validators.required),
      Registration: new FormControl('', Validators.required),
      warrantyPlan: new FormControl('', Validators.required)
    });
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.editVehicleForm.valid){
      return false;
    }
    else{
        const vehicle = {
          VIN_Number: this.editVehicleForm.get('VINNum').value,
          VehicleModel: this.editVehicleForm.get('vehicleModel').value,
          Registration: this.editVehicleForm.get('Registration').value,
          Warranty: this.editVehicleForm.get('warrantyPlan').value
        }
        this.service.updateVehicle(this.id, vehicle)
        alert("Vehicle was successfully updated.");
      }
      this.router.navigate(['/tabs/view/vehicle', this.id]);
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getVehicle(this.id).valueChanges()
    .subscribe(res =>{
    console.log(res)
    this.editVehicleForm.setValue({
      VINNum: res['VIN_Number'], 
      vehicleModel: res['VehicleModel'], 
      Registration: res['Registration'],
      warrantyPlan: res['Warranty']
    })
    });

  }

  get errorControl() {
    return this.editVehicleForm.controls;
  }

}
