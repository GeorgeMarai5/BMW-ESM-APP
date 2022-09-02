import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import{FleetService} from '../services/fleet.service';
import { AlertController, ToastController } from '@ionic/angular';

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
  data: any;
  constructor(public authService: AuthService, public fb: FormBuilder, private fleetservice: FleetService, 
    public alertCtrl: AlertController, public toastCtrl: ToastController) { 

    fleetservice = {} as FleetService;

  }

  ngOnInit() {



    this.fleetservice.getList().subscribe(response => {
      console.log(response);
      this.data = response;

  })

    }

  deleteFleet(id){

  }


  }


































































/*

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
          this.presentToast();
        }
      }]
    });

    confirmDeleteAlert.present();

  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Fleet has been removed successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}


*/






