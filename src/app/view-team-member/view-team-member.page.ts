import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { employee } from '../models/Employee';
import { AuthService } from '../services/auth.service';
import { TeamMemberService } from '../services/team-member.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-view-team-member',
  templateUrl: './view-team-member.page.html',
  styleUrls: ['./view-team-member.page.scss'],
})
export class ViewTeamMemberPage implements OnInit {

  teamMembers: employee;
  teamMmber = {};
  viewTeamMemberForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService,
    public firestore: AngularFirestore, public router: Router, public teamservice: TeamMemberService) {
      this.route.params.subscribe(params => {
          this.data = params.id;
      });
      this.viewTeamMemberForm = new FormGroup({
        employeeName: new FormControl('', Validators.required),
        employeeSurname: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', Validators.required),
        emailAddress: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required) 
      })
     }

  ngOnInit() {
    this.teamservice.getTeamMember(this.data).valueChanges()
    .subscribe(res =>{
    console.log(res)
    this.viewTeamMemberForm.setValue({
      TeamName: res['TeamName'], 
      DealershipName: res['DealershipName'],
      TeamType: res['TeamType']
    })
    });
  }

  navToUpdate() {
    this.router.navigate(['tabs/edit-team-member', this.data]);
  }
}
