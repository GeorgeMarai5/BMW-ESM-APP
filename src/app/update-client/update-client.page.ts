import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
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
  
  updateClientForm: FormGroup;
  isSubmitted = false;
  titles = [];
  data: any;

  constructor(public fb: FormBuilder, public authService: AuthService, public toastCtrl: ToastController, public router: Router, public route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.data = params.id;
    });
    this.updateClientForm = new FormGroup({
      title: new FormControl('', Validators.required),
      fName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      lName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      phoneNum: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl()
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




