import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/Employee.service';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { employee } from '../models/Employee';

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
  employeeform: FormGroup;
  employee: employee;
  //public eventList: Clients[] = [];
  //ClientList: any;   //[]

  constructor(public employeeService: EmployeeService , private zone: NgZone,private toastCtrl: ToastController,private service: PostService, 
    public fb: FormBuilder,private router: Router, private route: ActivatedRoute, public authService: AuthService, private firestore: AngularFirestore) { 

      this.employee = {} as employee;

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
}