import { Component, OnInit,NgZone } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import{FleetService} from '../services/fleet.service';
import { ToastController } from '@ionic/angular';
import { Fleet } from '../models/Fleet';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-fleet',
  templateUrl: './create-fleet.page.html',
  styleUrls: ['./create-fleet.page.scss'],
})


export class CreateFleetPage implements OnInit {

  addFleetForm: FormGroup;
  isSubmitted = false;
  data: any;
  fleet: Fleet;

  constructor (private route: ActivatedRoute, 
    public router: Router, 
    public authService: AuthService, 
    public fb: FormBuilder, 
    private fleetservice: FleetService, 
    public toastCtrl: ToastController) {

    this.route.params.subscribe(params => {
      this.data = params.id;
    });
    this.addFleetForm = new FormGroup({
      FleetName: new FormControl('', Validators.required),
      FleetLocation: new FormControl('', Validators.required)
    }); 

  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.addFleetForm.valid){
      return false;
    }
    else{
        const fleet = {
          FleetName: this.addFleetForm.get('FleetName').value,
          FleetLocation: this.addFleetForm.get('FleetLocation').value
        }
        //this.fleetservice.updateItem(this.data, fleet)
        this.presentToast()
      }
      this.router.navigate(['/tabs/search/vehicle', this.data]);
  }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
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