import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgxGauge } from 'ngx-gauge'
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard-employee',
  templateUrl: './dashboard-employee.page.html',
  styleUrls: ['./dashboard-employee.page.scss'],
})
export class DashboardEmployeePage implements OnInit {
  
  team = [];
  gaugeType = "semi";
  gaugeValue = 28.3;
  gaugeLabel = "Completion";
  gaugeAppendText = "%";

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public authService: AuthService,
    public firestore: AngularFirestore,
    public router: Router
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

  async viewTeam(id){
    if(id != null){
      this.router.navigate(['tabs/view/fleet', id]);
    }
    else{
      this.router.navigate(['tabs/create/fleet']);
    }
  }

}