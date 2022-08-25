import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Vehicle } from '../models/Vehicle';
import { AuthService } from '../services/auth.service';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-search-service-item',
  templateUrl: './search-service-item.page.html',
  styleUrls: ['./search-service-item.page.scss'],
})
export class SearchServiceItemPage implements OnInit {

  vehicles: Vehicle;
  serviceItemList = [];
  serviceItemForm: FormGroup;
  searchTerm: string;

  constructor(public authService: AuthService, private service: VehicleService, public fb: FormBuilder, 
    private firestore: AngularFirestore, public alertCtrl: AlertController, public router: Router) { 
      this.vehicles = {} as Vehicle;
    }

  ngOnInit() {
    this.serviceItemForm = this.fb.group({
      FleetName: ['', [Validators.required]],
      FleetLocation: ['', [Validators.required]],
      FleetID: ['', [Validators.required]],
      FleetVehicleQty: ['', [Validators.required]],
    });

    this.service.getVehicles().subscribe(data => {
      this.serviceItemList = data.map(e => {
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
      console.log(this.serviceItemList);

    });
  }

  async removeItem(id){
    const confirmDeleteAlert = await this.alertCtrl.create({
      header: 'Remove Vehicle',
      message: 'Are you sure you would like to remove this vehicle from the system?',
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
          alert('Vehicle was successfully removed');
        }
      }]
    });

    confirmDeleteAlert.present();

  }

  async checkInVehicle(id){
    const confirmCheckInAlert = await this.alertCtrl.create({
      header: 'Check-in Vehicle',
      message: 'Would you like to check in this vehicle?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: end => {
          this.alertCtrl.dismiss();
        }
      },
      {
        text: 'Check-in',
        role: 'check-in',
        handler: () => {
          //Add Check in when backend added
          //this.service.deleteVehicle(id);
          alert('Vehicle was successfully checked in');
        }
      }]
    });

    confirmCheckInAlert.present();

  }
}
