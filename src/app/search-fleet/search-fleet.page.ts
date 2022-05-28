import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import{FleetService} from '../services/fleet.service';


interface FleetData {
  $key: string;
  FleetID: number;
  FleetName: string;
  FleetLocation: string;
  FleetVehicleQty: number;
  
}

@Component({
  selector: 'app-search-fleet',
  templateUrl: './search-fleet.page.html',
  styleUrls: ['./search-fleet.page.scss'],
})
export class SearchFleetPage implements OnInit {

   fleetList = [];
   fleetData: FleetData;
   fleetForm: FormGroup;
   searchTerm: string;
   fleetID: string;


  constructor(public authService: AuthService,public fb: FormBuilder, private fleetservice:FleetService) { 

    this.fleetData = {} as FleetData;

  }

  ngOnInit() {

    this.fleetForm = this.fb.group({
      FleetName: ['', [Validators.required]],
      FleetLocation: ['', [Validators.required]],
      FleetID: ['', [Validators.required]],
      FleetVehicleQty: ['', [Validators.required]],
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