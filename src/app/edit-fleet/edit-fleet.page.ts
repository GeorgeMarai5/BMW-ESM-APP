
import { Component, OnInit,NgZone } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FleetService } from '../services/fleet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { Fleets } from '../models/fleet';

@Component({
  selector: 'app-edit-fleet',
  templateUrl: './edit-fleet.page.html',
  styleUrls: ['./edit-fleet.page.scss'],
})

export class EditFleetPage implements OnInit {

  fleet = {};
  editFleetForm: FormGroup;
  isSubmitted = false;
  data: any;
  fleets: Fleets;

  constructor(private route: ActivatedRoute, 
    public fb: FormBuilder, 
    public authService: AuthService, 
    public fleetservice: FleetService, 
    public firestore: AngularFirestore, 
    public router: Router, 
    public toastCtrl: ToastController, 
    public activatedRoute: ActivatedRoute) {
      
    this.route.params.subscribe(params => {
      this.data = params.id;
    });
    this.editFleetForm = new FormGroup({
      FleetName: new FormControl('', Validators.required),
      FleetLocation: new FormControl('', Validators.required)
    })

  }

  submitForm() {
    this.isSubmitted = true;
    if(!this.editFleetForm.valid){
      return false;
    }
    else{
        const fleet = {
          FleetName: this.editFleetForm.get('FleetName').value,
          FleetLocation: this.editFleetForm.get('FleetLocation').value
        }
        //this.fleetservice.updateItem(this.data, fleet)
        this.presentToast();
      }
    this.router.navigate(['/tabs/view/fleet', this.data]);
  }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }

    this.fleetservice.getItem(this.data)
    .subscribe(res =>{
    console.log(res)
      this.editFleetForm.setValue({
        FleetName: res['FleetName'],
        FleetLocation: res['FleetLocation']
      })
    });
  }

  back() {
    this.router.navigate(['tabs/view/fleet', this.data]);
  }

  get errorControl() {
    return this.editFleetForm.controls;
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Fleet has been updated successfully.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}