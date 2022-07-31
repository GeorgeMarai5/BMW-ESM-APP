import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../models/Team';
import { AuthService } from '../services/auth.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.page.html',
  styleUrls: ['./view-team.page.scss'],
})
export class ViewTeamPage implements OnInit {

  teams: Team;
  vehicle = {};
  viewTeamForm: FormGroup;
  isSubmitted = false;
  data: any;
  maintenanceplanID: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService,
    public router: Router, public teamservice: TeamService) {
      this.route.params.subscribe(params => {
          this.data = params.id;
      });
      this.viewTeamForm = new FormGroup({
        TeamName: new FormControl('', Validators.required),
        DealershipName: new FormControl('', Validators.required),
        TeamType: new FormControl('', Validators.required)
      })
     }

  ngOnInit() {
    this.teamservice.GetTeam(this.data).valueChanges()
    .subscribe(res =>{
    console.log(res)
    this.viewTeamForm.setValue({
      TeamName: res['TeamName'], 
      DealershipName: res['DealershipName'],
      TeamType: res['TeamType']
    })
    });
  }

  navToUpdate() {
    this.router.navigate(['tabs/edit/vehicle', this.data]);
  }
}