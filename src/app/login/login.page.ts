import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})



export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;

  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router) { 
    this.loginForm = new FormGroup({
      accountType: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }


  ngOnInit() {


  }

  logIn(email, password, accountType) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        if(this.authService.isEmailVerified) {
          if(accountType.value == 'Client'){
            this.router.navigate(['/tabs/dashboard/client']); 
          }
          else if(accountType.value == "Employee"){
            this.router.navigate(['/tabs/dashboard-employee']); 
          }       
        } else {
          window.alert('Email is not verified')
          return false;
        }

      }).catch((error) => {
        window.alert(error.message)
      })

  }

  get errorControl() {
    return this.loginForm.controls;
  }
}
