import { Component, OnInit } from '@angular/core';
import { ModelService } from '../models/ModelService';
import { AuthService } from '../services/auth.service';
import { Service } from '../services/service.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AlertController } from '@ionic/angular';

interface ServiceData {
  $key: string;
  ServiceID: number;
  VINNumber: string;
  ServiceTypeName: string;
  Date: number;
}
@Component({
  selector: 'app-search-service',
  templateUrl: './search-service.page.html',
  styleUrls: ['./search-service.page.scss'],
})
export class SearchServicePage implements OnInit {
  deleteModal: HTMLElement;
  services: ModelService;
  serviceList = [];
  serviceForm: FormGroup;
  searchTerm: string;
  serviceData: ServiceData;
  name = 'Angular ';
  today = new Date();
  changedDate = '';
  pipe = new DatePipe('en-US');
  changeFormat(today){
    let ChangedFormat = this.pipe.transform(this.today, 'dd/MM/YYYY');
    this.changedDate = ChangedFormat;
    console.log(this.changedDate);
  }
  constructor(public authService: AuthService, private _service: Service, public fb: FormBuilder, 
    private firestore: AngularFirestore, public alertCtrl: AlertController) { 
      //this._service = {} as Service;
      this.serviceData = {} as ServiceData;
    }

  ngOnInit() {
    this.serviceForm = this.fb.group({
      ServiceID: ['', [Validators.required]],
      VINNumber: ['', [Validators.required]],
      ServiceTypeName: ['', [Validators.required]],
      Date: ['', [Validators.required]],
  });
  

  this._service.readService().subscribe(data => {
    this.serviceList = data.map(e => {


      return {
        id: e.payload.doc.id,
        ServiceID: e.payload.doc.data()['ServiceID'],
        VINNumber: e.payload.doc.data()['VIN_Number'],
        ServiceTypeName: e.payload.doc.data()['ServiceType'],
        Date: e.payload.doc.data()['Date']

      };
    })
    console.log(this.serviceList);

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
  viewService(id){

    

  }

}