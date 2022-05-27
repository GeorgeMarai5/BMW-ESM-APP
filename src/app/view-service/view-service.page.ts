import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { Service } from '../services/service.service';



interface ServiceData {
  ServiceID: number;
}

// interface FleetVehicles{
//   VehicleID: number;
//   VinNumber: string;
//   ModelName: string;
//   Year: string;
// }


@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.page.html',
  styleUrls: ['./view-service.page.scss'],
})
export class ViewServicePage implements OnInit {

   serviceList = [];
   serviceData: ServiceData;
   serviceForm: FormGroup;

  constructor(public authService: AuthService,public fb: FormBuilder, private _service: Service) { 
    this.serviceData = {} as ServiceData;
  }
  ngOnInit() {

    this.serviceForm = this.fb.group({
      VehicleID: ['', [Validators.required]],
      VinNumber: ['', [Validators.required]],
      ModelName: ['', [Validators.required]],
      Year: ['', [Validators.required]],
  });


  // this._service.getService().subscribe(data => {

  //   this.serviceList = data.map(e => {
  //     return {
  //       id: e.payload.doc.id,
  //       isEdit: false,
  //       FleetID: e.payload.doc.data()['FleetID'],
  //       FleetVehicleQty: e.payload.doc.data()['FleetVehicleQty'],
  //       FleetName: e.payload.doc.data()['FleetName'],
  //       FleetLocation: e.payload.doc.data()['FleetLocation']
  //     };
  //   })
  //   console.log(this.serviceList);

  // });


}
RemoveService(ID) {
  if (window.confirm('Do you really want to Remove This Fleet?')) {
   
  
  this._service.deleteService(ID);
  }
  console.log(ID)
}

}
