import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Service } from '../services/service.service';

interface ServiceData {
  TeamName: string;
  ServiceTypeName: string;
  
}

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.page.html',
  styleUrls: ['./create-service.page.scss'],
})
export class CreateServicePage implements OnInit {

  serviceData: ServiceData;
  serviceForm: FormGroup;

  constructor(public authService: AuthService, public fb: FormBuilder, private _service: Service) {
      this.serviceData = {} as ServiceData;
      this.serviceForm = new FormGroup({
        TeamName: new FormControl(),
        ServiceTypeName: new FormControl()
      });
   }

  ngOnInit() {
    this.serviceForm = this.fb.group({
      TeamName: ['', [Validators.required]],
      ServiceTypeName: ['', [Validators.required]],
    })
    // const auth = getAuth();
    // const currUser = auth.current.uid;
  }


  CreateService() {
    console.log(this.serviceForm.value);
    this._service.createService(this.serviceForm.value).then(resp => {
      this.serviceForm.reset();
      alert("A new service has been created successfully.")
    })
      .catch(error => {
        console.log(error);
      });
  }
}
