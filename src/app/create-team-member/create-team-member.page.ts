import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TeamMemberService } from '../services/team-member.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Team } from '../models/Team';
import { Employee } from '../models/Employee';
import { CreateTeamMemberHelpComponent } from 'app/components/create-team-member-help/create-team-member-help.component';

@Component({
  selector: 'app-create-team-member',
  templateUrl: './create-team-member.page.html',
  styleUrls: ['./create-team-member.page.scss'],
})
export class CreateTeamMemberPage implements OnInit {

  roles: [];
  createTeamMemberForm: FormGroup;
  isSubmitted = false;
  teamMember: Employee;
  data: any;

  constructor(private route: ActivatedRoute, 
    public fb: FormBuilder, 
    public authService: AuthService, 
    public teamMemberservice: TeamMemberService, 
    public router: Router, 
    public toastCtrl: ToastController,
    public helpModal: ModalController) { 
      
      teamMemberservice = {} as TeamMemberService;
      this.data = new Employee();
      /*
      this.route.params.subscribe(params => {
        this.data = params.id;
      });
      this.createTeamMemberForm = new FormGroup({
        Name: new FormControl('', Validators.required),
        Surname: new FormControl('', Validators.required),
        PhoneNumber: new FormControl('', Validators.required),
        Email: new FormControl('', Validators.required),
        Role: new FormControl('', Validators.required)
      });
      */
  }

  async showHelp(){
    const modal = await this.helpModal.create({
      component: CreateTeamMemberHelpComponent});
      return await modal.present();
  }

  submitForm(){
    this.teamMemberservice.createTeamMember(this.data).subscribe(response => {
      console.log(response);
      //this.router.navigate(['student-list']);
    });
  
    this.presentToast();
  
    /*
    this.isSubmitted = true;
    if(!this.createTeamMemberForm.valid){
      return false;
    }
    else{
        const teamMember = {
          Name: this.createTeamMemberForm.get('Name').value,
          Surname: this.createTeamMemberForm.get('Surname').value,
          PhoneNumber: this.createTeamMemberForm.get('PhoneNumber').value,
          Email: this.createTeamMemberForm.get('Email').value,
          Role: this.createTeamMemberForm.get('Role').value,
          Team: this.createTeamMemberForm.get('Team').value,
        }
        this.teamMemberservice.createTeamMember(teamMember)
        this.presentToast()
      }
      this.router.navigate(['/tabs/search/team-member']);
      */
  }  

  ngOnInit() {
    //if(this.authService.isLoggedIn){
    //  return true;
    //}
    //else{
    //  this.router.navigate(['/tabs/login']);
    //}

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

  get errorControl() {
    return this.createTeamMemberForm.controls;
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'A new team member has been created successfully.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}