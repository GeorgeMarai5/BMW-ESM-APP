import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-dealership',
  templateUrl: './edit-dealership.page.html',
  styleUrls: ['./edit-dealership.page.scss'],
})
export class EditDealershipPage implements OnInit {

  editDealershipForm: FormGroup;
  isSubmitted = false;

  constructor(public fb: FormBuilder, public authService: AuthService) { 
    this.editDealershipForm = new FormGroup({
      dealershipName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required)
    })
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.editDealershipForm.valid){
      return false;
    }
    else{
      console.log(this.editDealershipForm.value);
    }
    return false;
  }

  ngOnInit() {
    this.editDealershipForm.setValue({dealershipName: '', address: ''});
  }

  get errorControl() {
    return this.editDealershipForm.controls;
  }

}
