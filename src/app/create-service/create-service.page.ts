import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DatePipe } from '@angular/common';
import { ModalController, ToastController } from '@ionic/angular';
import { TeamService } from '../services/team.service';
import { VehicleService } from 'app/models/VehicleService';
import { Team } from 'app/models/Team';
import { ServiceType } from 'app/models/ServiceType';
import { CreateServiceHelpComponent } from 'app/components/create-service-help/create-service-help.component';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.page.html',
  styleUrls: ['./create-service.page.scss'],
})
export class CreateServicePage implements OnInit {

  services: VehicleService;
  serviceList = [];
  teams = [];
  serviceTypes = [];
  serviceForm: FormGroup;
  searchTerm: string;
  deleteModal: HTMLElement;
  //isSubmitted = false;
  data: any;
  TeamData:any;
  //today = new Date();
  id :any;
  //pipe = new DatePipe('en-US');
  team: Team;
  type: ServiceType;
/*
  changeFormat(today){
    let ChangedFormat = this.pipe.transform(this.today, 'dd/MM/YYYY');
    console.log(this.today);
  }
  */

  constructor(private route: ActivatedRoute, 
    public router: Router, 
    public firestore: AngularFirestore, 
    public authService: AuthService, 
    public fb: FormBuilder, 
    private service: ServiceService, 
    public toastCtrl: ToastController, 
    private teamservice: TeamService,
    public helpModal: ModalController) {

      //service = {} as ServiceService;
      //this.data = new VehicleService();
      teamservice = {} as TeamService;
      this.type = new ServiceType();
      this.team = new Team();
    /*  
    this.route.params.subscribe(params => {
      this.data = params.id;
    }); 
    this.serviceForm = new FormGroup({
      TeamName: new FormControl('', [Validators.required]),
      ServiceTypeName: new FormControl('', Validators.required)
    });
    */  
   }
  
  submitForm(){
/*
    this.service.createService(this.data).subscribe(response => {
      console.log(response);
      //this.router.navigate(['student-list']);
    });
  
    this.presentToast(); 
    */
  }

  ngOnInit() {

    /*
   
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
*/
    
this.getTeam();

this.getType();
    
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
      component: CreateServiceHelpComponent});
      return await modal.present();
  }

async getTeam(){

  this.teamservice.getTeamList().subscribe(response => {
    console.log(response);
    this.TeamData = response;

  });

}

async getType(){

  this.teamservice.getServiceTypeList().subscribe(response => {
    console.log(response);
    this.data = response;
  })
}


async createservice(){




}





  get errorControl() {
    return this.serviceForm.controls;
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'A service has been created successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}