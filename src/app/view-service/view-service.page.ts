import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import { Service } from '../services/service.service'
import { AngularFirestore } from '@angular/fire/compat/firestore';




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
   isSubmitted = false;
  constructor(public authService: AuthService,public fb: FormBuilder, private _service: Service, public firestore: AngularFirestore) { 
    this.serviceData = {} as ServiceData;
  }
  ngOnInit() {
    this.serviceForm = this.fb.group({
      ServiceID: ['', [Validators.required]],
      DealershipName: ['', [Validators.required]],
      TeamName: ['', [Validators.required]],
      ServiceType: ['', [Validators.required]],
      ServiceStatus: ['', [Validators.required]],
  });

  this._service.getServices().subscribe(data => {
    this.serviceList = data.map(e => {

      return {
        id: e.payload.doc.id,
        ServiceID: e.payload.doc.data()['ServiceID'],
        DealershipName: e.payload.doc.data()['DealershipName'],
        TeamName: e.payload.doc.data()['TeamName'],
        ServiceType: e.payload.doc.data()['ServiceType'],
        ServiceStatus: e.payload.doc.data()['ServiceStatus'],
  
      };
    })
    console.log(this.serviceList);

  });
  }
  submitForm(){
    this.isSubmitted = true;
    if(!this.serviceForm.valid){
      return false;
    }
    else{
        const service = {
          ServiceID: this.serviceForm.get('ServiceID').value,
          DealershipName: this.serviceForm.get('DealershipName').value,
          TeamName: this.serviceForm.get('TeamName').value,
          ServiceType: this.serviceForm.get('ServiceType').value,
          ServiceStatus: this.serviceForm.get('ServiceStatus').value
        }
        this.firestore.collection('Service').add(service).then(function(){
          alert("New service created successfully");
        });
      }
     
  }
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

  get errorControl() {
    return this.serviceForm.controls;
  }
}
