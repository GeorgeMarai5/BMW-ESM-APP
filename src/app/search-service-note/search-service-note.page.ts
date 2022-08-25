import { Component, OnInit } from '@angular/core';
import { ModelService } from '../models/ModelService';
import { AuthService } from '../services/auth.service';
import { ServiceNoteService } from '../services/servicenote.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-search-service-note',
  templateUrl: './search-service-note.page.html',
  styleUrls: ['./search-service-note.page.scss'],
})
export class SearchServiceNotePage implements OnInit {
  deleteModal: HTMLElement;
  services: ModelService;
  serviceNoteList = [];
  serviceForm: FormGroup;
  searchTerm: string;
  id: any;
  serviceNote: string;

  constructor(public authService: AuthService, private _serviceNote: ServiceNoteService, public fb: FormBuilder,
    private firestore: AngularFirestore, public alertCtrl: AlertController) {
    
      this.services = {} as ModelService;
  }

  ngOnInit() {
    this.serviceForm = this.fb.group({
      NoteID: ['', [Validators.required]],
      ServiceID: ['', [Validators.required]],
      Desscription: ['', [Validators.required]],
    });

    this._serviceNote.getServiceNotes().subscribe((data) => {
      this.serviceNoteList = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ServiceID: e.payload.doc.data()['ServiceID'],
          NoteID: e.payload.doc.data()['NoteID'],
          Description: e.payload.doc.data()['Description'],
        };
      });
      console.log(this.serviceNoteList);
    });
  }
  
  async removeServiceNote(id) {
    const confirmDeleteAlert = await this.alertCtrl.create({
      header: 'Remove Service',
      message:
        'Are you sure you would like to remove this service from the system?',
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
            this._serviceNote.deleteServiceNote(id);
            alert('Service was successfully removed');
          },
        },
      ],
    });

    confirmDeleteAlert.present();
  }
}
