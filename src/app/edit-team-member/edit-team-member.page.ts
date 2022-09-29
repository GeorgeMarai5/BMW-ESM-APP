import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  editTeamMemberForm: UntypedFormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, 
    public fb: UntypedFormBuilder, 
    public authService: AuthService,
    public teamMemberservice: TeamMemberService, 
    public router: Router, 
    public toastCtrl: ToastController) {
      
      this.route.params.subscribe(params => {
        this.data = params.id;
      });
      this.editTeamMemberForm = new UntypedFormGroup({
        Name: new UntypedFormControl('', Validators.required),
        Surname: new UntypedFormControl('', Validators.required),
        PhoneNumber: new UntypedFormControl('', Validators.required),
        Email: new UntypedFormControl('', Validators.required),
        Role: new UntypedFormControl('', Validators.required)
      });

  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.editTeamMemberForm.valid){
      return false;
    }
    else{
        const teamMember = {
          Name: this.editTeamMemberForm.get('Name').value,
          Surname: this.editTeamMemberForm.get('Surname').value,
          PhoneNumber: this.editTeamMemberForm.get('PhoneNumber').value,
          Email: this.editTeamMemberForm.get('Email').value,
          Role: this.editTeamMemberForm.get('Role').value
        }
        //this.teamMemberservice.updateTeaMember(this.teamMember, teamMember)
        this.presentToast()
      }
      this.router.navigate(['/tabs/search/team-member', this.teamMember]);
  }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
    
    this.teamMemberservice.getTeamMember(this.data)
    .subscribe(res =>{
    console.log(res)
    this.editTeamMemberForm.setValue({
      Name: res['Name'],
      Surname: res['Surname'], 
      PhoneNumber: res['PhoneNumber'], 
      Email: res['Email'],
      Role: res['Role']
    })
    });
  }

  get errorControl() {
    return this.editTeamMemberForm.controls;
  }

  back(){
    this.router.navigate(['tabs/search/team-member', this.data]);
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