import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { GaugeChartComponent } from 'angular-gauge-chart'
@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.page.html',
  styleUrls: ['./dashboard-client.page.scss'],
})
export class DashboardClientPage implements OnInit {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
  ) {
    this.initializeApp();
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  public canvasWidth = 300
  public needleValue = 50
  public centralLabel = ''
  public name = 'Gauge chart'
  public bottomLabel = '65'
  public options = {
  hasNeedle: true,
  needleColor: 'gray',
  needleUpdateSpeed: 1000,
  arcColors: ['rgb(44, 151, 222)', 'lightgray'],
  arcDelimiters: [30],
  rangeLabel: ['0', '100'],
  needleStartValue: 50,

}
  ngOnInit() {

  }
}