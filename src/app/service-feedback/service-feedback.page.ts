import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { VehicleFeedbackReportComponent } from 'app/components/vehicle-feedback-report/vehicle-feedback-report.component';

@Component({
  selector: 'app-service-feedback',
  templateUrl: './service-feedback.page.html',
  styleUrls: ['./service-feedback.page.scss'],
})
export class ServiceFeedbackPage implements OnInit {

  constructor(public authService: AuthService,
    public fb: FormBuilder,
    public router: Router,
    private modalCtrl: ModalController) { }

 //public feedback = environment.orderData;
  ngOnInit() {
  }

  async openInvoice(feedback) {
    const InvoiceModal = await this.createModal(VehicleFeedbackReportComponent, { feedback });
    await InvoiceModal.present();
  }

  async createModal(component, componentProps?, cssClass?): Promise<HTMLIonModalElement> {
    const modal = await this.modalCtrl.create({
      component,
      cssClass,
      componentProps,
      backdropDismiss: true
    });
    return modal;
  }
}

