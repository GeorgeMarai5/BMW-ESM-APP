import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import{Service} from '../services/service.service';



interface ServiceData {
  ServiceID: number;
  DealershipName: string;
  TeamName: string;
  ServiceType: string;
  ServiceStatus: string;
  
}

// interface ServiceVehicles{
//   VehiID: number;
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


  this._service.readService().subscribe(data => {

    this.serviceList = data.map(e => {
      return {
        id: e.payload.doc.id,
        ServiceID: e.payload.doc.data()['ServiceID'],
        DealershipName: e.payload.doc.data()['DealershipName'],
        TeamName: e.payload.doc.data()['TeamName'],
        ServiceType: e.payload.doc.data()['ServiceType'],
        ServiceStatus: e.payload.doc.data()['ServiceStatus']
      };
    })
    console.log(this.serviceList);

  });


}
RemoveService(ID) {
  if (window.confirm('Do you really want to Remove this service?')) {
   
  
  this._service.deleteService(ID);
  }
  console.log(ID)
}

}
function id(id: string) {
  throw new Error('Function not implemented.');
}

