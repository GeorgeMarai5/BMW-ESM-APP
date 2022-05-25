
import { Component, OnInit,NgZone } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import{FleetService} from '../services/fleet.service';

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

  fleetList = [];
  fleetData: FleetData;
  fleetForm: FormGroup;
  

  constructor(public authService: AuthService,public fb: FormBuilder, private fleetservice:FleetService) {

    {
      this.fleetData = {} as FleetData;
    }

   }





  ngOnInit() {

    this.fleetForm = this.fb.group({
      FleetName: ['', [Validators.required]],
      FleetLocation: ['', [Validators.required]],
      
    })

  
  this.fleetservice.read_Fleet().subscribe(data => {

    this.fleetList = data.map(e => {
      return {
        id: e.payload.doc.id,
        isEdit: false,
        FleetName: e.payload.doc.data()['FleetName'],
        FleetLocation: e.payload.doc.data()['FleetLocation']
      };
    })
    console.log(this.fleetList);

  });
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
