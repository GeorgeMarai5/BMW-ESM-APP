import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.page.html',
  styleUrls: ['./dashboard-client.page.scss'],
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
export class DashboardClientPage implements OnInit {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public authService: AuthService
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