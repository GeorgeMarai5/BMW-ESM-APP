import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TeamService } from '../services/team.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, ToastController } from '@ionic/angular';
import { Team } from '../models/team';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.page.html',
  styleUrls: ['./create-team.page.scss'],
})
export class CreateTeamPage implements OnInit {

  teamTypes = [];
  TeamList = [];
  TeamList$!:Observable<any[]>;
  createTeamForm: FormGroup;
  AddressID: string;
  data: any;
  dat: Team;
  information= null;

  constructor(public authService: AuthService, public fb: FormBuilder, private teamService: TeamService, 
    public alertCtrl: AlertController, public router: Router,public ActivatedRoute: ActivatedRoute) { 
      teamService = {} as TeamService;
      this.data = [];
      this.dat = new Team();
    }

  ngOnInit() {
    this.createTeamForm = this.fb.group({
      teamN: ['', [Validators.required]],
      FleetLocation: ['', [Validators.required]],
    });
  }

create(){  
    this.teamService.createItem(this.dat).subscribe((response) => {
      console.log(response);
      this.router.navigate(['student-list']);
    });
  }

}