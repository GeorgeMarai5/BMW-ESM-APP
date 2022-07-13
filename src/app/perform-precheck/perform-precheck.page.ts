import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-perform-precheck',
  templateUrl: './perform-precheck.page.html',
  styleUrls: ['./perform-precheck.page.scss'],
})
export class PerformPrecheckPage implements OnInit {

  selectChecksForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, public firestore: AngularFirestore, 
    public service: VehicleService, public router: Router) { 
    this.route.params.subscribe(params => {
      this.data = params['id'];
    });
    
  }

  ngOnInit() {
  }

  get errorControl() {
    return this.selectChecksForm.controls;
  }
}
