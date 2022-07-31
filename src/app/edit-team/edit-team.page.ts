import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../models/Team';
import { AuthService } from '../services/auth.service';
import { TeamService } from '../services/team.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.page.html',
  styleUrls: ['./edit-team.page.scss'],
})
export class EditTeamPage implements OnInit {

  teams: Team;
  team = {};
  editTeamForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, 
    public firestore: AngularFirestore, public teamservice: TeamService, public router: Router) {
      this.route.params.subscribe(params => {
          this.data = params.id;
      });
    this.editTeamForm = new FormGroup({
      TeamName: new FormControl('', Validators.required),
      DealershipName: new FormControl('', Validators.required),
      TeamType: new FormControl('', Validators.required)
    })
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.editTeamForm.valid){
      return false;
    }
    else{
        const team = {
          TeamName: this.editTeamForm.get('TeamName').value,
          DealershipName: this.editTeamForm.get('DealershipName').value,
          TeamType: this.editTeamForm.get('TeamType').value
        }
        this.teamservice.updateTeam(this.data, team)
        alert("Team was successfully updated.");
      }
      this.router.navigate(['/tabs/view-team', this.data]);
  }

  ngOnInit() {
    this.teamservice.getTeam(this.data).valueChanges()
    .subscribe(res =>{
    console.log(res)
    this.editTeamForm.setValue({
      TeamName: res['TeamName'],
      DealershipName: res['DealershipName'], 
      TeamType: res['TeamType']
    })
    });
  }

  get errorControl() {
    return this.editTeamForm.controls;
  }

}