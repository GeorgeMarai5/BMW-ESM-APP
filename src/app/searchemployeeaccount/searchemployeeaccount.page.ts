import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { Clients } from '../models/Clients';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../services/Client.service';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-searchemployeeaccount',
  templateUrl: './searchemployeeaccount.page.html',
  styleUrls: ['./searchemployeeaccount.page.scss'],
})

export class SearchemployeeaccountPage implements OnInit {

  public clientList: any;
  clients: Clients;
  employeeform : FormGroup;

  constructor(public clientService: ClientService , private zone: NgZone, private toastCtrl: ToastController,
    private service: PostService, public fb: FormBuilder, private router: Router, private route: ActivatedRoute, 
    public authService: AuthService, private firestore: AngularFirestore) { 

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Employee has been removed successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}
