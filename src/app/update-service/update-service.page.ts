import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Service } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
  editserviceForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, 
    public fb: FormBuilder, 
    public authService: AuthService, 
    public _service: Service,
    public router: Router, 
    public toastCtrl: ToastController) {
      
      this.route.params.subscribe(params => {
          this.data = params.id;
      });
      this.editserviceForm = new FormGroup({
        DealershipName: new FormControl('', Validators.required),
        TeamName: new FormControl('', Validators.required),
        ServiceTypeName: new FormControl('', Validators.required)
      });

  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.editserviceForm.valid){
      return false;
    }
    else{
      const service = {
        DealershipName: this.editserviceForm.get('DealershipName').value,
        TeamName: this.editserviceForm.get('TeamName').value,
        ServiceTypeName: this.editserviceForm.get('ServiceTypeName').value
      }
      this._service.updateService(this.data, service)
      this.presentToast();
    }
    this.router.navigate(['/tabs/view/service', this.data]);
  }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }

    /*this.service.getItem(this.data)
    .subscribe(res =>{
    console.log(res)
    this.editserviceForm.setValue({
      partName: res['PartName'],
      partType: res['PartType'], 
      Description: res['Description'], 
      partStock: res['PartInStock']
    })
    });*/
  }

  back(){
    this.router.navigate(['tabs/view/service', this.data]);
  }

  get errorControl() {
    return this.editserviceForm.controls;
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
