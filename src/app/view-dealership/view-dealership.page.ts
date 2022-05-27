import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Vehicle } from '../models/Vehicle';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-view-dealership',
  templateUrl: './view-dealership.page.html',
  styleUrls: ['./view-dealership.page.scss'],
})
export class ViewDealershipPage implements OnInit {

  vehicles: Vehicle;
  vehicle = {};
  editVehicleForm: FormGroup;
  isSubmitted = false;
  data: any;
  viewVehicleForm: FormGroup;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, public firestore: AngularFirestore,
    public router: Router, public service: VehicleService) {
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.data = this.router.getCurrentNavigation().extras.state.id;
        }
      });
      this.viewVehicleForm = new FormGroup({
        VINNum: new FormControl('', [Validators.required, Validators.min(17), Validators.max(17)]),
        vehicleModel: new FormControl('', Validators.required),
        Registration: new FormControl('', Validators.required),
        warrantyPlan: new FormControl('', Validators.required)
      })
     }

  ngOnInit() {
    this.service.getVehicle('LhV0lKeg0Cokxc0nrIDT').valueChanges()
    .subscribe(res =>{
    console.log(res)
    this.viewVehicleForm.setValue({
      VINNum: res['VIN_Number'], 
      vehicleModel: res['VehicleModel'], 
      Registration: res['Registration'],
      warrantyPlan: res['Warranty']
    })
    });
  }

  openDetailsWithState() {
    let navigationExtras: NavigationExtras = {
      state: {
        id: 'LhV0lKeg0Cokxc0nrIDT'
      }
    };
    this.router.navigate(['tabs/edit/vehicle'], navigationExtras);
  }

}
