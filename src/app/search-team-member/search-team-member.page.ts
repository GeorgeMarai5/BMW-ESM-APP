import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Employee } from '../models/Employee';
import { AuthService } from '../services/auth.service';
import { TeamMemberService } from '../services/team-member.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-search-team-member',
  templateUrl: './search-team-member.page.html',
  styleUrls: ['./search-team-member.page.scss'],
})
export class SearchTeamMemberPage implements OnInit {

  teamMembers: Employee;
  teamMemberList = [];
  teamMemberForm: FormGroup;
  searchTerm: string;
  teamMemberID: string;
  data: any;

  constructor(public authService: AuthService, private teamMemberservice: TeamMemberService, public fb: FormBuilder, public firestore: AngularFirestore, 
     public alertCtrl: AlertController, public router: Router, public toastCtrl: ToastController) { 
      this.teamMembers = {} as Employee;
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

    this.getallTeamMembers();
  }

  async getallTeamMembers(){
    this.teamMemberservice.getTeamMemberList().subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }

  async assignTeamMember(id){

  }

  async deleteTeamMember(item){
    const confirmDeleteAlert = await this.alertCtrl.create({
      header: 'Remove Team Memeber',
      message: 'Are you sure you would like to remove this team member from this team?',
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
          this.teamMemberservice.deleteTeamMember(item.teamMemberID).subscribe(Response => {
            console.log(Response);
          });
          this.presentToast();
        }
      }]
    });
    confirmDeleteAlert.present();
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Team member has been removed successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}
