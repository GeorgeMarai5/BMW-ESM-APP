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
    private firestore: AngularFirestore,
    private fleetservice: FleetService,private teamservice: TeamService,
    private dealershipservice: DealershipService,public activatedRoute: ActivatedRoute)
    
    { 
      vehicleService = {} as VehicleService;
      this.fleetservice= {} as FleetService;
      this.teamservice= {} as TeamService;
      this.dealershipservice= {} as DealershipService;


      this.activatedRoute.params.subscribe(params => {
        this.fle = params.id;
    });

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
   
    
    this.fleetservice.getFleet(this.fle).subscribe(response => {
      console.log(response);
      this.fle = response;
    })


this.getDealership();
this.getTeam();

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

 


async getFleet(item){
 
    this.fleetservice.getFleet(item.FleetID).subscribe(response => {
      console.log(response);
      this.data = response;

    });

}



async getDealership(){

  this.dealershipservice.getDealershipList().subscribe(response => {
    console.log(response);
    this.de = response;
  });


}

async getTeam(){

  this.teamservice.getTeamList().subscribe(response => {
    console.log(response);
    this.data = response;
  });

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
