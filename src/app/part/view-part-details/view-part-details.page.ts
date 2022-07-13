import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Part } from 'src/app/models/Part';
import { PartInfoService } from 'src/app/services/part-info.service';

@Component({
  selector: 'app-view-part-details',
  templateUrl: './view-part-details.page.html',
  styleUrls: ['./view-part-details.page.scss'],
})
export class ViewPartDetailsPage implements OnInit {

  parts: Part;
  part = {};
  viewPartDetailsForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, public firestore: AngularFirestore,
    public router: Router, public service: PartInfoService) {
      this.route.params.subscribe(params => {
          this.data = params.id;
      });
      this.viewPartDetailsForm = new FormGroup({
        PartName: new FormControl('', Validators.required),
        Description: new FormControl('', Validators.required)
      })
     }

  ngOnInit() {
    this.service.getPart(this.data).valueChanges()
    .subscribe(res =>{
    console.log(res)
    this.viewPartDetailsForm.setValue({
      PartName: res['partName'], 
      Description: res['Description']
    })
    });
  }
}

