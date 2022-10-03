import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../models/VehicleService';
import { AuthService } from '../services/auth.service';
import { ServiceService } from '../services/service.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-service',
  templateUrl: './search-service.page.html',
  styleUrls: ['./search-service.page.scss'],
})
export class SearchServicePage implements OnInit {
  deleteModal: HTMLElement;
  services: VehicleService;
  serviceList = [];
  serviceForm: FormGroup;
  searchTerm: string;
  id: any;

  constructor(public router: Router, public authService: AuthService, private _service: ServiceService, public fb: FormBuilder, private firestore: AngularFirestore, 
    public alertCtrl: AlertController, public toastCtrl: ToastController) { 
      this.services = {} as VehicleService;
    }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }

    var coll = document.getElementsByClassName("collapsible");
    var i;
    let up = document.getElementById('up');
    let down = document.getElementById('down');

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
          down.style.display = "none";
          up.style.display = "block";
        } else {
          content.style.display = "block";
          up.style.display = "none";
          down.style.display = "block";
        }
      });
    }
    // this.serviceForm = this.fb.group({
    //   ServiceID: ['', [Validators.required]],
    //   VINNumber: ['', [Validators.required]],
    //   ServiceType: ['', [Validators.required]],
    //   Date: ['', [Validators.required]]
    // });
    
    // this._service.getServices().subscribe(data => {
    //   this.serviceList = data.map(e => {

    //     return {
    //       id: e.payload.doc.id,
    //       ServiceID: e.payload.doc.data()['ServiceID'],
    //       VINNumber: e.payload.doc.data()['VINNumber'],
    //       ServiceTypeName: e.payload.doc.data()['ServiceTypeName'],
    //       Date: e.payload.doc.data()['Date']

    //     };
    //   })
    //   console.log(this.serviceList);

    // });
  }
  
  async cancelService(id){
    const confirmDeleteAlert = await this.alertCtrl.create({
      header: 'Remove Service',
      message: 'Are you sure you would like to remove this service from the system?',
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
          this._service.deleteService(id);
          this.presentToast();
        }
      }]
    });

    confirmDeleteAlert.present();

  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Service has been canceled successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}