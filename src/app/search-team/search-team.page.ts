import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Team } from '../models/Team';
import { AuthService } from '../services/auth.service';
import { TeamService } from '../services/team.service';
import { AlertController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
  teamID: string;
  data: any;

  constructor(public authService: AuthService, private teamservice: TeamService, public firestore: AngularFirestore, 
    public alertCtrl: AlertController, public fb: FormBuilder, public router: Router, public toastCtrl: ToastController) { 
      teamservice = {} as TeamService;
    }

  ngOnInit() {
    this.teamservice.getTeamList().subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }

  async deleteTeam(item){
    this.teamservice.deleteTeam(item.teamID).subscribe(Response => {
      console.log(Response);
    });
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'The team has been removed successfully.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
