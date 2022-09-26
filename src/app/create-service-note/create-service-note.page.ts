import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ServiceNoteService } from '../services/servicenote.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Service } from '../services/service.service';
import { Service_Note } from '../models/Service_Note'
import { ToastController } from '@ionic/angular';

// interface ServiceNoteData {
//   Description: string;
// }

@Component({
  selector: 'app-create-service-note',
  templateUrl: './create-service-note.page.html',
  styleUrls: ['./create-service-note.page.scss'],
})

export class CreateServiceNotePage implements OnInit {

  data: Service_Note
  addNoteForm: FormGroup
  services: ServiceNoteService;
  serviceNoteList = [];
  searchTerm: string;
  deleteModal: HTMLElement;
  isSubmitted = false;
  serviceNotes : any;
  today = new Date();

  constructor (private route: ActivatedRoute, 
    public router: Router, 
    public httpClient: HttpClient,
    public authService: AuthService, 
    public fb: FormBuilder, 
    private _serviceNote: ServiceNoteService, 
    public toastCtrl: ToastController
  ) {

    this.route.params.subscribe((params) => {});
    this.addNoteForm = new FormGroup({
       Description: new FormControl('', [Validators.required]),
    });

  }

  submitForm() {
     this.isSubmitted = true;
     if (!this.addNoteForm.valid) {
       return false;
     } 
     else {
       const serviceNote = {
         Description: this.addNoteForm.get('Description').value,
       }
      this._serviceNote.createServiceNote(serviceNote)
      this.presentToast()
      }
    this.router.navigate(['/tabs/view/dealership']);
  }
    
  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
  }

  get errorControl() {
    return this.addNoteForm.controls;
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Service note has been successfully created.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}