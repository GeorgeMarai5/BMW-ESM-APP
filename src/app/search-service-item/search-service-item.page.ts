import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Vehicle } from '../models/Vehicle';
import { AuthService } from '../services/auth.service';
import { ServiceItemService } from 'app/services/service-item.service';

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
  id: any;
  data: any;
  serviceItemID: string;

  constructor(public authService: AuthService, private service: ServiceItemService, public fb: FormBuilder, 
    public alertCtrl: AlertController, public router: Router, public toastCtrl: ToastController) { 
      service = {} as ServiceItemService;
    }

  ngOnInit() {

    /*
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
    this.serviceItemForm = this.fb.group({
      FleetName: ['', [Validators.required]],
      FleetLocation: ['', [Validators.required]],
      FleetID: ['', [Validators.required]],
      FleetVehicleQty: ['', [Validators.required]],
    });
    */


    this.getAllServiceItems();


/*
    this.service.getItem(this.id).subscribe(data => {
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

    */
  }


  async getAllServiceItems(){

    this.service.getServiceItemList().subscribe(response => {
      console.log(response);
      this.data = response;
    })


  }


  async removeItem(item){
    const confirmDeleteAlert = await this.alertCtrl.create({
      header: 'Remove Service Item',
      message: 'Are you sure you would like to remove this item from the service?',
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
          this.service.deleteServiceItem(item.serviceItemID).subscribe(Response => {
            //Update list after delete is successful
            console.log(Response);
            this.getAllServiceItems()
          });
          this.presentToast('Service Item has been removed successfully.');
        }
      }]
    });

    confirmDeleteAlert.present();

  } 

  async presentToast(_message) {
    let toast = await this.toastCtrl.create({
      message: _message,
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}
