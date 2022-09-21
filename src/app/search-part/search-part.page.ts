import { Component, OnInit } from '@angular/core';
import { Part } from '../models/Part';
import { AuthService } from '../services/auth.service';
import { PartInfoService } from '../services/part-info.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-part',
  templateUrl: './search-part.page.html',
  styleUrls: ['./search-part.page.scss'],
})
export class SearchPartPage implements OnInit {
  parts: Part;
  partList = [];
  partForm: FormGroup;
  searchTerm: string;

  constructor(public authService: AuthService, private service: PartInfoService, public fb: FormBuilder, private firestore: AngularFirestore, 
    public alertCtrl: AlertController, public router: Router, private httpClient: HttpClient) { 
      this.parts = {} as Part;
    }

  ngOnInit() {
    this.partForm = this.fb.group({
      PartID: ['', [Validators.required]],
      PartName: ['', [Validators.required]],
      Description: ['', [Validators.required]]
    });
    this.httpClient.get<any>("assets/vehicle-parts.json").subscribe((data)=>
      this.partList = data
    )
  }
}