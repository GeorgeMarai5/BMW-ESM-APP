import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
<<<<<<< HEAD
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../models/Vehicle';
=======
import { Vehicle } from '../models/Vehicle';
import { VehicleService } from '../services/vehicle.service';
>>>>>>> e643ef1b1cc521c690759d05c558e7fe37d7f150

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.page.html',
  styleUrls: ['./view-vehicle.page.scss'],
})
export class ViewVehiclePage implements OnInit {

  vehicles: Vehicle;
  vehicle = {};
  viewVehicleForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, public firestore: AngularFirestore,
    public router: Router, public service: VehicleService) {
      this.route.params.subscribe(params => {
          this.data = params.id;
      });
      this.viewVehicleForm = new FormGroup({
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
    this.viewVehicleForm.setValue({
      vehicleModel: res['VehicleModel'], 
      Registration: res['Registration'],
      VINNum: res['VIN_Number'], 
      warrantyPlan: res['Warranty']
    })
    });
  }

  navToUpdate() {
    this.router.navigate(['tabs/edit/vehicle'], this.data);
  }
}
