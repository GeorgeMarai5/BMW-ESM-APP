import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TeamMemberService } from '../services/team-member.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-create-team-member',
  templateUrl: './create-team-member.page.html',
  styleUrls: ['./create-team-member.page.scss'],
})
export class CreateTeamMemberPage implements OnInit {

  createTeamMemberForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService,
    public firestore: AngularFirestore, public teamMemberservice: TeamMemberService, public router: Router) { 
    this.route.params.subscribe(params => {
      this.data = params['id'];
    });
    
    this.createTeamMemberForm = new FormGroup({
      employeeName: new FormControl('', Validators.required),
      employeeSurname: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      emailAddress: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    })
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.createTeamMemberForm.valid){
      return false;
    }
    else{
      const teamMember = {
        employeeName: this.createTeamMemberForm.get('employeeName').value,
        employeeSurname: this.createTeamMemberForm.get('employeeSurname').value,
        phoneNumber: this.createTeamMemberForm.get('phoneNumber').value,
        emailAddress: this.createTeamMemberForm.get('emailAddress').value,
        role: this.createTeamMemberForm.get('role').value
      }


      this.firestore.collection('Employee').add(teamMember).then(function(){
        alert("New Team Member added successfully");
      });
    }
  }

  ngOnInit() {
    this.createTeamMemberForm.setValue({employeeName: '', employeeSurname: '', phoneNumber: '', emailAddress: '', role: ''});
  }

  get errorControl() {
    return this.createTeamMemberForm.controls;
  }
}
