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
    this.getEmployee();
  }

  getEmployee() {
      this.employeeService.getEmployeeList().subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }

  async create(){
    this.service.CreateEmployee(this.data).subscribe(response => {
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