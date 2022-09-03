import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  editTeamForm: FormGroup;
  isSubmitted = false;
  data: any;
  teamID: string;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService,
    public teamservice: TeamService, public router: Router, public toastCtrl: ToastController) {
      this.route.params.subscribe(params => {
          this.data = params.id;
      });
    this.editTeamForm = new FormGroup({
      TeamName: new FormControl('', Validators.required),
      DealershipName: new FormControl('', Validators.required),
      TeamType: new FormControl('', Validators.required)
    })
  }

  submitForm(){

  }

  ngOnInit() {
    this.teamservice.getTeam(this.team).subscribe(response => {
      console.log(response);
      this.data = response;
    });
  }

  async getTeam(item){
    this.teamservice.getTeam(item.teamID).subscribe(response => {
     console.log(response);
     this.data = response;
    });
  }
  
  update() {
    this.teamservice.updateTeam(this.data).subscribe(response => {
      console.log(response)
      //this.router.navigate(['team-list']);
      });
    }

    back(){
      this.router.navigate(['tabs/view/team', this.data]);
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