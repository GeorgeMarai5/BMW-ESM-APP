import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../services/service.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-service-history',
  templateUrl: './service-history.page.html',
  styleUrls: ['./service-history.page.scss'],
})
export class ServiceHistoryPage implements OnInit {


  deleteModal: HTMLElement;
  services: Service;
  HistoryList = [];
  serviceForm: FormGroup;
  searchTerm: string;
  id: any;

  constructor(public authService: AuthService, private _service: Service, public fb: FormBuilder, 
    private firestore: AngularFirestore, public alertCtrl: AlertController) { 
      this.services = {} as Service;
    }
    

  ngOnInit() {
    this.serviceForm = this.fb.group({
      ServiceID: ['', [Validators.required]],
      VINNumber: ['', [Validators.required]],
      ServiceType: ['', [Validators.required]],
      Date: ['', [Validators.required]]

      
  });
  

  this._service.getServices().subscribe(data => {
    this.HistoryList = data.map(e => {

      return {
        id: e.payload.doc.id,
        ServiceID: e.payload.doc.data()['ServiceID'],
        VINNumber: e.payload.doc.data()['VINNumber'],
        ServiceType: e.payload.doc.data()['ServiceType'],
        Date: e.payload.doc.data()['Date']

      };
    })
    console.log(this.HistoryList);

  });
  }
  async removeService(id){
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
          alert('Service was successfully removed');
        }
      }]
    });

    confirmDeleteAlert.present();

  }

}


