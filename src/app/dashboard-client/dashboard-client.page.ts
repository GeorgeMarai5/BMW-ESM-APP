import { Component, OnInit } from '@angular/core';
import { IonDatetime, Platform } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { AuthService } from "../services/auth.service";
import { Clients } from '../models/Clients';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.page.html',
  styleUrls: ['./dashboard-client.page.scss'],
})
export class DashboardClientPage implements OnInit {

  fleet = {
    name: 'Avis Hatfield',
    location: 'Hatfield'
  };
  service = {
    count: 5,
    type: '100 000km',
    date: '02/04/2022',
    price: 'R36 000'
  };
  client = {
    name: "George"
  };
  gaugeType = "semi";
  gaugeValue = 82;
  gaugeLabel = "Health";
  gaugeAppendText = "%";

  constructor(public router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    public authService: AuthService,
    public firestore: AngularFirestore
  ) {
    this.initializeApp();
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
  }
}