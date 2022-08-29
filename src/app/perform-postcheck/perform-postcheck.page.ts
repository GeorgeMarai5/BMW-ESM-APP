import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perform-postcheck',
  templateUrl: './perform-postcheck.page.html',
  styleUrls: ['./perform-postcheck.page.scss'],
})
export class PerformPostcheckPage implements OnInit {

  constructor(public toastCtrl: ToastController) { }

  ngOnInit() {
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Assigned Part has been updated successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}
