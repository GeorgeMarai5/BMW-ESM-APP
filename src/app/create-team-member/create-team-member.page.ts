import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TeamMemberService } from '../services/team-member.service';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Team } from '../models/Team';
import { Employee } from '../models/Employee';

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
    public toastCtrl: ToastController) { 
      
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