import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/Employee.service';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Employee } from '../models/Employee';
import { UpdateEmployeeHelpComponent } from 'app/components/update-employee-help/update-employee-help.component';

@Component({
  selector: 'app-view-employee-account',
  templateUrl: './update-employee.page.html',
  styleUrls: ['./update-employee.page.scss'],
})
export class UpdateEmployeePage implements OnInit {

  //private FirebaseApp = getApp();
  //private db = getFirestore(this.FirebaseApp);
  //private Clientid: String;
  //private currentClient;
    employeeList = [];
    updateEmployeeForm: FormGroup;
    employee: Employee;
    isSubmitted = false;
    data: any;
    //public eventList: Clients[] = [];
    //ClientList: any;   //[]

  constructor(public employeeService: EmployeeService , private zone: NgZone,private toastCtrl: ToastController,private service: PostService, 
    public fb: FormBuilder,private router: Router, private route: ActivatedRoute, 
    public authService: AuthService, private firestore: AngularFirestore, public helpModal: ModalController) { 
      this.route.params.subscribe(params => {
        this.data = params.id;
    });

    this.employee = {} as Employee;
    this.updateEmployeeForm = new FormGroup({
      qNum: new FormControl('', [Validators.required, Validators.maxLength(7)]),
      fName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      lName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      phoneNum: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      teamName: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {

    
  }

  submitForm(){

  }

  async showHelp(){
    const modal = await this.helpModal.create({
      component: UpdateEmployeeHelpComponent});
      return await modal.present();
  }

  back(){
    this.router.navigate(['tabs/view/employee', this.data]);
  }

  get errorControl() {
    return this.updateEmployeeForm.controls;
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Employee has been updated successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}