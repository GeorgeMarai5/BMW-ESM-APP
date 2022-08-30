import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Service } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DatePipe } from '@angular/common';
import { ToastController } from '@ionic/angular';

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

  services: Service;
  serviceList = [];
  teams = [];
  serviceTypes = [];
  serviceForm: FormGroup;
  searchTerm: string;
  deleteModal: HTMLElement;
  isSubmitted = false;
  data: any;

  today = new Date();

  pipe = new DatePipe('en-US');
  changeFormat(today){
    let ChangedFormat = this.pipe.transform(this.today, 'dd/MM/YYYY');
  
    console.log(this.today);
  }
  constructor(private route: ActivatedRoute, public router: Router, public firestore: AngularFirestore, public authService: AuthService, 
    public fb: FormBuilder, private service: Service, public toastCtrl: ToastController) {
    this.route.params.subscribe(params => {
      
    });

    this.serviceForm = new FormGroup({
      TeamName: new FormControl('', [Validators.required]),
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
        TeamName: this.serviceForm.get('TeamName').value,
        ServiceTypeName: this.serviceForm.get('ServiceTypeName').value
      }
      
      console.log(service)
      this.firestore.collection('Service').add(service).then(function(docRef){
        this.presentToast();
        const serviceID = {
          serviceID: docRef.id
        } 
      });
      this.router.navigate(['/tabs/assign/dealership', '5KhjLkr2TKc0LYc2pQ4v']);
    }
  }

  ngOnInit() {
    this.serviceForm.setValue({TeamName: '', ServiceTypeName: ''});
  }

  get errorControl() {
    return this.serviceForm.controls;
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'A service has been created successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}
