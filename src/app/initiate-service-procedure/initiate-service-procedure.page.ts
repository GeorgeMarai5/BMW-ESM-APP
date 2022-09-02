import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router,Route } from '@angular/router';
import { PostService } from '../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Dealership } from '../models/Dealership';
import { Fleet } from '../models/fleet';
import { Team } from '../models/Team';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-initiate-service-procedure',
  templateUrl: './initiate-service-procedure.page.html',
  styleUrls: ['./initiate-service-procedure.page.scss'],
})

export class InitiateServiceProcedurePage implements OnInit {

  serviceList = [];
  dealership: Dealership;
  fleet: Fleet;
  team: Team;
  initiateServiceForm : FormGroup;
  myService: any;

  constructor(public vehicleService: VehicleService , private zone: NgZone, private toastCtrl: ToastController, private service: PostService, 
    public fb: FormBuilder,private router: Router, private route: ActivatedRoute, public authService: AuthService, 
    private firestore: AngularFirestore) { 
      this.vehicleService = {} as VehicleService;

      this.initiateServiceForm = new FormGroup({
        dealership: new FormControl('', Validators.required),
        fleet: new FormControl('', Validators.required),
        team: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required)
      });
    }

  ngOnInit() {
    
  }

  InitiateService() {
    console.log(this.initiateServiceForm.value);
    this.myService.intiateService(this.initiateServiceForm.value).then(resp => {
      this.initiateServiceForm.reset();
      this.presentToast();
    })
      .catch(error => {
        console.log(error);
      });
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Service initiated successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}
