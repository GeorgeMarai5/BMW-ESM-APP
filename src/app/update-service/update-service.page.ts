import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { VehicleService } from 'app/models/VehicleService';
import { UpdateServiceHelpComponent } from 'app/components/update-service-help/update-service-help.component';
import { DealershipService } from 'app/services/dealership.service';
import { TeamService } from 'app/services/team.service';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.page.html',
  styleUrls: ['./update-service.page.scss'],
})

export class UpdateServicePage implements OnInit {

  dealerships = [];
  teams = [];
  serviceTypes = [];
  service: VehicleService;
  editserviceForm: FormGroup;
  isSubmitted = false;
  data: any;
  id: any;
  deal:any;
  team:any;
  type:any;

  constructor(private activatedRoute: ActivatedRoute, 
    public fb: FormBuilder, 
    public authService: AuthService, 
    public _service: ServiceService,
    public router: Router, 
    public toastCtrl: ToastController,
    public helpModal: ModalController,private dealershipservice: DealershipService, private teamService: TeamService) {
    
      _service = {} as ServiceService;
      dealershipservice = {} as DealershipService;
      teamService = {} as  TeamService;
      this.service = new VehicleService();
  
      this.activatedRoute.params.subscribe(params => {
        this.id = params.id;
    });

  }

  async showHelp(){
    const modal = await this.helpModal.create({
      component: UpdateServiceHelpComponent});
      return await modal.present();
  }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
    
this.getDealership();
this.getServicetype();
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

  async updateService(id, data){

    this._service.updateService(this.id,this.data).subscribe(response => {
      console.log(response);
    })
    this.router.navigate(['/tabs/view/service', this.data]);
    await this.presentToast();
  }



getDealership(){

  this.dealershipservice.getDealershipList().subscribe(response => {
    console.log(response);
    this.deal = response;
  })

}


getTeam(){
  this.teamService.getTeamList().subscribe(response => {
    console.log(response);
    this.team = response;
  })

}


getServicetype(){
  this._service.getServiceTypeList().subscribe(response => {
    console.log(response);
    this.type = response;
  })


}



  back(){
    this.router.navigate(['tabs/view/service', this.data]);
  }

  get errorControl() {
    return this.editserviceForm.controls;
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Service has been updated successfully.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
