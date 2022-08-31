import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
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
    employeeform: FormGroup;
    employee: Employee;
    //public eventList: Clients[] = [];
    //ClientList: any;   //[]

  constructor(public employeeService: EmployeeService , private zone: NgZone,private toastCtrl: ToastController,private service: PostService, 
    public fb: FormBuilder,private router: Router, private route: ActivatedRoute, public authService: AuthService, private firestore: AngularFirestore) { 

    this.employee = {} as Employee;

  }

  ngOnInit() {

    this.employeeform = this.fb.group({
      QNumber: [''],
      Name: [''],
      Surname: [''],
      PhoneNumber: [''],
      Email: [''],
      Team: [''],
    });

    this.employeeService.read_Employee().subscribe(data =>{
      this.employeeList = data.map(e =>{
        return{
          id: e.payload.doc.id,
          QNumber: e.payload.doc.data()['qnumber'],
          Name: e.payload.doc.data()['name'],
          Surname: e.payload.doc.data()['surname'],
          PhoneNumber: e.payload.doc.data()['phone'],
          Email: e.payload.doc.data()['email'],
          Team: e.payload.doc.data()['team'],
          };
        });
      console.log(this.employeeList);
    });
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