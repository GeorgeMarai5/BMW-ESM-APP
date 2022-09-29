import { Component, OnInit, NgZone } from '@angular/core';
import { UntypedFormBuilder,Validators,UntypedFormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Employee } from 'app/models/Employee';
import { EmployeeService } from 'app/services/Employee.service';

@Component({
  selector: 'app-searchemployeeaccount',
  templateUrl: './searchemployeeaccount.page.html',
  styleUrls: ['./searchemployeeaccount.page.scss'],
})

export class SearchemployeeaccountPage implements OnInit {

  employeeList: any;
  searchTerm: string;
  employee: Employee;
  employeeform : UntypedFormGroup;

  constructor(public employeeService: EmployeeService , private zone: NgZone, private toastCtrl: ToastController,
    private service: PostService, public fb: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, 
    public authService: AuthService, private firestore: AngularFirestore) { 

      this.employee = {} as Employee;

  }

  ngOnInit() {
    this.employeeform = this.fb.group({
      Name: [''],
      Surname: [''],
      PhoneNumber: [''],
      Email: [''],
      Team: [''],
      Role: ['']
    });

    this.employeeService.getEmployeeList().subscribe(data =>{
      this.employeeList.subscribe(e => {
        return{
          id: e.payload.doc.id,
          Name: data.Name,
          Surname: data.Surname,
          PhoneNumber: data.PhoneNumber,
          Email: data.Email,
          Team: data.Team,
          Role: data.Role
          };
        });

      console.log(this.employeeList);

    });
  }

  async removeEmployee(id){

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
