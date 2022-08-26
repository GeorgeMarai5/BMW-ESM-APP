import { Component, OnInit } from '@angular/core';
import { Part } from 'src/app/models/Part';
import { AuthService } from 'src/app/services/auth.service';
import { PartInfoService } from 'src/app/services/part-info.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    public alertCtrl: AlertController, public router: Router) { 
      this.parts = {} as Part;
    }

  ngOnInit() {
    this.partForm = this.fb.group({
      PartID: ['', [Validators.required]],
      PartName: ['', [Validators.required]],
      Description: ['', [Validators.required]]
    });

    this.service.getParts().subscribe(data => {
      this.partList = data.map(e => {
        let yearCode: string;
        yearCode = e.payload.doc.data()['VIN_Number'];

        return {
          id: e.payload.doc.id,
          PartID: e.payload.doc.data()['PartID'],
          PartName: e.payload.doc.data()['PartName'],
          Description: e.payload.doc.data()['Description']
        };
      })
      console.log(this.partList);

    });
  }
}