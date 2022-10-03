import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TeamService } from '../services/team.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Team } from '../models/team';
import { Observable } from 'rxjs';
import { TeamType } from 'app/models/TeamType';
import { TeamTypeService } from 'app/services/teamtype.service';
import { DealershipService } from 'app/services/dealership.service';
import { Dealership } from 'app/models/Dealership';
import { CreateTeamHelpComponent } from 'app/components/create-team-help/create-team-help.component';
@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.page.html',
  styleUrls: ['./create-team.page.scss'],
})
export class CreateTeamPage implements OnInit {

  isSubmitted = false;
  TeamList = [];
  createTeamForm: FormGroup;
  team: Team;  
  dealership: Dealership;
  teamType: TeamType;
  data: any;

  constructor(public authService: AuthService, 
    public fb: FormBuilder, 
    private teamService: TeamService, 
    private dealershipService: DealershipService,
    private teamtypeService: TeamTypeService,
    public router: Router,
    public route: ActivatedRoute, 
    public toastCtrl: ToastController,
    public helpModal: ModalController) 
    {  
      teamService = {} as TeamService;
      dealershipService = {} as DealershipService;
      teamtypeService = {} as TeamTypeService;
    }

  submitForm(){
    this.teamService.createTeam(this.data).subscribe(response => {
      console.log(response);
    });
  
    this.presentToast();
  }

  async getDealership(){

    this.dealershipService.getDealershipList().subscribe(response => {
      console.log(response);
      this.data = response;
  
    });
  }

  async showHelp(){
    const modal = await this.helpModal.create({
      component: CreateTeamHelpComponent});
      return await modal.present();
  }
  
  async getTeamType(){
  
    this.teamtypeService.getTeamTypeList().subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }
  
  async create(){

    this.teamService.createTeam(this.data).subscribe(response => {
      console.log(response);
    });
  
    this.presentToast();
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

    this.getDealership();
    this.getTeamType();

  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Team has been successfully created.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  get errorControl() {
    return this.createTeamForm.controls;
  }
  
}