import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-assign-dealership',
  templateUrl: './assign-dealership.page.html',
  styleUrls: ['./assign-dealership.page.scss'],
})
export class AssignDealershipPage implements OnInit {

  assignDealershipForm: FormGroup;
  isSubmitted = false;

  constructor(public fb: FormBuilder, public authService: AuthService) { 
    this.assignDealershipForm = new FormGroup({
      dealershipName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required)
    })
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.assignDealershipForm.valid){
      return false;
    }
    else{
      console.log(this.assignDealershipForm.value);
    }
    return false;
  }

  ngOnInit() {
    this.assignDealershipForm.setValue({dealershipName: '', address: ''});
  }

  get errorControl() {
    return this.assignDealershipForm.controls;
  }

}
