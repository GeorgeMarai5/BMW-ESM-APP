import { Component, OnInit } from '@angular/core';
import { ModelService } from '../models/ModelService';
import { AuthService } from '../services/auth.service';
import { Service } from '../services/service.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';


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
    private firestore: AngularFirestore) { 
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

  viewService(){

    

  }

  removeService(){


    
  }
}