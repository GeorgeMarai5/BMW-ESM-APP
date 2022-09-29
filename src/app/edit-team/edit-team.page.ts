import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../models/Team';
import { AuthService } from '../services/auth.service';
import { TeamService } from '../services/team.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.page.html',
  styleUrls: ['./edit-team.page.scss'],
})
export class EditTeamPage implements OnInit {

  teams: Team;
  team = {};
  dealerships = [];
  teamTypes = [];
  editTeamForm: UntypedFormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, 
    public fb: UntypedFormBuilder, 
    public authService: AuthService,
    public teamservice: TeamService, 
    public router: Router, 
    public toastCtrl: ToastController) {
      
    this.route.params.subscribe(params => {
        this.data = params.id;
    });

    this.editTeamForm = new UntypedFormGroup({
      TeamName: new UntypedFormControl('', Validators.required),
      DealershipName: new UntypedFormControl('', Validators.required),
      TeamType: new UntypedFormControl('', Validators.required)
    });

  }

  submitForm() {
    this.isSubmitted = true;
    if(!this.editTeamForm.valid){
      return false;
    }
    else{
        const teams = {
          TeamName: this.editTeamForm.get('TeamName').value,
          Dealership: this.editTeamForm.get('Dealership').value,
          TeamType: this.editTeamForm.get('TeamType').value
        }
        //this.teamservice.updateTeam(this.team, teams)
        this.presentToast()
      }
      this.router.navigate(['/tabs/search/team', this.team]);
  }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }

    this.teamservice.getTeam(this.data)
    .subscribe(res =>{
    console.log(res)
    this.editTeamForm.setValue({
      TeamName: res['TeamName'],
      Dealership: res['Dealership'], 
      TeamType: res['TeamType']
    })
    });
  }

  back() {
    this.router.navigate(['tabs/search/team', this.data]);
  }

  get errorControl() {
    return this.editTeamForm.controls;
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Team has been updated successfully.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}