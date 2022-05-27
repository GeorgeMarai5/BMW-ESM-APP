import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Service } from '../services/service.service';
interface ServiceData {
  DealershipName: string;
  TeamName: string;
  ServiceTypeName: string;
  
}
@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.page.html',
  styleUrls: ['./update-service.page.scss'],
})


export class UpdateServicePage implements OnInit {
  
  updateServiceForm: FormGroup;
  isSubmitted = false;
  serviceList = [];
  serviceData: ServiceData;

  constructor(public fb: FormBuilder, public authService: AuthService, private _service: Service) {
    this.updateServiceForm = new FormGroup({
      DealershipName: new FormControl('', Validators.required),
      TeamName: new FormControl('', Validators.required),
      ServiceTypeName: new FormControl('', Validators.required)
    });
    this.serviceData = {} as ServiceData;
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.updateServiceForm.valid){
      return false;
    }
    else{
      console.log(this.updateServiceForm.value);
    }
    return false;
  }

  ngOnInit() {
    this.updateServiceForm.setValue({DealershipName: '', TeamName: '', ServiceTypeName: ''});
    this.updateServiceForm = this.fb.group({
      DealershipName: ['', [Validators.required]],
      TeamName: ['', [Validators.required]],
      ServiceTypeName: ['', [Validators.required]]
    })

  
  this._service.readService().subscribe(data => {

    this.serviceList = data.map(e => {
      return {
        id: e.payload.doc.id,
        isEdit: false,
        DealershipName: e.payload.doc.data()['DealershipName'],
        TeamName: e.payload.doc.data()['TeamName'],
        ServiceTypeName: e.payload.doc.data()['ServiceTypeName'],

      };
    })
    console.log(this.serviceList);

  });
  }

  get errorControl() {
    return this.updateServiceForm.controls;
  }
 

UpdateService(Service) {
  let ServiceID = {};
  Service['DealershipName'] = Service.DealershipName;
  Service['TeamName'] = Service.TeamName; 
  Service['ServiceTypeName'] = Service.ServiceTypeName; 
  this._service.updateService(Service.id,Service);
  console.log(Service,"Successfully Updated")
  alert("Service has been updated accordingly.")
}
  }
