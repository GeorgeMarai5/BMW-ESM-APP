import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ServiceNoteService } from '../services/servicenote.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../services/service.service';
import { Service_Note } from '../models/Service_Note'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-service-note',
  templateUrl: './create-service-note.page.html',
  styleUrls: ['./create-service-note.page.scss'],
})

export class CreateServiceNotePage implements OnInit {

  serviceNotes: Service_Note
  addNoteForm: FormGroup
  serviceNoteList = [];
  searchTerm: string;
  deleteModal: HTMLElement;
  isSubmitted = false;
  data : any;
  serviceNote: Service_Note;
  today = new Date();

  constructor (private route: ActivatedRoute, 
    public router: Router, 
    public httpClient: HttpClient,
    public authService: AuthService, 
    public fb: FormBuilder, 
    private _serviceNote: ServiceNoteService, 
    public toastCtrl: ToastController) {

    _serviceNote = {} as ServiceNoteService;
    this.data = new Service_Note();

  }

  submitForm() {
    // this._serviceNote.createServiceNote(this.data).subscribe(response => {
    //   console.log(response);
    //   //this.router.navigate(['student-list']);
    // });
  
    // this.presentToast();
  }
  async createServiceNote(){

    this._serviceNote.createServiceNote(this.data).subscribe(response => {
      console.log(response);
      //this.router.navigate(['student-list']);
    });
  
    this.presentToast();
  
  }
  ngOnInit() {
    //if(this.authService.isLoggedIn){
    //  return true;
    //}
    //else{
    //  this.router.navigate(['/tabs/login']);
    //}
  }

  get errorControl() {
    return this.addNoteForm.controls;
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Service Note has been successfully created.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}