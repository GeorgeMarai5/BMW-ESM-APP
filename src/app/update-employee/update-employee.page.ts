import { Component, OnInit, NgZone } from '@angular/core';
import { UntypedFormBuilder,Validators,UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/Employee.service';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Employee } from '../models/Employee';

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
    updateEmployeeForm: UntypedFormGroup;
    employee: Employee;
    isSubmitted = false;
    data: any;
    //public eventList: Clients[] = [];
    //ClientList: any;   //[]

  constructor(public employeeService: EmployeeService , private zone: NgZone,private toastCtrl: ToastController,private service: PostService, 
    public fb: UntypedFormBuilder,private router: Router, private route: ActivatedRoute, public authService: AuthService, private firestore: AngularFirestore) { 
      this.route.params.subscribe(params => {
        this.data = params.id;
    });

    this.employee = {} as Employee;
    this.updateEmployeeForm = new UntypedFormGroup({
      qNum: new UntypedFormControl('', [Validators.required, Validators.maxLength(7)]),
      fName: new UntypedFormControl('', [Validators.required, Validators.maxLength(20)]),
      lName: new UntypedFormControl('', [Validators.required, Validators.maxLength(20)]),
      phoneNum: new UntypedFormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      teamName: new UntypedFormControl('', Validators.required)
    });
  }

  ngOnInit() {

    
  }

  submitForm(){

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