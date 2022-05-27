import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../models/Vehicle';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private router: Router, public fb: FormBuilder, public authService: AuthService, public service: VehicleService) { 
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
      console.log(this.editVehicleForm.value);
    }
    return false;
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
