
import { Component, OnInit,NgZone } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import{FleetService} from '../services/fleet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { Fleets } from '../models/fleet';


interface FleetData {
  FleetName: string;
  FleetLocation: string;
  
}

@Component({
  selector: 'app-edit-fleet',
  templateUrl: './edit-fleet.page.html',
  styleUrls: ['./edit-fleet.page.scss'],
})
export class EditFleetPage implements OnInit {

  fleets: FleetData;
  fleet = {};
  editFleetForm: FormGroup;
  isSubmitted = false;
  dat: any;
  
  data: Fleets;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, public fleetservice: FleetService, 
    public firestore: AngularFirestore, public router: Router, public toastCtrl: ToastController) {


      fleetservice = {} as FleetService;
  
      this.data = new Fleets();



  }




  ngOnInit() {


    this.fleetservice.getFleet(this.fleet).subscribe(response => {
      console.log(response);
      this.dat = response;

    })
    //this.id = this.activatedRoute.snapshot.params["id"];
    //get item details using id
    //this.fleetservice.getItem(this.fleet).subscribe(response => {
      //console.log(response);
      //this.data = response;
    //})
  }

  
  
async getFleet(item){

  this.fleetservice.getFleet(item.fleetID).subscribe(response => {
    console.log(response);
    this.dat = response;
  })

}






  update() {
    //Update item by taking id and updated data object
    this.fleetservice.updateItem(this.data).subscribe(response => {
      console.log(response)
      //this.router.navigate(['student-list']);
    })
  }

  submitForm(){
  }



  get errorControl() {
    return this.editFleetForm.controls;
  }

}






























/*
 this.isSubmitted = true;
    if(!this.fleetform.valid){
      return false;
    }
    else{
        const dealership = {
          FleetName: this.fleetform.get('FleetName').value,
          FleetLocation: this.fleetform.get('FleetLocation').value
        }
        this.fleetservice.update_Fleet(this.data,this.fleet)   //this.data, this.fleets
        this.presentToast();
      }
      this.router.navigate(['/tabs/view/fleet']);     // this.data
  }

  ngOnInit() {
    this.fleetservice.getFleet("50RmrbhJeHHNJPLLsykC").valueChanges()
    .subscribe(res =>{
    console.log(res)
    this.fleetform.setValue({
      FleetName: res['FleetName'], 
      FleetLocation: res['FleetLocation']
    })
    });
  }

  get errorControl() {
    return this.fleetform.controls;
  }

  EditFleet(Fleet) {
    Fleet.isEdit = true;
    Fleet.EditFleetName = Fleet.FleetName;
    Fleet.EditFleetLocation = Fleet.FleetLocation;
    
  }

  UpdateFleet(Fleet) {
    let FleetID = {};
    Fleet['FleetName'] = Fleet.FleetName;
    Fleet['FleetLocation'] = Fleet.FleetLocation; 
    this.fleetservice.update_Fleet(Fleet.id,Fleet);
    //Fleet.isEdit = false;
    console.log(Fleet,"successfully updated")
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Vehicle has been updated successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}




*/





