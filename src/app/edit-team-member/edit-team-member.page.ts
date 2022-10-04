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