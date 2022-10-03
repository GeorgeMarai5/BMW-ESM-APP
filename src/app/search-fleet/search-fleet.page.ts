import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import{FleetService} from '../services/fleet.service';
import { AlertController, ToastController } from '@ionic/angular';
import {  Fleet } from '../models/Fleet';

@Component({
  selector: 'app-search-fleet',
  templateUrl: './search-fleet.page.html',
  styleUrls: ['./search-fleet.page.scss'],
})
export class SearchFleetPage implements OnInit {

  fleetList = [];
  
  fleetForm: FormGroup;
  searchTerm: string;
  data: any;
  fleetID: string;
  
  constructor(public authService: AuthService, public fb: FormBuilder, private fleetservice: FleetService, 
    public alertCtrl: AlertController, public toastCtrl: ToastController) { 
    fleetservice = {} as FleetService;
  }

  ngOnInit() {
    /*
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
    */
    this.getallFleets()
  }

    async getallFleets(){
      this.fleetservice.getFleetList().subscribe(response => {
        console.log(response);
        this.data = response;
      })
    }
    
    async deleteFleet(item){
      this.fleetservice.deleteFleet(item.fleetId).subscribe(Response => {
        console.log(Response);
        this.getallFleets()
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
            this.fleetservice.deleteFleet(id);
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