import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl } from "@angular/forms";
import { Router,Route } from '@angular/router';
import { Clients } from '../models/Clients';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../services/Client.service';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.page.html',
  styleUrls: ['./update-client.page.scss'],
})

export class UpdateClientPage implements OnInit {
  
  updateClientForm: UntypedFormGroup;
  isSubmitted = false;
  titles = [];
  data: any;

  constructor(public fb: UntypedFormBuilder, public authService: AuthService, public toastCtrl: ToastController, public router: Router, public route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.data = params.id;
    });
    this.updateClientForm = new UntypedFormGroup({
      title: new UntypedFormControl('', Validators.required),
      fName: new UntypedFormControl('', [Validators.required, Validators.maxLength(20)]),
      lName: new UntypedFormControl('', [Validators.required, Validators.maxLength(20)]),
      phoneNum: new UntypedFormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      address: new UntypedFormControl()
    });
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.updateClientForm.valid){
      return false;
    }
    else{
      console.log(this.updateClientForm.value);
      this.presentToast();
    }
    return false;
  }

  ngOnInit() {
    this.updateClientForm.setValue({title: '', fName: '', lName: '', phoneNum: '', email: '', address: ''});
  }

  back(){
    this.router.navigate(['tabs/view/client', this.data]);
  }

  get errorControl() {
    return this.updateClientForm.controls;
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Client has been updated successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}




