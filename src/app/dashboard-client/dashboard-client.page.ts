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
    var coll = document.getElementsByClassName("collapsible");
    var i;
    let up = document.getElementById('up');
    let down = document.getElementById('down');

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
          down.style.display = "none";
          up.style.display = "block";
        } else {
          content.style.display = "block";
          up.style.display = "none";
          down.style.display = "block";
        }
      });
    }
  }
}