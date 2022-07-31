import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular/providers/alert-controller';
import { Team } from '../models/Team';
import { AuthService } from '../services/auth.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-search-team',
  templateUrl: './search-team.page.html',
  styleUrls: ['./search-team.page.scss'],
})
export class SearchTeamPage implements OnInit {

  teams: Team;
  teamList = [];
  teamForm: FormGroup;
  searchTerm: string;

  constructor(public authService: AuthService, private teamservice: TeamService, public fb: FormBuilder,
     public alertCtrl: AlertController, public router: Router) { 
      this.teams = {} as Team;
    }

  ngOnInit() {
    this.createTeamForm = this.fb.group({
      TeamName: ['', [Validators.required]],
      DealershipName: ['', [Validators.required]],
      TeamType: ['', [Validators.required]]

  });

  this.teamservice.GetTeam().subscribe(data => {
    this.teamList = data.map(e => {
      return {
        id: e.payload.doc.id,
        TeamName: e.payload.doc.data()['VehicleID'],
        DealershipName: e.payload.doc.data()['VIN_Number'],
        TeamType: e.payload.doc.data()['VehicleModel'],
      };
    })
    console.log(this.teamList);
  });
  }

  async removeTeam(id){
    const confirmDeleteAlert = await this.alertCtrl.create({
      header: 'Remove Team',
      message: 'Are you sure you would like to remove this team from the system?',
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
          this.teamservice.DeleteTeam(id);
          alert('Team was successfully removed');
        }
      }]
    });
    confirmDeleteAlert.present();
  }
}
