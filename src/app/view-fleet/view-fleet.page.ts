import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import{FleetService} from '../services/fleet.service';
import { VehicleService } from '../services/vehicle.service';



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

   vehicleList = [];
   VehicleData: FleetVehicles;
   fleetForm: FormGroup;
   searchTerm: string;
   fleetID: string;

  constructor(public authService: AuthService,public fb: FormBuilder, private fleetservice:FleetService, private vehiclesService: VehicleService) { 

    this.VehicleData = {} as FleetVehicles;

  }

  ngOnInit() {

    this.fleetForm = this.fb.group({
      VehicleID: ['', [Validators.required]],
      VinNumber: ['', [Validators.required]],
      ModelName: ['', [Validators.required]],
      Year: ['', [Validators.required]],
  });


  this.vehiclesService.getVehicles().subscribe(data => {

    this.vehicleList = data.map(e => {
      return {
        id: e.payload.doc.id,
        isEdit: false,
        VehicleID: e.payload.doc.data()['VehicleID'],
        VinNumber: e.payload.doc.data()['VIN_Number'],
        ModelName: e.payload.doc.data()['VehicleModel'],
        Year: e.payload.doc.data()['year']
      };
    })
    console.log(this.vehicleList);

  });


}
RemoveFleet(ID) {
  if (window.confirm('Do you really want to Remove This Fleet?')) {
   
  
  this.vehiclesService.deleteVehicle(ID);
  }
  console.log(ID)
}

select(){
  if(window.confirm('Fleet selected')){
    
  }
}

}
