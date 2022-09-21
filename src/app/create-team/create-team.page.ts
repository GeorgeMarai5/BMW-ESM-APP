import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TeamService } from '../services/team.service';
import { ToastController } from '@ionic/angular';
import { Team } from '../models/team';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.page.html',
  styleUrls: ['./create-team.page.scss'],
})
export class CreateTeamPage implements OnInit {

  isSubmitted = false;
  teamTypes = [];
  TeamList = [];
  dealerships = [];
  createTeamForm: FormGroup;
  AddressID: string;
  team: Team;
  data: any;

  constructor(public authService: AuthService, 
    public fb: FormBuilder, 
    private teamService: TeamService, 
    public router: Router,
    public route: ActivatedRoute, 
    public toastCtrl: ToastController) {  

    this.route.params.subscribe(params => {
      this.team = params.id;
    });
    this.createTeamForm = new FormGroup({
      TeamName: new FormControl('', Validators.required),
      Dealership: new FormControl('', Validators.required),
      TeamType: new FormControl('', Validators.required)
    });

  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.createTeamForm.valid){
      return false;
    }
    else{
        const Team = {
          TeamName: this.createTeamForm.get('TeamName').value,
          Dealership: this.createTeamForm.get('Dealership').value,
          TeamType: this.createTeamForm.get('TeamType').value
        }
        //this.teamService.updateTeam(this.team, Team)
        this.presentToast()
      }
      this.router.navigate(['/tabs/create/service', this.team]);
  }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
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