import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Vehicle } from 'src/app/models/Vehicle';

@Component({
  selector: 'app-view-service-progress',
  templateUrl: './view-service-progress.page.html',
  styleUrls: ['./view-service-progress.page.scss'],
})
export class ViewServiceProgressPage implements OnInit {

  vehicles: Vehicle;
  vehicle = {};
  viewVehicleForm: FormGroup;
  isSubmitted = false;
  data: any;
  maintenanceplanID: any;

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
