import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Service } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
  dealerships = [];
  teams = [];
  serviceTypes = [];
  service = {};
  serviceForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, public _service: Service, 
    public firestore: AngularFirestore, public router: Router, public toastCtrl: ToastController) {
      this.route.params.subscribe(params => {
          this.data = params.id;
      });

      this.serviceForm = new FormGroup({
        DealershipName: new FormControl('', Validators.required),
        TeamName: new FormControl('', Validators.required),
        ServiceTypeName: new FormControl('', Validators.required)
      });
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
      this.presentToast();
    }

    this.router.navigate(['/tabs/view/service', this.data]);

  }

  ngOnInit() {
    this._service.getService(this.data).valueChanges().subscribe(res =>{
      console.log(res)
      this.serviceForm.setValue({
        DealershipName: res['DealershipName'], 
        TeamName: res['TeamName'],
        ServiceTypeName: res['ServiceTypeName']
      })
    });
  }

  back(){
    this.router.navigate(['tabs/view/service', this.data]);
  }

  get errorControl() {
    return this.serviceForm.controls;
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Service has been updated successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}
