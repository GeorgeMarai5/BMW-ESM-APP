import { Component, OnInit,ElementRef, Input, Output, NgZone } from '@angular/core';
import { FormBuilder,Validators,FormGroup, AnyForUntypedForms } from '@angular/forms';
import { AngularDelegate } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router,Route } from '@angular/router';
import { PostService } from '../services/post.service';
import { getApp } from 'firebase/app';
import { getFirestore, collection,onSnapshot, addDoc, doc,setDoc, QuerySnapshot } from 'firebase/firestore'
import { ActivatedRoute } from '@angular/router';
import { snapshotChanges } from '@angular/fire/compat/database';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Dealership } from '../models/Dealership';
import { Fleet } from '../models/fleet';
import { Team } from '../models/Team';
import { Service } from '../services/service.service';
import { VehicleService } from '../services/vehicle.service';
import { getAuth } from "firebase/auth";

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

  constructor(public vehicleService: VehicleService , private zone: NgZone,private toastCtrl: ToastController,private service: PostService, 
    public fb: FormBuilder,private router: Router, private route: ActivatedRoute, public authService: AuthService, private firestore: AngularFirestore) { 
      this.vehicleService = {} as VehicleService;
    }

    ngOnInit() {
      this.serviceForm = this.fb.group({
        DealershipName: ['', [Validators.required]],
        FleetName: ['', [Validators.required]],
        TeamName: ['', [Validators.required]],
        date: ['', [Validators.required]],
      })
      const auth = getAuth();
      const currService = auth.current.sid;
    }
  
    InitiateService() {
      console.log(this.serviceForm.value);
      this.myService.intiateService(this.serviceForm.value).then(resp => {
        this.serviceForm.reset();
        alert("A new service has been initiated successfully.")
      })
        .catch(error => {
          console.log(error);
        });
    }
}
