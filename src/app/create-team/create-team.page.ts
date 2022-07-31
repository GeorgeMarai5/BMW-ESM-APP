import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.page.html',
  styleUrls: ['./create-team.page.scss'],
})
export class CreateTeamPage implements OnInit {

  createTeamForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService,
    public teamservice: TeamService, public router: Router) { 
    this.route.params.subscribe(params => {
      this.data = params['id'];
    });
    this.createTeamForm = new FormGroup({
      TeamName: new FormControl('', Validators.required),
      DealershipName: new FormControl('', Validators.required),
      TeamType: new FormControl('', Validators.required)
    })
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.createTeamForm.valid){
      return false;
    }
    else{
      const team = {
        TeamName: this.createTeamForm.get('TeamName').value,
        DealershipName: this.createTeamForm.get('DealershipName').value,
        TeamType: this.createTeamForm.get('TeamType').value,
      }

      this.teamservice.AddTeam(this.createTeamForm.value).subscribe(data => {
        this.createTeamForm.reset();
        alert("Team successfully Created")
        console.log("successfully created")
      })
    }
  }

  ngOnInit() {
    this.createTeamForm.setValue({TeamName: '', DealershipName: '', TeamType: ''});
  }

  get errorControl() {
    return this.createTeamForm.controls;
  }
}