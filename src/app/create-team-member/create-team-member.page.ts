import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EmployeeService } from 'app/services/Employee.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';
import { EmployeeRoleService } from 'app/services/employeeRole.service';
import { EmployeeRole } from 'app/models/EmployeeRole';
import { CreateTeamMemberHelpComponent } from 'app/components/create-team-member-help/create-team-member-help.component';
import { CreateAccountPage } from 'app/create-account/create-account.page';

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
  roleData:any;
  roledrop: any;
  CreateAccountPage;


  constructor(private route: ActivatedRoute, 
    public fb: FormBuilder, 
    public authService: AuthService, 
    public service: EmployeeService,
    public employeeService: EmployeeService, 
    public router: Router, 
    public toastCtrl: ToastController,
    public helpModal: ModalController) { 
      service = {} as EmployeeService;
      this.data = new Employee();
      employeeService = {} as EmployeeService;
  }

  async showHelp(){
    const modal = await this.helpModal.create({
      component: CreateTeamMemberHelpComponent});
      return await modal.present();
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

    this.getEmployee();
    
    let id = JSON.parse(localStorage.getItem('user'));       //This is the current signed in user from FireBase
    console.log(id)
  }

  getEmployee() {
      this.employeeService.getEmployeeList().subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }

  async create(){
    
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.uid)

    this.service.CreateEmployee(this.data).subscribe(response => {
      this.data.employeeId = 
     
      console.log(response);
    });
    
    this.presentToast();
    
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