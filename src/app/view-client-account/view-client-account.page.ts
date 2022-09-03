import { ToastController } from '@ionic/angular';
import { Clients } from '../models/Clients';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ClientService } from '../services/Client.service';

@Component({
  selector: 'app-view-client-account',
  templateUrl: './view-client-account.page.html',
  styleUrls: ['./view-client-account.page.scss'],
  
})
export class ViewClientAccountPage implements OnInit {

  clients: Clients;
  client = [];
  viewClientForm: FormGroup;
  isSubmitted = false;
  data: any;
  editVehicleForm: FormGroup;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, public firestore: AngularFirestore,
    public router: Router, public service: ClientService,private toastCtrl: ToastController) {
      this.route.params.subscribe(params => {
        this.data = params.id;
    });

      this.viewClientForm = new FormGroup({
        Title: new FormControl('', Validators.required),
        FirstName: new FormControl('', Validators.required),
        LastName: new FormControl('', Validators.required),
        PhoneNumber: new FormControl('', Validators.required),
        Email: new FormControl('', Validators.required),
        Address: new FormControl('', Validators.required)
      });
     }
     
  ngOnInit() {
    this.service.getClient(this.data).valueChanges().subscribe(res =>{
      console.log(res)
        this.viewClientForm.setValue({
        Title: res['title'], 
        FirstName: res['firstName'], 
        LastName: res['lastName'],
        PhoneNumber: res['phoneNum'],
        Email: res['email'],
        Address: res['address']
      })
    });
  }

  async removeAlert(){
    let toast = await this.toastCtrl.create({
      message: 'The client was removed',
      duration: 3000,
      position: 'top',
    });
  }

  navToUpdate() {
    this.router.navigate(['tabs/update/client', this.data]);
  }

  RemoveClient(ID) {
    if (window.confirm('Do you really want to Remove This Client?')) {
      this.service.delete_Client(ID);
    }
    
    console.log(ID)
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Client has been removed successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}