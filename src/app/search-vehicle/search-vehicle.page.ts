import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../models/Vehicle';
import { AuthService } from '../services/auth.service';
import { VehicleService } from '../services/vehicle.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-search-vehicle',
  templateUrl: './search-vehicle.page.html',
  styleUrls: ['./search-vehicle.page.scss'],
})
export class SearchVehiclePage implements OnInit {

  vehicles: Vehicle[];

  constructor(public authService: AuthService, private service: VehicleService,
    private firestore: AngularFirestore) { }

  ngOnInit() {
    
  }

}
