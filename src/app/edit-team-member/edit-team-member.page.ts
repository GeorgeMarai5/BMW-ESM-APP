import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/Employee';
import { AuthService } from '../services/auth.service';
import { TeamMemberService } from '../services/team-member.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-team-member',
  templateUrl: './edit-team-member.page.html',
  styleUrls: ['./edit-team-member.page.scss'],
})
export class EditTeamMemberPage implements OnInit {

  teamMembers: Employee;
  teamMember = {};
  roles = [];
  editTeamMemberForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService,
    public teamMemberservice: TeamMemberService, public router: Router, public toastCtrl: ToastController) {
      teamMemberservice = {} as TeamMemberService;
  
      this.teamMembers = new Employee();
  }

  submitForm(){

  }

  ngOnInit() {
    this.teamMemberservice.getTeamMember(this.teamMember).subscribe(response => {
      console.log(response);
      this.data = response;
    });
  }

  async getTeamMember(item){
    this.teamMemberservice.getTeamMember(item.employeeID).subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }

  get errorControl() {
    return this.editTeamMemberForm.controls;
  }

  back(){
    this.router.navigate(['tabs/view/team-member', this.data]);
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Team member has been updated successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}