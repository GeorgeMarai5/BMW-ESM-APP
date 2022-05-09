import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  constructor(public authService: AuthService, public router: Router, public userService: UserService, public firestore: AngularFirestore) { }

  ngOnInit() {
  }
  createAccount(email, password, accountType){
    this.authService.RegisterUser(email.value, password.value)
    .then(async(res) => {
      const user = {
        userType: accountType.value,
        email: email.value
      }
      await this.firestore.collection('User').add(user).then(function(){
        alert("New account created successfully");
      });
      if(accountType.value == 'Client'){
        const client = {
          address: '',
          title: '',
          firstName: email.value,
          lastName: '',
          email: email.value,
          phoneNum: ''
        }
        await this.firestore.collection('Client').add(client)
      }
      else if(accountType.value == 'Employee'){
        const employee = {
          email: email.value,
          name: email.value,
          phoneNum: '',
          QNumber: ''
        }
        await this.firestore.collection('Employee').add(employee)
      }
      this.authService.SendVerificationMail()
      this.router.navigate(['verify-email']);
    }).catch((error) => {
      window.alert(error.message)
    })
}
}
