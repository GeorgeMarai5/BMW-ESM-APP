
import { Component, OnInit,NgZone } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FleetService } from '../services/fleet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController, ToastController } from '@ionic/angular';
import { Fleet } from '../models/fleet';
import { updateCurrentUser } from 'firebase/auth';
import { EditFleetHelpComponent } from 'app/components/edit-fleet-help/edit-fleet-help.component';

@Component({
  selector: 'app-edit-fleet',
  templateUrl: './edit-fleet.page.html',
  styleUrls: ['./edit-fleet.page.scss'],
})

export class EditFleetPage implements OnInit {

  //fleet = {};
  editFleetForm: FormGroup;
  isSubmitted = false;
  
  //data: Fleet;
  //id: number;

  id: any;
  data: any;
  fleet:Fleet;

  constructor(private route: ActivatedRoute, 
    public fb: FormBuilder, 
    public authService: AuthService, 
    public fleetservice: FleetService, 
    public firestore: AngularFirestore, 
    public router: Router, 
    public toastCtrl: ToastController, 
    public activatedRoute: ActivatedRoute,
    public helpModal: ModalController) {
      
      //vehicleservice = {} as VehicleService;
      fleetservice = {} as FleetService;
      this.fleet = new Fleet();
  
     // this.id = this.activatedRoute.snapshot.paramMap.get('fleetID');
  
      this.activatedRoute.params.subscribe(params => {
        this.id = params.id;
    });

  }

  submitForm() {
    
        this.presentToast();
      
    this.router.navigate(['/tabs/view/fleet', this.data]);
  }

  ngOnInit() {


    this.get();
/*
    if(this.authService.isLoggedIn){
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

async showHelp(){
  const modal = await this.helpModal.create({
    component: EditFleetHelpComponent});
    return await modal.present();
}
    
  async update(id, data){

    this.fleetservice.updatefleet(this.id,this.data).subscribe(response => {
      console.log(response);
      //this.data = response;
      //this.router.navigate(['student-list']);
      this.presentToast();
      
    })
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


async get(){
  this.fleetservice.getFleet(this.id).subscribe(response => {
    console.log(response);
    this.data = response;
  })
}




}