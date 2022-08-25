import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import{FleetService} from '../services/fleet.service';
import { AlertController } from '@ionic/angular';

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

  constructor(public authService: AuthService, public fb: FormBuilder, private fleetservice: FleetService, 
    public alertCtrl: AlertController) { 

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
  alert("Vehicle was successfully Removed.");
  this.fleetservice.delete_Fleet(ID);
  console.log(ID)
}


  async Deletefleet(id){
    const confirmDeleteAlert = await this.alertCtrl.create({
      header: 'Remove Fleet',
      message: 'Are you sure you would like to remove this Fleet from the system?',
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
          this.fleetservice.delete_Fleet(id);
          alert('Fleet was successfully removed');
        }
      }]
    });

    confirmDeleteAlert.present();

  }
}