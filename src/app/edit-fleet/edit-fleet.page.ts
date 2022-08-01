
import { Component, OnInit,NgZone } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import{FleetService} from '../services/fleet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface FleetData {
  FleetName: string;
  FleetLocation: string;
  
}



@Component({
  selector: 'app-edit-fleet',
  templateUrl: './edit-fleet.page.html',
  styleUrls: ['./edit-fleet.page.scss'],
})
export class EditFleetPage implements OnInit {

  
  fleets: FleetData;
  fleet = {};
  fleetform: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, 
    public fleetservice: FleetService, public firestore: AngularFirestore, public router: Router) {
      this.route.params.subscribe(params => {
          this.data = params.id;
      });
    this.fleetform = new FormGroup({
      FleetName: new FormControl('', Validators.required),
      FleetLocation: new FormControl('', Validators.required)
    })
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.fleetform.valid){
      return false;
    }
    else{
        const dealership = {
          FleetName: this.fleetform.get('FleetName').value,
          FleetLocation: this.fleetform.get('FleetLocation').value
        }
        this.fleetservice.update_Fleet(this.data,this.fleet)   //this.data, this.fleets
        alert("Vehicle was successfully updated.");
      }
      this.router.navigate(['/tabs/view/fleet']);     // this.data
  }

  ngOnInit() {
    this.fleetservice.getFleet("50RmrbhJeHHNJPLLsykC").valueChanges()
    .subscribe(res =>{
    console.log(res)
    this.fleetform.setValue({
      FleetName: res['FleetName'], 
      FleetLocation: res['FleetLocation']
    })
    });
  }

  get errorControl() {
    return this.fleetform.controls;
  }




EditFleet(Fleet) {
  Fleet.isEdit = true;
  Fleet.EditFleetName = Fleet.FleetName;
  Fleet.EditFleetLocation = Fleet.FleetLocation;
  
}


UpdateFleet(Fleet) {
  let FleetID = {};
  Fleet['FleetName'] = Fleet.FleetName;
  Fleet['FleetLocation'] = Fleet.FleetLocation; 
  this.fleetservice.update_Fleet(Fleet.id,Fleet);
  //Fleet.isEdit = false;
  console.log(Fleet,"successfully updated")
}



}
