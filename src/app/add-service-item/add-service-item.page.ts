import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { VehicleService } from '../services/vehicle.service';


@Component({
  selector: 'app-add-service-item',
  templateUrl: './add-service-item.page.html',
  styleUrls: ['./add-service-item.page.scss'],
})
export class AddServiceItemPage implements OnInit {

  addItemForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, 
    public firestore: AngularFirestore, public service: VehicleService, public router: Router) { 
    this.route.params.subscribe(params => {
      this.data = params['id'];
    });
    this.addItemForm = new FormGroup({
      itemName: new FormControl('', [Validators.required, Validators.min(17), Validators.max(17)]),
      itemDescription: new FormControl('', Validators.required),
    })
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.addItemForm.valid){
      return false;
    }
    else{
      const vehicle = {
        VIN_Number: this.addItemForm.get('VINNum').value,
        VehicleModel: this.addItemForm.get('vehicleModel').value,
        Registration: this.addItemForm.get('Registration').value,
        Warranty: this.addItemForm.get('warrantyPlan').value,
        FleetID: ''
      }

      if(this.data != null || this.data != undefined){
        vehicle.FleetID = this.data;
      }
      else{
        vehicle.FleetID = '';
      }

      this.firestore.collection('Vehicle').add(vehicle).then(function(){
        alert("New vehicle created successfully");
      });
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
  }

  get errorControl() {
    return this.addItemForm.controls;
  }

}
