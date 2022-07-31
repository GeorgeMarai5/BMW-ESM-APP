import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { employee } from '../models/Employee';
import { Team } from '../models/Team';
import { AuthService } from '../services/auth.service';
import { TeamMemberService } from '../services/team-member.service';

@Component({
  selector: 'app-edit-team-member',
  templateUrl: './edit-team-member.page.html',
  styleUrls: ['./edit-team-member.page.scss'],
})
export class EditTeamPage implements OnInit {

  teamMembers: employee;
  teamMember = {};
  editTeamMemberForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, 
    public teamMemberservice: TeamMemberService, public router: Router) {
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
    if(!this.teamMemberservice.valid){
      return false;
    }
    else{
        const team = {
          employeeName: this.teamMemberservice.get('employeeName').value,
          employeeSurname: this.teamMemberservice.get('employeeSurname').value,
          phoneNumber: this.teamMemberservice.get('phoneNumber').value,
          emailAddress: this.teamMemberservice.get('emailAddress').value,
          role: this.teamMemberservice.get('role').value,
        }
        this.teamMemberservice.UpdateTeamMember(this.data, teamMember)
        alert("Team was successfully updated.");
      }
      this.router.navigate(['/tabs/view/vehicle', this.data]);
  }

  ngOnInit() {
    this.teamMemberservice.GetTeamMember(this.data).valueChanges()
    .subscribe(res =>{
    console.log(res)
    this.teamMemberservice.setValue({
      TeamName: res['TeamName'],
      DealershipName: res['DealershipName'], 
      TeamType: res['TeamType']
    })
    });
  }

  get errorControl() {
    return this.editTeamMemberForm.controls;
  }

}
