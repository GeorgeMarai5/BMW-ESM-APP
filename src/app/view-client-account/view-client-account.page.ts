import { ToastController } from '@ionic/angular';
import { Clients } from '../models/Clients';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl } from "@angular/forms";
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
  viewClientForm: UntypedFormGroup;
  isSubmitted = false;
  data: any;
  editVehicleForm: UntypedFormGroup;

  constructor(private route: ActivatedRoute, public fb: UntypedFormBuilder, public authService: AuthService, public firestore: AngularFirestore,
    public router: Router, public service: ClientService,private toastCtrl: ToastController) {
      this.route.params.subscribe(params => {
        this.data = params.id;
    });

      this.viewClientForm = new UntypedFormGroup({
        Title: new UntypedFormControl('', Validators.required),
        FirstName: new UntypedFormControl('', Validators.required),
        LastName: new UntypedFormControl('', Validators.required),
        PhoneNumber: new UntypedFormControl('', Validators.required),
        Email: new UntypedFormControl('', Validators.required),
        Address: new UntypedFormControl('', Validators.required)
      });
     }
     
  ngOnInit() {
    
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

    /*
    if (window.confirm('Do you really want to Remove This Client?')) {
      this.service.deleteClient(ID);
    }
    
    console.log(ID)
    */
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