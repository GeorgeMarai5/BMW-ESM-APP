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

  constructor(public authService: AuthService, private teamservice: TeamService, public firestore: AngularFirestore, 
    public alertCtrl: AlertController, public fb: FormBuilder, public router: Router, public toastCtrl: ToastController) { 
      this.teams = {} as Team;
    }

  ngOnInit() {
    this.teamForm = this.fb.group({
      TeamName: ['', [Validators.required]],
      DealershipName: ['', [Validators.required]],
      TeamType: ['', [Validators.required]]

    });
 /*
    this.teamservice.getTeams().subscribe(data => {
      this.teamList = data.map(e => {
        return {
          id: e.payload.doc.id,
          TeamName: e.payload.doc.data()['TeamName'],
          DealershipName: e.payload.doc.data()['DealershipName'],
          TeamType: e.payload.doc.data()['TeamType'],
        };
      })
      console.log(this.teamList);
    });
  }
*/
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
          this.teamservice.deleteTeam(id);
          this.presentToast();
        }
      }]
    });

    confirmDeleteAlert.present();
    
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
