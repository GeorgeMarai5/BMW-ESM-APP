import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/Employee';
import { AuthService } from '../services/auth.service';
import { TeamMemberService } from '../services/team-member.service';
import { ModalController, ToastController } from '@ionic/angular';
import { EditTeamMemberHelpComponent } from 'app/components/edit-team-member-help/edit-team-member-help.component';

@Component({
  selector: 'app-edit-team-member',
  templateUrl: './edit-team-member.page.html',
  styleUrls: ['./edit-team-member.page.scss'],
})
export class EditTeamMemberPage implements OnInit {

  teamMember: Employee;
  roles = [];
  editTeamMemberForm: FormGroup;
  isSubmitted = false;
  data: any;
  id: any;

  constructor(private activatedRoute: ActivatedRoute, 
    public fb: FormBuilder, 
    public authService: AuthService,
    public teamMemberService: TeamMemberService, 
    public router: Router, 
    public toastCtrl: ToastController,
    public helpModal: ModalController) {
      
      // this.route.params.subscribe(params => {
      //   this.data = params.id;
      // });
      // this.editTeamMemberForm = new FormGroup({
      //   Name: new FormControl('', Validators.required),
      //   Surname: new FormControl('', Validators.required),
      //   PhoneNumber: new FormControl('', Validators.required),
      //   Email: new FormControl('', Validators.required),
      //   Role: new FormControl('', Validators.required)
      // });
      teamMemberService = {} as TeamMemberService;
      this.teamMember = new Employee();
  
      this.activatedRoute.params.subscribe(params => {
        this.id = params.id;
    });
  }

  submitForm(){
    // this.isSubmitted = true;
    // if(!this.editTeamMemberForm.valid){
    //   return false;
    // }
    // else{
    //     const teamMember = {
    //       Name: this.editTeamMemberForm.get('Name').value,
    //       Surname: this.editTeamMemberForm.get('Surname').value,
    //       PhoneNumber: this.editTeamMemberForm.get('PhoneNumber').value,
    //       Email: this.editTeamMemberForm.get('Email').value,
    //       Role: this.editTeamMemberForm.get('Role').value
    //     }
    //     //this.teamMemberservice.updateTeaMember(this.teamMember, teamMember)
    //     this.presentToast()
    //   }
      this.router.navigate(['/tabs/search/team-member', this.teamMember]);
  }

  async showHelp(){
    const modal = await this.helpModal.create({
      component: EditTeamMemberHelpComponent});
      return await modal.present();
  }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
    
    // this.teamMemberservice.getTeamMember(this.data)
    // .subscribe(res =>{
    // console.log(res)
    // this.editTeamMemberForm.setValue({
    //   Name: res['Name'],
    //   Surname: res['Surname'], 
    //   PhoneNumber: res['PhoneNumber'], 
    //   Email: res['Email'],
    //   Role: res['Role']
    // })
    // });
  }

  get errorControl() {
    return this.editTeamMemberForm.controls;
  }
  async updateTeamMember(id, data){

    this.teamMemberService.updateTeamMember(this.id,this.data).subscribe(response => {
      console.log(response);
      //this.data = response;
      //this.router.navigate(['student-list']);
      
    })
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