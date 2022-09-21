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
  data: Employee;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, 
    public teamMemberservice: TeamMemberService, public router: Router, public toastCtrl: ToastController) { 
      teamMemberservice = {} as TeamMemberService;
      this.data = new Employee();
    }
    
  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
  }

  submitForm(){
    this.teamMemberservice.createTeamMember(this.data).subscribe((response) => {
      console.log(response);
      //this.router.navigate(['teamMember-list']);
    });
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
