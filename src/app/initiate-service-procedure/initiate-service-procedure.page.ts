import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
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
  serviceForm : FormGroup;
  myService: any;

  constructor(public vehicleService: VehicleService , private zone: NgZone, private toastCtrl: ToastController, private service: PostService, 
    public fb: FormBuilder,private router: Router, private route: ActivatedRoute, public authService: AuthService, 
    private firestore: AngularFirestore) { 
      this.vehicleService = {} as VehicleService;
    }

  ngOnInit() {
    this.serviceForm = this.fb.group({
      DealershipName: ['', [Validators.required]],
      FleetName: ['', [Validators.required]],
      TeamName: ['', [Validators.required]],
      date: ['', [Validators.required]],
    })
  }

  InitiateService() {
    console.log(this.serviceForm.value);
    this.myService.intiateService(this.serviceForm.value).then(resp => {
      this.serviceForm.reset();
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
