import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  constructor(public authService: AuthService, public router: Router, public formBuilder: FormBuilder) { }
  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  ngOnInit() {
  }
  createAccount(email, password){
    this.authService.RegisterUser(email.value, password.value)      
    .then((res) => {
      // Do something here
      this.matching_passwords_group = new FormGroup({
        password: new FormControl('', Validators.compose([
          Validators.minLength(8),
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ])),
        confirm_password: new FormControl('', Validators.required)
      }, (formGroup: FormGroup) => {
        return AuthService.areEqual(formGroup);
      });
      this.validations_form = this.formBuilder.group({
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        matching_passwords: this.matching_passwords_group,
      });
      const validation_messages = {
        'email': [
          { type: 'required', message: 'Email is required.' },
          { type: 'pattern', message: 'Please enter a valid email.' }
        ],
        'password': [
          { type: 'required', message: 'Password is required.' },
          { type: 'minlength', message: 'Password must be at least 8 characters long.' },
          { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
        ],
        'confirm_password': [
          { type: 'required', message: 'Confirm password is required.' }
        ],
        'matching_passwords': [
          { type: 'areEqual', message: 'Password mismatch.' }
        ],
      
      };
      
    }).catch((error) => {
      window.alert(error.message)
    })
  }
}
