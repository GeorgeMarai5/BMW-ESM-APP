import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Part } from '../models/Part';
import { Vehicle } from '../models/Vehicle';
import { AuthService } from '../services/auth.service';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-view-vehicle-part',
  templateUrl: './view-vehicle-part.page.html',
  styleUrls: ['./view-vehicle-part.page.scss'],
})
export class ViewVehiclePartPage implements OnInit {

  parts: Part;
  part = {};
  viewPartForm: FormGroup;
  isSubmitted = false;
  data: any;
  maintenanceplanID: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, public firestore: AngularFirestore,
    public router: Router, public service: VehicleService) {
      this.route.params.subscribe(params => {
          this.data = params.id;
      });
      this.viewPartForm = new FormGroup({
        VINNum: new FormControl('', [Validators.required, Validators.min(17), Validators.max(17)]),
        vehicleModel: new FormControl('', Validators.required),
        Registration: new FormControl('', Validators.required),
        warrantyPlan: new FormControl('', Validators.required)
      })
     }

  ngOnInit() {
    this.service.getVehicle(this.data).valueChanges()
    .subscribe(res =>{
    console.log(res)
    this.viewPartForm.setValue({
      vehicleModel: res['VehicleModel'], 
      Registration: res['Registration'],
      VINNum: res['VIN_Number'], 
      warrantyPlan: res['Warranty']
    })
    });
  }

  submitForm(){
    this.service.getVehicle(this.data).valueChanges()
    .subscribe(res =>{
      this.maintenanceplanID = res['MaintenanceID'];
    });
    console.log(this.maintenanceplanID)
    if(this.maintenanceplanID != null || this.maintenanceplanID != undefined){
      this.router.navigate(['/tabs/view/maintenanceplan', '7jk7GWQB5eC6SdZuzU6P']);
    }
    else{
      this.router.navigate(['/tabs/search/maintenanceplan']);
    }
  }

  navToUpdate() {
    this.router.navigate(['tabs/edit/vehicle', this.data]);
  }

}
