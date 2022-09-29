import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../models/VehicleService';
import { AuthService } from '../services/auth.service';
import { ServiceNoteService } from '../services/servicenote.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-service-note',
  templateUrl: './search-service-note.page.html',
  styleUrls: ['./search-service-note.page.scss'],
})
export class SearchServiceNotePage implements OnInit {
  deleteModal: HTMLElement;
  services: VehicleService;
  serviceNoteList = [];
  serviceForm: FormGroup;
  searchTerm: string;
  serviceNoteID: any;
  serviceNote: string;
  data: any;

  constructor(public router: Router, public authService: AuthService, private _serviceNote: ServiceNoteService, public fb: FormBuilder,
    private firestore: AngularFirestore, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    
      this.services = {} as VehicleService;
  }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
    // this.serviceForm = this.fb.group({
    //   NoteID: ['', [Validators.required]],
    //   ServiceID: ['', [Validators.required]],
    //   Desscription: ['', [Validators.required]],
    // });
  }

//     this._serviceNote.getServiceNoteList().subscribe((data) => {
//       this.serviceNoteList = data.map((e) => {
//         return {
//           id: e.payload.doc.id,
//           ServiceID: e.payload.doc.data()['ServiceID'],
//           NoteID: e.payload.doc.data()['NoteID'],
//           Description: e.payload.doc.data()['Description'],
//         };
//       });
//       console.log(this.serviceNoteList);
//     });
//   }
async getAllServiceNotes(){

  this._serviceNote.getServiceNoteList().subscribe(response => {
    console.log(response);
    this.data = response;
  })
}

   async removeServiceNote(serviceNoteID) {
     const confirmDeleteAlert = await this.alertCtrl.create({
       header: 'Remove Service',
       message:
        'Are you sure you would like to remove this Service Note from the system?',
       buttons: [
         {
           text: 'Cancel',
           role: 'cancel',
           handler: (end) => {
             this.alertCtrl.dismiss();
           },
         },
         {
           text: 'Remove',
           role: 'remove',
           handler: () => {
             this._serviceNote.deleteServiceNote(serviceNoteID);
             this.presentToast();
           },
         },
       ],
     });

     confirmDeleteAlert.present();
   }

   async presentToast() {
     let toast = await this.toastCtrl.create({
       message: 'Service Note has been removed successfully.',
       duration: 3000,
       position: 'top'
     });
  
     toast.present();
   }
 }
