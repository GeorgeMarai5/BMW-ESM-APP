import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.page.html',
  styleUrls: ['./add-vehicle.page.scss'],
})
export class AddVehiclePage implements OnInit {

  addVehicleForm: FormGroup;
  isSubmitted = false;

  constructor(public fb: FormBuilder, public authService: AuthService) { 
    this.addVehicleForm = new FormGroup({
      VINNum: new FormControl('', Validators.required),
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
      console.log(this.addVehicleForm.value);
    }
    return false;
  }

  ngOnInit() {
    this.addVehicleForm.setValue({VINNum: '', vehicleModel: '', Registration: '', warrantyPlan: ''});
  }

  get errorControl() {
    return this.addVehicleForm.controls;
  }
}
