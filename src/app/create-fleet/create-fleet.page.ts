import { Component, OnInit,NgZone } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import{FleetService} from '../services/fleet.service';
import { ToastController } from '@ionic/angular';

interface FleetData {
  FleetName: string;
  FleetLocation: string;
  
}

@Component({
  selector: 'app-create-fleet',
  templateUrl: './create-fleet.page.html',
  styleUrls: ['./create-fleet.page.scss'],
})
export class CreateFleetPage implements OnInit {

  //studentList = [];
  fleetData: FleetData;
  addFleetForm: FormGroup;
  isSubmitted = false;
  data: any;
  
  constructor (public authService: AuthService, public fb: FormBuilder, private fleetservice: FleetService, public toastCtrl: ToastController) {

    this.fleetData = {} as FleetData;
  
  }

  ngOnInit() {

  }

}

























/*
 this.addFleetForm = this.fb.group({
      FleetName: ['', [Validators.required]],
      FleetLocation: ['', [Validators.required]],
    });
  }

  submit() {
    this.isSubmitted = true;
    if(!this.addFleetForm.valid){
      return false;
    }
    else{
      console.log(this.addFleetForm.value);
      this.fleetservice.create_Fleet(this.addFleetForm.value).then(resp => {
        this.addFleetForm.reset();
        this.presentToast();
      }).catch(error => {
      
        console.log(error);
        });
    }
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'The fleet has been created successfully',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }

  get errorControl() {
    return this.addFleetForm.controls;
  }
}





*/







