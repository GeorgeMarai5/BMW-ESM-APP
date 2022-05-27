import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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

  constructor(public authService: AuthService,public fb: FormBuilder, private myService: Service) {
      this.serviceData = {} as ServiceData;
   }

  ngOnInit() {
    this.serviceForm = this.fb.group({
      TeamName: ['', [Validators.required]],
      ServieTypeName: ['', [Validators.required]],
    })
  }

  CreateService() {
    console.log(this.serviceForm.value);
    this.myService.createService(this.serviceForm.value).then(resp => {
      this.serviceForm.reset();
      alert("A new service has been created successfully.")
    })
      .catch(error => {
        console.log(error);
      });
  }
}
