import { Component, OnInit } from '@angular/core';
import { theService } from '../models/theService';
import { AuthService } from '../services/auth.service';
import { Service } from '../services/service.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-search-service',
  templateUrl: './search-service.page.html',
  styleUrls: ['./search-service.page.scss'],
})
export class SearchServicePage implements OnInit {

  myServices: Service;
  serviceList = [];
  serviceForm: FormGroup;

  constructor(public authService: AuthService, private _service: Service, public fb: FormBuilder, 
    private firestore: AngularFirestore) { 
      this.myServices = {} as Service;
    }

  ngOnInit() {
    this.serviceForm = this.fb.group({
      ServiceID: ['', [Validators.required]],
      VINNumber: ['', [Validators.required]],
      ServiceType: ['', [Validators.required]],
      Date: ['', [Validators.required]],
  });
  }
}
  // this._service.getService().subscribe(data => {
  //   this.serviceList = data.map(e => {
  //     let yearCode: string;
  //     yearCode = e.payload.doc.data()['VIN_Number'];

  //     return {
  //       id: e.payload.doc.id,
  //       ServiceID: e.payload.doc.data()['ServiceID'],
  //       VINNumber: e.payload.doc.data()['VIN_Number'],
  //       ServiceType: e.payload.doc.data()['ServiceType'],
  //       year: this._service.getYear(yearCode.substring(9, 10))
  //     };
  //   })
  //   console.log(this.serviceList);

  // });
  // }


