import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  Form,
} from '@angular/forms';
import { ServiceNoteService } from '../services/servicenote.service';
import { Router, NavigationExtras } from '@angular/router';
import { stringify } from 'querystring';
import { CancelServicePage } from '../cancel-service/cancel-service.page';
import { AlertController } from '@ionic/angular';

interface ServiceNotes {
  ItemName: string;
  Description: string;
}

@Component({
  selector: 'app-view-service-note',
  templateUrl: './view-service-note.page.html',
  styleUrls: ['./view-service-note.page.scss'],
})
export class ViewServiceNotePage implements OnInit {
  serviceNoteList = [];

  serviceNoteForm: FormGroup;
  services: ServiceNoteService;
  searchTerm: string;
  ServiceData: ServiceNotes;

  constructor(
    public authService: AuthService,
    private _serviceNote: ServiceNoteService,
    public router: Router,
    private fb: FormBuilder,
    private alertController: AlertController
  ) {
    this.ServiceData = {} as ServiceNotes;
  }

  ngOnInit() {
    this.serviceNoteForm = this.fb.group({
      ItemName: ['', [Validators.required]],
      Description: ['', [Validators.required]],
    });

    this._serviceNote.getServiceNotes().subscribe((data) => {
      this.serviceNoteList = data.map((e) => {
        return {
          ItemName: e.payload.doc.data()['ItemName'],
          Description: e.payload.doc.data()['Description'],
        };
      });
      console.log(this.serviceNoteList);
    });
  }
  async concludeServiceAlert() {
    const alert = await this.alertController.create({
      header: 'Conclude Service',
      message: 'Are you sure you would like to end this service?',
      buttons: ['Conclude', 'Back'],
    });

    await alert.present();
  }
}
