import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Vehicle } from 'src/app/models/Vehicle';

@Component({
  selector: 'app-view-service-progress',
  templateUrl: './view-service-progress.page.html',
  styleUrls: ['./view-service-progress.page.scss'],
})
export class ViewServiceProgressPage implements OnInit {

  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, public firestore: AngularFirestore,
    public router: Router, public service: VehicleService) {
      this.route.params.subscribe(params => {
          this.data = params.id;
      });
     }

  ngOnInit() {
    
  }
}
