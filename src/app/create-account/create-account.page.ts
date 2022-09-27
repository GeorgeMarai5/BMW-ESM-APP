import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { UserService, User } from '../services/user.service';
import { getAuth } from "firebase/auth";
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { ClientService } from 'app/services/Client.service';
import { EmployeeService } from 'app/services/Employee.service';
import { Clients } from 'app/models/Clients';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  createAccountForm: FormGroup;
  isSubmitted = false;
  client: Clients;
  data: any;

  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router, public userService: UserService, 
    public firestore: AngularFirestore, public toastCtrl: ToastController, public clientService: ClientService, public employeeService: EmployeeService) {
    this.createAccountForm = new FormGroup({
      accountType: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    }, { validators: this.passwordMatchingValidatior });
   }

  ngOnInit() {
  }

  passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password?.value === confirmPassword?.value ? null : { notmatched: true };
  };

  createAccount(email, password, accountType){
    this.isSubmitted = true;
    if(!this.createAccountForm.valid){
      return false;
    }
    else{
      this.authService.RegisterUser(email.value, password.value)
    .then(async(res) => {
      const user = {
        userType: accountType.value,
        email: email.value
      }
      await this.firestore.collection('User').add(user).then(function(){
        this.presentToast();
        this.authService.SendVerificationMail()
        this.router.navigate(['verify-email']);
      });

      const auth = getAuth();
      const currUser = auth.currentUser;

      if(accountType.value == 'Client'){
        const client = {
          address: '',
          Title: '',
          FirstName: email.value,
          LastName: '',
          Email: email.value,
          PhoneNumber: ''
        }
        await this.clientService.createClient(client);
      }
      else if(accountType.value == 'Employee'){
        const employee = {
          Name: email.value,
          Surname: '',
          PhoneNumber: '',
          Email: email.value,
          Team: '',
          Role: ''
        }
        await this.employeeService.createEmployee(employee);
      }
    }).catch((error) => {
      
    })
    }
    this.router.navigate(['/tabs/login']); 
    return false; 
  }

  get errorControl() {
    return this.createAccountForm.controls;
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Account has been created successfully created.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}
