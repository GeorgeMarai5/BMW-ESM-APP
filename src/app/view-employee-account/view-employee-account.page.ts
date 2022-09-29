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
  templateUrl: './view-employee-account.page.html',
  styleUrls: ['./view-employee-account.page.scss'],
})
export class ViewEmployeeAccountPage implements OnInit {

  //private FirebaseApp = getApp();
  //private db = getFirestore(this.FirebaseApp);
  //private Clientid: String;
  //private currentClient;
  employeeList = [];
  viewEmployeeForm: UntypedFormGroup;
  employee: Employee;
  data: any;
  //public eventList: Clients[] = [];
  //ClientList: any;   //[]

  constructor(public employeeService: EmployeeService , private zone: NgZone,private toastCtrl: ToastController,private service: PostService, 
    public fb: UntypedFormBuilder,private router: Router, private route: ActivatedRoute, public authService: AuthService, private firestore: AngularFirestore) { 
      this.route.params.subscribe(params => {
        this.data = params.id;
      });
      this.employee = {} as Employee;

      this.viewEmployeeForm = new UntypedFormGroup({
        qNum: new UntypedFormControl('', Validators.required),
        fName: new UntypedFormControl('', Validators.required),
        lName: new UntypedFormControl('', Validators.required),
        PhoneNumber: new UntypedFormControl('', Validators.required),
        Email: new UntypedFormControl('', Validators.required),
        teamName: new UntypedFormControl('', Validators.required)
      });
    }

  ngOnInit() {
    

      console.log(this.employeeList);

   
  }

  navToUpdate() {
    this.router.navigate(['tabs/edit/account/employee', this.data]);
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Employee has been removed successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}