import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Service } from '../services/service.service';
@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.page.html',
  styleUrls: ['./update-service.page.scss'],
})

export class UpdateServicePage implements OnInit {
  
  updateServiceForm: FormGroup;
  isSubmitted = false;

  constructor(public fb: FormBuilder, public authService: AuthService, private myUpdate: Service) {
    this.updateServiceForm = new FormGroup({
      DealershipName: new FormControl('', Validators.required),
      TeamName: new FormControl('', Validators.required),
      ServiceTypeName: new FormControl('', Validators.required)
    });
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.updateServiceForm.valid){
      return false;
    }
    else{
      console.log(this.updateServiceForm.value);
    }
    return false;
  }

  ngOnInit() {
    this.updateServiceForm.setValue({DealershipName: '', TeamName: '', ServiceTypeName: ''});
  }

  get errorControl() {
    return this.updateServiceForm.controls;
  }
  UpdateService() {
    
      alert("A service has been updated successfully.")
      console.log(this.updateServiceForm.value);
    }
  }
