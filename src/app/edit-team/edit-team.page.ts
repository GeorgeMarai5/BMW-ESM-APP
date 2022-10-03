import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../models/Team';
import { AuthService } from '../services/auth.service';
import { TeamService } from '../services/team.service';
import { ModalController, ToastController } from '@ionic/angular';
import { EditTeamHelpComponent } from 'app/components/edit-team-help/edit-team-help.component';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.page.html',
  styleUrls: ['./edit-team.page.scss'],
})

export class EditTeamPage implements OnInit {

  team: Team;
  dealerships = [];
  teamTypes = [];
  editTeamForm: FormGroup;
  isSubmitted = false;
  data: any;
  id: any;

  constructor(private activatedRoute: ActivatedRoute, 
    public fb: FormBuilder, 
    public authService: AuthService,
    public teamservice: TeamService, 
    public router: Router, 
    public toastCtrl: ToastController,
    public helpModal: ModalController) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });
    teamservice = {} as TeamService;
    this.team = new Team();
  }

  async showHelp(){
    const modal = await this.helpModal.create({
      component: EditTeamHelpComponent});
      return await modal.present();
  }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }

    var coll = document.getElementsByClassName("collapsible");
    var i;
    let up = document.getElementById('up');
    let down = document.getElementById('down');

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
          down.style.display = "none";
          up.style.display = "block";
        } else {
          content.style.display = "block";
          up.style.display = "none";
          down.style.display = "block";
        }
      });
    }
    this.updateTeam();
  }

  async updateTeam(){

    this.teamservice.updateTeam(this.id,this.data).subscribe(response => {
      console.log(response);
      this.data = response;
    })
    this.router.navigate(['/tabs/search/team', this.team]);
    await this.presentToast();
  }
  
  back() {
    this.router.navigate(['tabs/search/team', this.data]);
  }

  get errorControl() {
    return this.editTeamForm.controls;
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Team has been updated successfully.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}