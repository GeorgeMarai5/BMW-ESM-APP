import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router,Route } from '@angular/router';
import { PostService } from '../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Dealership } from '../models/Dealership';
import { Fleet } from '../models/fleet';
import { Team } from '../models/Team';
import { VehicleService } from '../services/vehicle.service';
import{FleetService} from '../services/fleet.service';
import { TeamService } from '../services/team.service';
import { DealershipService } from '../services/dealership.service';





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
  initiateServiceForm : FormGroup;
  myService: any;
  data:any;
  fle:any;
  de:any;

  constructor(public vehicleService: VehicleService , private zone: NgZone, private toastCtrl: ToastController, private service: PostService, 
    public fb: FormBuilder,private router: Router, private route: ActivatedRoute, public authService: AuthService, 
    private firestore: AngularFirestore,private fleetservice: FleetService,private teamservice: TeamService,private dealershipservice: DealershipService) { 
      vehicleService = {} as VehicleService;
      fleetservice= {} as FleetService;
      teamservice= {} as TeamService;
      dealershipservice= {} as DealershipService;

      //this.data = new Team();

    }

/*

      this.initiateServiceForm = new FormGroup({
        dealership: new FormControl(''),
        fleet: new FormControl(''),
        team: new FormControl(''),
        date: new FormControl('')
      });
    }
*/




  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }



    this.dealershipservice.getDealershipList().subscribe(response => {
      console.log(response);
      this.de = response;
    })
    
this.getFleet();
//this.getDealership();
this.getTeam();

  }

  InitiateService() {
    console.log(this.initiateServiceForm.value);
    this.myService.intiateService(this.initiateServiceForm.value).then(resp => {
      this.initiateServiceForm.reset();
      this.presentToast();
    })
      .catch(error => {
        console.log(error);
      });
  }


async getFleet(){
  this.fleetservice.getFleetList().subscribe(response => {
    console.log(response);
    this.fle = response;
  })

}



async getDealership(){

  this.dealershipservice.getDealershipList().subscribe(response => {
    console.log(response);
    this.de = response;
  })


}

async getTeam(){

  this.teamservice.getTeamList().subscribe(response => {
    console.log(response);
    this.data = response;
  })

}















  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Service initiated successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}
