import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,FormGroup, FormControl, Validators, Form } from '@angular/forms';
import{Service} from '../services/service.service';
import { Router, NavigationExtras } from '@angular/router';
import { stringify } from 'querystring';
import { CancelServicePage } from '../cancel-service/cancel-service.page';

// interface ServiceData {
//   ServiceID: number;
//   DealershipName: string;
//   TeamName: string;
//   ServiceType: string;
//   ServiceStatus: string;
  
// }

interface ServiceVehicles{
  VehicleID: number;
  DealershipName: string;
  TeamName: string;
  ServiceTypeName: string;
  ServiceStatus: string;

}


@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.page.html',
  styleUrls: ['./view-service.page.scss'],
})
export class ViewServicePage implements OnInit {

   serviceList = [];
   
   serviceForm: FormGroup;
   services: Service;
   searchTerm: string;
   ServiceData: ServiceVehicles;

  constructor(public authService: AuthService, private _service: Service, public router: Router, private fb: FormBuilder) { 

   
    this.ServiceData = {} as ServiceVehicles;

  }
  // openDetailsWithState() {
  //   let navigationExtras: NavigationExtras = {
  //     state: {
  //       user: this.serviceList
  //     }
  //   };
  //   this.router.navigate(['viewservice'], navigationExtras);
  // }
  // ngOnInit() {

  //   this.serviceForm = this.fb.group({
  //     VehicleID: ['', [Validators.required]],
  //     VinNumber: ['', [Validators.required]],
  //     ModelName: ['', [Validators.required]],
  //     Year: ['', [Validators.required]],
  // });


  // this._service.readService().subscribe(data => {

  //   this.serviceList = data.map(e => {
  //     return {
  //       id: e.payload.doc.id,
  //       ServiceID: e.payload.doc.data()['ServiceID'],
  //       DealershipName: e.payload.doc.data()['DealershipName'],
  //       TeamName: e.payload.doc.data()['TeamName'],
  //       ServiceType: e.payload.doc.data()['ServiceType'],
  //       ServiceStatus: e.payload.doc.data()['ServiceStatus']
  //     };
  //   })
  //   console.log(this.serviceList);

  // });
  ngOnInit() {
    this.serviceForm = this.fb.group({
      ServiceID: ['', [Validators.required]],
      DealershipName: ['', [Validators.required]],
      TeamName: ['', [Validators.required]],
      ServiceType: ['', [Validators.required]],
      ServiceStatus: ['', [Validators.required]]
  });

  this._service.getServices().subscribe(data => {

    this.serviceList = data.map(e => {
      return {
        id: e.payload.doc.id,
        isEdit: false,
        ServiceID: e.payload.doc.data()['ServiceID'],
        DealershipName: e.payload.doc.data()['DealershipName'],
        TeamName: e.payload.doc.data()['TeamName'],
        ServiceType: e.payload.doc.data()['ServiceType'],
        ServiceStatus: e.payload.doc.data()['ServiceStatus']
      };
    })
    console.log(this.serviceList);

  });




//     this._service.getService('LhV0lKeg0Cokxc0nrIDT').valueChanges()
//     .subscribe(res =>{
//     console.log(res)
//     this.serviceForm.setValue({
//       ServiceID: res['ServiceID'], 
//       DealershipName: res['DealershipName'], 
//       TeamName: res['TeamName'],
//       ServiceTypeName: res['ServiceTypeName'],
//       ServiceStatus: res['ServiceStatus']
//     })
//     });
  
//     this.serviceForm = this.fb.group({
//       ServiceID: ['', [Validators.required]],
//       DealershipName: ['', [Validators.required]],
//       TeamName: ['', [Validators.required]],
//       ServiceTypeName: ['', [Validators.required]],
//       ServiceStatus: ['', [Validators.required]]
//   });
// }
//   openDetailsWithState() {
//     let navigationExtras: NavigationExtras = {
//       state: {
//         id: 'LhV0lKeg0Cokxc0nrIDT'
//       }
//     };
//     this.router.navigate(['tabs/edit/vehicle'], navigationExtras);
//   }



  }}