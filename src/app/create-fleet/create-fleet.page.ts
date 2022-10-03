import { Component, OnInit,NgZone } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import{FleetService} from '../services/fleet.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Fleet } from '../models/Fleet';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateFleetHelpComponent } from 'app/components/create-fleet-help/create-fleet-help.component';

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
    public toastCtrl: ToastController,
    public helpModal: ModalController) {



      fleetservice = {} as FleetService;
      //this.data = new Fleet();
      this.data = new Fleet();

   // this.route.params.subscribe(params => {
    //  this.data = params.id;
   // });
    //this.addFleetForm = new FormGroup({
      //fleetName: new FormControl('', Validators.required),
      //fleetLocation: new FormControl('', Validators.required)
    //}); 

  
  }

  /*submitForm(){
    this.isSubmitted = true;
    if(!this.addFleetForm.valid){
      return false;
    }
    else{
        const fleet = {
          fleetName: this.addFleetForm.get('fleetName').value,
          fleetID: this.addFleetForm.get('fleetID').value,
          vehicleAmount: this.addFleetForm.get('vehicleAmount').value,
          fleetLocation: this.addFleetForm.get('fleetLocation').value
        }
        this.fleetservice.createFleet(fleet);
        console.log(fleet);
        this.presentToast()
      }
      this.router.navigate(['/tabs/search/vehicle']);
  }
  */

  async showHelp(){
    const modal = await this.helpModal.create({
      component: CreateFleetHelpComponent});
      return await modal.present();
  }

  async create(){

  this.fleetservice.createFleet(this.data).subscribe(response => {
    console.log(response);
    //this.router.navigate(['student-list']);
  });

  this.presentToast();

}


  ngOnInit() {
    /*if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
    */

    var coll = document.getElementsByClassName("collapsible");
    var i;
    let up = document.getElementById('up');
    let down = document.getElementById('down');

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
          down.style.display = "none";
          up.style.display = "block";
        } else {
          content.style.display = "block";
          up.style.display = "none";
          down.style.display = "block";
        }
      });
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