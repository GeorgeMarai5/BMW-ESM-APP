import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { employee } from '../models/Employee';
import { AuthService } from '../services/auth.service';
import { TeamMemberService } from '../services/team-member.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-search-team-member',
  templateUrl: './search-team-member.page.html',
  styleUrls: ['./search-team-member.page.scss'],
})
export class SearchTeamMemberPage implements OnInit {

  teamMembers: employee;
  teamMemberList = [];
  teamMemberForm: FormGroup;
  searchTerm: string;

  constructor(public authService: AuthService, private teamMemberservice: TeamMemberService, public fb: FormBuilder,
     public firestore: AngularFirestore, public alertCtrl: AlertController, public router: Router) { 
      this.teamMembers = {} as employee;
    }

  ngOnInit() {
    this.teamMemberForm = this.fb.group({
      employeeName: new FormControl('', Validators.required),
      employeeSurname: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      emailAddress: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    });

    this.teamMemberservice.getTeamMembers().subscribe(data => {
      this.teamMemberList = data.map(e => {
        return {
          id: e.payload.doc.id,
          employeeName: e.payload.doc.data()['employeeName'],
          employeeSurname: e.payload.doc.data()['employeeSurname'],
          phoneNumber: e.payload.doc.data()['phoneNumber'],
          emailAddress: e.payload.doc.data()['emailAddress'],
          role: e.payload.doc.data()['role']
        };
      })
      console.log(this.teamMemberList);
    });
  }

  async removeTeamMember(id){
    const confirmDeleteAlert = await this.alertCtrl.create({
      header: 'Remove Team Member',
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
          this.teamMemberservice.deleteTeamMember(id);
          alert('Team Member was successfully removed');
        }
      }]
    });

    confirmDeleteAlert.present();
    
  }
}
