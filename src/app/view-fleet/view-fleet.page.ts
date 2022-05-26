import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import{FleetService} from '../services/fleet.service';



interface FleetData {
  FleetID: number;
  FleetName: string;
  FleetLocation: string;
  FleetVehicleQty: number;
  
}

interface FleetVehicles{
  VehicleID: number;
  VinNumber: string;
  ModelName: string;
  Year: string;
}


@Component({
  selector: 'app-view-fleet',
  templateUrl: './view-fleet.page.html',
  styleUrls: ['./view-fleet.page.scss'],
})
export class ViewFleetPage implements OnInit {

   fleetList = [];
   fleetData: FleetData;
   fleetForm: FormGroup;

  constructor(public authService: AuthService,public fb: FormBuilder, private fleetservice:FleetService) { 

    this.fleetData = {} as FleetData;

  }

  ngOnInit() {

    this.fleetForm = this.fb.group({
      VehicleID: ['', [Validators.required]],
      VinNumber: ['', [Validators.required]],
      ModelName: ['', [Validators.required]],
      Year: ['', [Validators.required]],
  });


  this.fleetservice.read_Fleet().subscribe(data => {

    this.fleetList = data.map(e => {
      return {
        id: e.payload.doc.id,
        isEdit: false,
        FleetID: e.payload.doc.data()['FleetID'],
        FleetVehicleQty: e.payload.doc.data()['FleetVehicleQty'],
        FleetName: e.payload.doc.data()['FleetName'],
        FleetLocation: e.payload.doc.data()['FleetLocation']
      };
    })
    console.log(this.fleetList);

  });


}
RemoveFleet(ID) {
  if (window.confirm('Do you really want to Remove This Fleet?')) {
   
  
  this.fleetservice.delete_Fleet(ID);
  }
  console.log(ID)
}

}
