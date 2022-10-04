import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import{FleetService} from '../services/fleet.service';
import { VehicleService } from '../services/vehicle.service';
import { AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Fleet } from '../models/fleet';


@Component({
  selector: 'app-view-fleet',
  templateUrl: './view-fleet.page.html',
  styleUrls: ['./view-fleet.page.scss'],
})
export class ViewFleetPage implements OnInit {

   
   
   fleetForm: FormGroup;
   searchTerm: string;
   fleetID: string;
   id: any;
   data: any;
   //combinedArray: { dat: any, data: any }[] = [];

  constructor(public authService: AuthService, public fb: FormBuilder, private fleetservice: FleetService, private vehiclesService: VehicleService,
    public alertCtrl: AlertController, public router: Router, public vehicleservice: VehicleService, public toastCtrl: ToastController,
    public activatedRoute: ActivatedRoute) { 

    vehicleservice = {} as VehicleService;
    fleetservice = {} as FleetService;

   // this.id = this.activatedRoute.snapshot.paramMap.get('fleetID');

    this.activatedRoute.params.subscribe(params => {
      this.data = params.id;
  });



    //this.dat = new Fleets();
    
  }

  ngOnInit() {
    
    
    this.fleetservice.getFleet(this.data).subscribe(response => {
      console.log(response);
      this.data = response;
    })

    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }

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
    
    


   
    //this.getModelAndYear();

  }

  async deleteVehicles(item){



    

      //Delete item in Student data
      this.vehicleservice.deleteVehicle(item.vehicleID).subscribe(Response => {
        //Update list after delete is successful
        console.log(Response);
        //this.getallFleets()

      });
    }


async getFleetDetails(){

  this.fleetservice.getFleetList().subscribe(response => {
    console.log(response);
    this.data = response;
  })



}
  


  async getVin(){

    this.vehicleservice.getVehicleList().subscribe(response => {
      console.log(response);
      this.data = response;
    
    })

    // this.vehicleservice.getListModelAndYear().subscribe(res => {
    //   console.log(res);
    //   this.dat = res;
    // })
  


    
  }

  // async getModelAndYear(){

  //   this.vehicleservice.getListModelAndYear().subscribe(response => {
  //     console.log(response);
  //     this.dat = response;
  //   })
  // }



  async Get(item){
    this.fleetservice.getFleet(item.FleetID).subscribe(response => {
      console.log(response);
      this.data = response;

    })



  }

  async checkIn(){


    let toast = await this.toastCtrl.create({
      message: 'Vehicle has been successfully checked in.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();

  }


  


  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Fleet has been removed successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }

  select(){

  }


}






















/*
 this.fleetForm = this.fb.group({
      VehicleID: ['', [Validators.required]],
      VinNumber: ['', [Validators.required]],
      ModelName: ['', [Validators.required]],
      Year: ['', [Validators.required]],
    });

    this.vehiclesService.getVehicles().subscribe(data => {
      this.vehicleList = data.map(e => {
        let yearCode: string;
        yearCode = e.payload.doc.data()['VIN_Number'];
        return {
          id: e.payload.doc.id,
          isEdit: false,
          VehicleID: e.payload.doc.data()['VehicleID'],
          VinNumber: e.payload.doc.data()['VIN_Number'],
          ModelName: e.payload.doc.data()['VehicleModel'],
          Year: this.vehicleService.getYear(yearCode.substring(9, 10))
        };
      });

      console.log(this.vehicleList);

    });
  }

  RemoveFleet(ID) {
    if (window.confirm('Do you really want to Remove This Fleet?')) {
      this.vehiclesService.deleteVehicle(ID);
    }

    console.log(ID)
  }

  async Deletefleet(id){
    const confirmDeleteAlert = await this.alertCtrl.create({
      header: 'Remove Fleet',
      message: 'Are you sure you would like to remove this Fleet from the system?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: end => {
          this.alertCtrl.dismiss();
        }
      },
      {
        text: 'Remove',
        role: 'remove',
        handler: () => {
          this.fleetservice.delete_Fleet(id);
          this.presentToast();
        }
      }]
    });

    confirmDeleteAlert.present();

  }

  navToUpdate() {
    this.router.navigate(['/tabs/edit/fleet', this.data]);
  }

  select(){
    if(window.confirm('Fleet selected')){
      
    }
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Fleet has been removed successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}





*/