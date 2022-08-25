import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Vehicle } from 'src/app/models/Vehicle';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-service-progress',
  templateUrl: './view-service-progress.page.html',
  styleUrls: ['./view-service-progress.page.scss'],
})

export class ViewServiceProgressPage implements OnInit {
  
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, public firestore: AngularFirestore,
    public router: Router, public service: VehicleService, private alertController: AlertController) {
      this.route.params.subscribe((params) => {
        this.data = params.id;
      });
    }

  ngOnInit() {}

  async provideFeedbackAlert() {
    const alert = await this.alertController.create({
      header: 'Feedback',
      buttons: ['Submit', 'Cancel'],
      inputs: [
        {
          placeholder: 'Please enter your feedback here...',
        },
      ],
    });

    await alert.present();
  }
}
