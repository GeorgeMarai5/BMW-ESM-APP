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
      this.route.params.subscribe(params => {
          this.data = params.id;
      });
    this.editTeamMemberForm = new FormGroup({
      employeeName: new FormControl('', Validators.required),
      employeeSurname: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      emailAddress: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    })
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.editTeamMemberForm.valid){
      return false;
    }
    else{
        const teamMember = {
          employeeName: this.editTeamMemberForm.get('employeeName').value,
          employeeSurname: this.editTeamMemberForm.get('employeeSurname').value,
          phoneNumber: this.editTeamMemberForm.get('phoneNumber').value,
          emailAddress: this.editTeamMemberForm.get('emailAddress').value,
          role: this.editTeamMemberForm.get('role').value,
        }

      this.teamMemberservice.updateTeamMember(this.data, teamMember)
      this.presentToast();
    }

    this.router.navigate(['/tabs/search-team-member', this.data]);
  }

  ngOnInit() {
    this.teamMemberservice.getTeamMember(this.data).subscribe(res =>{
      console.log(res)
      this.editTeamMemberForm.setValue({
        employeeName: res['employeeName'],
        employeeSurname: res['employeeSurname'], 
        phoneNumber: res['phoneNumber'],
        emailAddress: res['emailAddress'], 
        role: res['role'],
      })
    });
  }

  get errorControl() {
    return this.editTeamMemberForm.controls;
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