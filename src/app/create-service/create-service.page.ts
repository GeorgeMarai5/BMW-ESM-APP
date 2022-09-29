import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DatePipe } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { TeamService } from '../services/team.service';
import { VehicleService } from 'app/models/VehicleService';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.page.html',
  styleUrls: ['./create-service.page.scss'],
})
export class CreateServicePage implements OnInit {

  services: VehicleService;
  service: ServiceService;
  serviceList = [];
  teams = [];
  serviceTypes = [];
  serviceForm: FormGroup;
  searchTerm: string;
  deleteModal: HTMLElement;
  isSubmitted = false;
  data: any;
  today = new Date();
  id :any;
  pipe = new DatePipe('en-US');

  changeFormat(today){
    let ChangedFormat = this.pipe.transform(this.today, 'dd/MM/YYYY');
    console.log(this.today);
  }

  constructor(private route: ActivatedRoute, 
    public router: Router, 
    public firestore: AngularFirestore, 
    public authService: AuthService, 
    public fb: FormBuilder, 
    private _service: ServiceService, 
    public toastCtrl: ToastController, 
    private teamservice: TeamService) {

      _service = {} as ServiceService;
      this.data = new VehicleService();
    /*  
    this.route.params.subscribe(params => {
      this.data = params.id;
    }); 
    this.serviceForm = new FormGroup({
      TeamName: new FormControl('', [Validators.required]),
      ServiceTypeName: new FormControl('', Validators.required)
    });
    */  
   }
  
  submitForm(){
/*
    this.service.createService(this.data).subscribe(response => {
      console.log(response);
      //this.router.navigate(['student-list']);
    });
  
    this.presentToast(); 
    */
  }

  ngOnInit() {
    /*
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }

    this.teamservice.getServiceType(this.id).subscribe(response => {
      console.log(response);
      this.data = response;
    })

    this.teamservice.getTeamList().subscribe(response => {
      console.log(response);
      this.data = response;

    })

    //this.serviceForm.setValue({TeamName: '', ServiceTypeName: ''});
    */
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