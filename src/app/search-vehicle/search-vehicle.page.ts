import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../models/Vehicle';
import { AuthService } from '../services/auth.service';
import { VehicleService } from '../services/vehicle.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { stringify } from 'querystring';
import { generateKeyPair } from 'crypto';
import { Console } from 'console';

@Component({
  selector: 'app-search-vehicle',
  templateUrl: './search-vehicle.page.html',
  styleUrls: ['./search-vehicle.page.scss'],
})
export class SearchVehiclePage implements OnInit {

  vehicles: Vehicle;
  vehicleList = [];
  vehicleForm: FormGroup;

  constructor(public authService: AuthService, private service: VehicleService, public fb: FormBuilder, 
    private firestore: AngularFirestore) { 
      this.vehicles = {} as Vehicle;
    }

  ngOnInit() {
    this.vehicleForm = this.fb.group({
      FleetName: ['', [Validators.required]],
      FleetLocation: ['', [Validators.required]],
      FleetID: ['', [Validators.required]],
      FleetVehicleQty: ['', [Validators.required]],
  });

  this.service.getVehicles().subscribe(data => {
    this.vehicleList = data.map(e => {
      let yearCode: string;
      yearCode = e.payload.doc.data()['VIN_Number'];

      return {
        id: e.payload.doc.id,
        VehicleID: e.payload.doc.data()['VehicleID'],
        VINNumber: e.payload.doc.data()['VIN_Number'],
        vehicleModel: e.payload.doc.data()['VehicleModel'],
        year: this.service.getYear(yearCode.substring(9, 10))
      };
    })
    console.log(this.vehicleList);

  });
  }

  viewVehicle(){

  }

  removeVehicle(){
    
  }

}
