import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TeamMemberService } from '../services/team-member.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Team } from '../models/Team';

@Component({
  selector: 'app-create-team-member',
  templateUrl: './create-team-member.page.html',
  styleUrls: ['./create-team-member.page.scss'],
})
export class CreateTeamMemberPage implements OnInit {

  roles = [];
  createTeamMemberForm: FormGroup;
  isSubmitted = false;
  MemberList = [];
  dealerships = [];
  MemberList$!:Observable<any[]>;
  data: any;
  dat: Team;
  information= null;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, public firestore: AngularFirestore, 
    public teamMemberservice: TeamMemberService, public router: Router, public toastCtrl: ToastController) { 
      teamMemberservice = {} as TeamMemberService;
      this.data = [];
      //this.dat = new Team();
    }
    
    ngOnInit() {
      this.createTeamMemberForm = new FormGroup({
        employeeName: new FormControl('', Validators.required),
        employeeSurname: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', Validators.required),
        emailAddress: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required)
      })
    }

  submitForm(){
    this.teamMemberservice.createTeamMember(this.dat).subscribe((response) => {
      console.log(response);
      this.router.navigate(['student-list']);
    });
  }

  get errorControl() {
    return this.createTeamMemberForm.controls;
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'A new team member has been created successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}
