import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Service } from '../services/service.service';

import { ActivatedRoute, Router } from '@angular/router';
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

  services: Service;
  service = {};
  serviceForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, 
    public _service: Service, public firestore: AngularFirestore, public router: Router) {
      this.route.params.subscribe(params => {
          this.data = params.id;
      });
    this.serviceForm = new FormGroup({
      DealershipName: new FormControl('', Validators.required),
      TeamName: new FormControl('', Validators.required),
      ServiceTypeName: new FormControl('', Validators.required)
    })
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.serviceForm.valid){
      return false;
    }
    else{
        const service = {
          DealershipName: this.serviceForm.get('DealershipName').value,
          TeamName: this.serviceForm.get('TeamName').value,
          ServiceTypeName: this.serviceForm.get('ServiceTypeName').value
        }
        this._service.updateService(this.data, service)
        alert("Service was successfully updated.");
      }
      this.router.navigate(['/tabs/view/service', this.data]);
  }

  ngOnInit() {
    this._service.getService(this.data).valueChanges()
    .subscribe(res =>{
    console.log(res)
    this.serviceForm.setValue({
      DealershipName: res['DealershipName'], 
      TeamName: res['TeamName'],
      ServiceTypeName: res['ServiceTypeName']
    })
    });
  }

  get errorControl() {
    return this.serviceForm.controls;
  }

}
