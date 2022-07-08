import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/Vehicle';
import { AuthService } from 'src/app/services/auth.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-part',
  templateUrl: './search-part.page.html',
  styleUrls: ['./search-part.page.scss'],
})
export class SearchPartPage implements OnInit {
  vehicles: Vehicle;
  vehicleList = [];
  vehicleForm: FormGroup;
  searchTerm: string;

  constructor(public authService: AuthService, private service: VehicleService, public fb: FormBuilder, 
    private firestore: AngularFirestore, public alertCtrl: AlertController, public router: Router) { 
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

  async removeVehicle(id){
    const confirmDeleteAlert = await this.alertCtrl.create({
      header: 'Remove Dealership',
      message: 'Are you sure you would like to remove this dealership from the system?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: end => {
          this.alertCtrl.dismiss();
        }
      },
      {
        text: 'Remove',
        role: 'remove',
        handler: () => {
          this.service.deleteVehicle(id);
          alert('Dealership was successfully removed');
        }
      }]
    });

    confirmDeleteAlert.present();

  }
}
