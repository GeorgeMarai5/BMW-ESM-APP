import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { UserService, User } from '../services/user.service';
import { getAuth } from "firebase/auth";
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  createAccountForm: FormGroup;
  isSubmitted = false;

  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router, public userService: UserService, public firestore: AngularFirestore) {
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
        alert("New account created successfully");
      });

      const auth = getAuth();
      const currUser = auth.currentUser;

      if(accountType.value == 'Client'){
        const client = {
          address: '',
          title: '',
          firstName: email.value,
          lastName: '',
          email: email.value,
          phoneNum: ''
        }
        await this.firestore.collection('Client').doc(currUser.uid).set(client)
      }
      else if(accountType.value == 'Employee'){
        const employee = {
          email: email.value,
          name: email.value,
          phoneNum: '',
          QNumber: ''
        }
        await this.firestore.collection('Employee').doc(currUser.uid).set(employee)
      }
      this.authService.SendVerificationMail()
      this.router.navigate(['verify-email']);
    }).catch((error) => {
      window.alert(error.message)
    })
    }
    return false; 
  }

  get errorControl() {
    return this.createAccountForm.controls;
  }
}
