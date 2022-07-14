import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-capture-initial-inspection-details',
  templateUrl: './capture-initial-inspection-details.page.html',
  styleUrls: ['./capture-initial-inspection-details.page.scss'],
})
export class CaptureInitialInspectionDetailsPage implements OnInit {

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
}
