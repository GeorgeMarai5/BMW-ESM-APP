import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  constructor(public authService: AuthService, public router: Router,public formBuilder: FormBuilder) { }

  ngOnInit() {
  }
  createAccount(email, password){
    this.authService.RegisterUser(email.value, password.value)
    .then((res) => {
      // Do something here
      this.authService.SendVerificationMail()
      this.router.navigate(['verify-email']);
    }).catch((error) => {
      window.alert(error.message)
    })
}
}
