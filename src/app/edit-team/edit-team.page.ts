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
      
    // this.route.params.subscribe(params => {
    //     this.data = params.id;
    // });

    // this.editTeamForm = new FormGroup({
    //   TeamName: new FormControl('', Validators.required),
    //   DealershipName: new FormControl('', Validators.required),
    //   TeamType: new FormControl('', Validators.required)
    // });
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;});
    teamservice = {} as TeamService;
    this.team = new Team();

  }
    
  submitForm() {
    // this.isSubmitted = true;
    // if(!this.editTeamForm.valid){
    //   return false;
    // }
    // else{
    //     const teams = {
    //       TeamName: this.editTeamForm.get('TeamName').value,
    //       Dealership: this.editTeamForm.get('Dealership').value,
    //       TeamType: this.editTeamForm.get('TeamType').value
    //     }
    //     //this.teamservice.updateTeam(this.team, teams)
    //     this.presentToast()
    //   }
     
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

    // this.teamservice.getTeam(this.data)
    // .subscribe(res =>{
    // console.log(res)
    // this.editTeamForm.setValue({
    //   TeamName: res['TeamName'],
    //   Dealership: res['Dealership'], 
    //   TeamType: res['TeamType']
    // })
    // });

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
  async updateTeam(id, data){

    this.teamservice.updateTeam(this.id,this.data).subscribe(response => {
      console.log(response);
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