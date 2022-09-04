import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import{FleetService} from '../services/fleet.service';
import { VehicleService } from '../services/vehicle.service';
import { AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Fleets } from '../models/fleet';

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
   data: any;
   id: number;
   dat: any;

  constructor(public authService: AuthService, public fb: FormBuilder, private fleetservice: FleetService, private vehiclesService: VehicleService,
    public alertCtrl: AlertController, public router: Router, public vehicleService: VehicleService, public toastCtrl: ToastController,
    public activatedRoute: ActivatedRoute) { 

    this.VehicleData = {} as FleetVehicles;

  }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.params["fleetID"];



    this.fleetservice.getFleet(this.id).subscribe(response => {
      console.log(response);
      this.dat = response;

    })




  }

  async deleteFleet(id){

  }

  async select(){

  }

  async checkIn(id){

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






















/*
 this.fleetForm = this.fb.group({
      VehicleID: ['', [Validators.required]],
      VinNumber: ['', [Validators.required]],
      ModelName: ['', [Validators.required]],
      Year: ['', [Validators.required]],
    });

    this.vehiclesService.getVehicles().subscribe(data => {
      this.vehicleList = data.map(e => {
        let yearCode: string;
        yearCode = e.payload.doc.data()['VIN_Number'];
        return {
          id: e.payload.doc.id,
          isEdit: false,
          VehicleID: e.payload.doc.data()['VehicleID'],
          VinNumber: e.payload.doc.data()['VIN_Number'],
          ModelName: e.payload.doc.data()['VehicleModel'],
          Year: this.vehicleService.getYear(yearCode.substring(9, 10))
        };
      });

      console.log(this.vehicleList);

    });
  }

  RemoveFleet(ID) {
    if (window.confirm('Do you really want to Remove This Fleet?')) {
      this.vehiclesService.deleteVehicle(ID);
    }

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
          this.presentToast();
        }
      }]
    });

    confirmDeleteAlert.present();

  }

  navToUpdate() {
    this.router.navigate(['/tabs/edit/fleet', this.data]);
  }

  select(){
    if(window.confirm('Fleet selected')){
      
    }
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