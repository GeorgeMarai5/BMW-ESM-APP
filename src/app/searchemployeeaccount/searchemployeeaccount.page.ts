import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
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
  employeeform : FormGroup;

  constructor(public employeeService: EmployeeService , private zone: NgZone, private toastCtrl: ToastController,
    private service: PostService, public fb: FormBuilder, private router: Router, private route: ActivatedRoute, 
    public authService: AuthService, private firestore: AngularFirestore) { 

      this.employee = {} as Employee;

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
