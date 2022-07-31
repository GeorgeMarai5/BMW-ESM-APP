import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ServiceNoteService } from '../services/servicenote.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
interface ServiceNoteData {
  Description: string;
}

@Component({
  selector: 'app-create-service-note',
  templateUrl: './create-service-note.page.html',
  styleUrls: ['./create-service-note.page.scss'],
})
export class CreateServiceNotePage implements OnInit {
  services: ServiceNoteService;
  serviceNoteList = [];
  addNoteForm: FormGroup;
  searchTerm: string;
  deleteModal: HTMLElement;
  isSubmitted = false;
  data: any;

  today = new Date();

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public firestore: AngularFirestore,
    public authService: AuthService,
    public fb: FormBuilder,
    private _serviceNote: ServiceNoteService
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
    } else {
      const serviceNote = {
        Description: this.addNoteForm.get('Description').value,
      };
      console.log(serviceNote);
      this.firestore
        .collection('Service_Note')
        .add(serviceNote)
        .then(function (docRef) {
          alert('Service Note has been created successfully');
          const serviceNoteID = {
            serviceNoteID: docRef.id,
          };
        });
      this.router.navigate(['/tabs/assign/dealership', '5KhjLkr2TKc0LYc2pQ4v']);
    }
  }
  ngOnInit() {
    this.addNoteForm.setValue({ Description: '' });
  }
  get errorControl() {
    return this.addNoteForm.controls;
  }
}
