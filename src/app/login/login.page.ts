import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
  }
  createAccount(email, password){
    this.authService.RegisterUser(email.value, password.value)      
    .then((res) => {
      // Do something here
    }).catch((error) => {
      window.alert(error.message)
    })
  }
}
