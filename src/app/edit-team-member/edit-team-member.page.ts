import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { employee } from '../models/Employee';
import { AuthService } from '../services/auth.service';
import { TeamMemberService } from '../services/team-member.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-edit-team-member',
  templateUrl: './edit-team-member.page.html',
  styleUrls: ['./edit-team-member.page.scss'],
})
export class EditTeamMemberPage implements OnInit {

  teamMembers: employee;
  teamMember = {};
  editTeamMemberForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, 
    public firestore: AngularFirestore, public teamMemberservice: TeamMemberService, public router: Router) {
      this.route.params.subscribe(params => {
          this.data = params.id;
      });
    this.editTeamMemberForm = new FormGroup({
      employeeName: new FormControl('', Validators.required),
      employeeSurname: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      emailAddress: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    })
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.editTeamMemberForm.valid){
      return false;
    }
    else{
        const teamMember = {
          employeeName: this.editTeamMemberForm.get('employeeName').value,
          employeeSurname: this.editTeamMemberForm.get('employeeSurname').value,
          phoneNumber: this.editTeamMemberForm.get('phoneNumber').value,
          emailAddress: this.editTeamMemberForm.get('emailAddress').value,
          role: this.editTeamMemberForm.get('role').value,
        }
        this.teamMemberservice.updateTeamMember(this.data, teamMember)
        alert("Team member was successfully updated.");
      }
      this.router.navigate(['/tabs/view-team-member', this.data]);
  }

  ngOnInit() {
    this.teamMemberservice.getTeamMember(this.data).valueChanges()
    .subscribe(res =>{
    console.log(res)
    this.editTeamMemberForm.setValue({
      employeeName: res['employeeName'],
      employeeSurname: res['employeeSurname'], 
      phoneNumber: res['phoneNumber'],
      emailAddress: res['emailAddress'], 
      role: res['role'],
    })
    });
  }

  get errorControl() {
    return this.editTeamMemberForm.controls;
  }

}
