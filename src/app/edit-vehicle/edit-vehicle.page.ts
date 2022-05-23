import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.page.html',
  styleUrls: ['./edit-vehicle.page.scss'],
})
export class EditVehiclePage implements OnInit {

  editVehicleForm: FormGroup;
  isSubmitted = false;

  constructor(public fb: FormBuilder, public authService: AuthService) { 
    this.editVehicleForm = new FormGroup({
      VINNum: new FormControl('', Validators.required),
      vehicleModel: new FormControl('', Validators.required),
      Registration: new FormControl('', Validators.required),
      warrantyPlan: new FormControl('', Validators.required)
    })
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
    this.editVehicleForm.setValue({VINNum: '', vehicleModel: '', Registration: '', warrantyPlan: ''});
  }

  get errorControl() {
    return this.editVehicleForm.controls;
  }
}
