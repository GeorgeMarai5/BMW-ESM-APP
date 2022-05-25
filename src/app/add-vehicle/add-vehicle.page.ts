import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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

  constructor(public fb: FormBuilder, public authService: AuthService, public firestore: AngularFirestore) { 
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
        const vehicle = {
          VIN_Number: this.addVehicleForm.get('VINNum').value,
          VehicleModel: this.addVehicleForm.get('vehicleModel').value,
          Registration: this.addVehicleForm.get('Registration').value,
          Warranty: this.addVehicleForm.get('warrantyPlan').value
        }
        this.firestore.collection('Vehicle').add(vehicle).then(function(){
          alert("New vehicle created successfully");
        });
      }
     
  }

  ngOnInit() {
    this.addVehicleForm.setValue({VINNum: '', vehicleModel: '', Registration: '', warrantyPlan: ''});
  }

  get errorControl() {
    return this.addVehicleForm.controls;
  }
}
