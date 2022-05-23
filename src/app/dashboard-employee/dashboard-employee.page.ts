import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-dashboard-employee',
  templateUrl: './dashboard-employee.page.html',
  styleUrls: ['./dashboard-employee.page.scss'],
  template: `
    <mwl-gauge
      [max]="100"
      [dialStartAngle]="-90"
      [dialEndAngle]="-90.001"
      [value]="50"
      [animated]="true"
      [animationDuration]="1"
    >
    </mwl-gauge>`
})
export class DashboardEmployeePage implements OnInit {
  
  constructor(
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

  }

}