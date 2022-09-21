import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ServiceNoteService } from '../services/servicenote.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Service } from '../services/service.service';
import { Service_Note } from '../models/Service_Note'

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
  addNoteForm: FormGroup = this.fb.group({
    Description: ['', [Validators.required]]
  })
  services: ServiceNoteService;
  serviceNoteList = [];

  searchTerm: string;
  deleteModal: HTMLElement;
  isSubmitted = false;

serviceNotes : any;
  today = new Date();




  constructor (private route: ActivatedRoute, public router: Router, public httpClient: HttpClient,
    public authService: AuthService, public fb: FormBuilder, private _serviceNote: ServiceNoteService
  ) {
    this.data = new Service_Note();
    // _serviceNote = {} as ServiceNoteService;
 
    // this.route.params.subscribe((params) => {});
    // this.addNoteForm = new FormGroup({
    //   Description: new FormControl('', [Validators.required]),
    // });
  }

  // submitForm() {
  //   this.isSubmitted = true;
  //   if (!this.addNoteForm.valid) {
  //     return false;
  //   } else {
  //     const serviceNote = {
  //       Description: this.addNoteForm.get('Description').value,
  //     };
  //     console.log(serviceNote);
    //   this.httpClient.get(serviceNote)
    //     .then(function (docRef) {
    //       alert('Service Note has been created successfully');
    //       const serviceNoteID = {
    //         serviceNoteID: docRef.id,
    //       };
    //     });
    //   this.router.navigate(['/tabs/assign/dealership', '5KhjLkr2TKc0LYc2pQ4v']);
    // }
  
    
  ngOnInit() {
    // this._serviceNote.createServiceNote(this.data).subscribe(res =>{
    //   console.log(res);
    // })
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
    }
  

  submitForm() {
    this._serviceNote.createServiceNote(this.data).subscribe((response) => {
      this.router.navigate(['/tabs/search/service-note']);
    });
console.log(this.data)
  }
  // createServiceNote(){
  //   if(this.addNoteForm.valid){
     
  //     this._serviceNote.createServiceNote(this.addNoteForm.value).subscribe(()=>{
  //       this.addNoteForm.reset();
  //       this.router.navigate(['']).then((navigated: boolean)=>{
  //         if(navigated){
  //           alert(this.addNoteForm.value);
  //           console.log("it works");
  //         }
  //       })
  //     })
  //   }
  // }

  get errorControl() {
    return this.addNoteForm.controls;
  }
}