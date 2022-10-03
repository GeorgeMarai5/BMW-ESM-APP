import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TeamService } from '../services/team.service';
import { AlertController, ToastController } from '@ionic/angular';
import { DealershipService } from 'app/services/dealership.service';
import { TeamTypeService } from 'app/services/teamtype.service';

@Component({
  selector: 'app-search-team',
  templateUrl: './search-team.page.html',
  styleUrls: ['./search-team.page.scss'],
})
export class SearchTeamPage implements OnInit {

  teamList = [];
  teamForm: FormGroup;
  searchTerm: string;
  teamId: string;
  teamData: any;
  data: any; 

  constructor(public authService: AuthService, 
    private teamservice: TeamService, 
    private dealershipService: DealershipService, 
    private teamtypeService: TeamTypeService, 
    public alertCtrl: AlertController, 
    public fb: FormBuilder, 
    public router: Router, 
    public toastCtrl: ToastController) { 
      teamservice = {} as TeamService;
      dealershipService = {} as DealershipService;
      teamtypeService = {} as TeamTypeService;
    }

  ngOnInit() {
    /*if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
    */
    this.getallTeams();
    this.getDealership();
    this.getTeamType();

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
  }

  async getallTeams(){
    this.teamservice.getTeamList().subscribe(response => {
      console.log(response);
      this.data = response;
    });
  }

  async getDealership(){
    this.dealershipService.getDealershipList().subscribe(response => {
      console.log(response);
      this.data = response;
    });
  }

  async getTeamType() {
    this.teamtypeService.getTeamTypeList().subscribe(response => {
      console.log(response);
      this.data = response;
    });
  }

  async deleteTeam(item){
    const confirmDeleteAlert = await this.alertCtrl.create({
      header: 'Remove Team',
      message: 'Are you sure you would like to remove this team from the system?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: end => {
          this.alertCtrl.dismiss();
        }
      },
      {
        text: 'Remove',
        role: 'remove',
        handler: () => {
          this.teamservice.deleteTeam(item.teamId).subscribe(Response => {
            console.log(Response);
          });
          this.presentToast();
        }
      }]
    });
    confirmDeleteAlert.present();
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'The team has been removed successfully.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}