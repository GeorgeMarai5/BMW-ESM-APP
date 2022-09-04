import { Component, OnInit,NgZone } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import{FleetService} from '../services/fleet.service';
import { ToastController } from '@ionic/angular';
import { Fleet, Fleets } from '../models/Fleet';




//interface FleetData {
//  FleetName: string;
 // FleetLocation: string;
  
//}

@Component({
  selector: 'app-create-fleet',
  templateUrl: './create-fleet.page.html',
  styleUrls: ['./create-fleet.page.scss'],
})


export class CreateFleetPage implements OnInit {

  //studentList = [];
  
  addFleetForm: FormGroup;
  isSubmitted = false;
  //data: any;
  data: Fleets;
  constructor (public authService: AuthService, public fb: FormBuilder, private fleetservice: FleetService, public toastCtrl: ToastController) {

    fleetservice = {} as FleetService;
    this.data = new Fleets();
  }

  ngOnInit() {

  }

  create(){

  
    this.fleetservice.AddFleet(this.data).subscribe(response => {
      console.log(response);
      //this.router.navigate(['student-list']);
    });


}

get errorControl() {
  return this.addFleetForm.controls;
}



async presentToast() {
  let toast = await this.toastCtrl.create({
    message: 'The fleet has been created successfully',
    duration: 3000,
    position: 'top'
  });

  toast.present();
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







