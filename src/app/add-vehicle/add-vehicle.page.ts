import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { AddVehicleHelpComponent } from 'app/components/add-vehicle-help/add-vehicle-help.component';
import { Vehicle } from 'app/models/Vehicle';
import { AuthService } from '../services/auth.service';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.page.html',
  styleUrls: ['./add-vehicle.page.scss'],
})

export class AddVehiclePage implements OnInit {

  models = [];
  plans = [];
  addVehicleForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, 
    public service: VehicleService, public router: Router, public toastCtrl: ToastController, public helpModal: ModalController) { 
    
      service = {} as VehicleService;
      this.data = new Vehicle();
    /*
    this.route.params.subscribe(params => {
      this.data = params['id'];
    });
    this.addVehicleForm = new FormGroup({
      VINNum: new FormControl('', [Validators.required, Validators.min(17), Validators.max(17)]),
      vehicleModel: new FormControl('', Validators.required),
      Registration: new FormControl('', Validators.required),
      warrantyPlan: new FormControl('', Validators.required)
    })
    */
  }

  submitForm() {
    //
  }

  async showHelp(){
    const modal = await this.helpModal.create({
      component: AddVehicleHelpComponent});
      return await modal.present();
  }
  

  async create(){
    this.service.createVehicle(this.data).subscribe(response => {
      console.log(response);
      //this.router.navigate(['student-list']);
    });
  
    this.presentToast();
  }

  ngOnInit() {
    //if(this.authService.isLoggedIn){
    //  return true;
    //}
    //else{
    //  this.router.navigate(['/tabs/login']);
    //}

    //this.addVehicleForm.setValue({VINNum: '', vehicleModel: '', Registration: '', warrantyPlan: ''});
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'A new vehicle has been added to the fleet.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}