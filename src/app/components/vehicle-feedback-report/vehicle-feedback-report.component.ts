import { Component, Input, OnInit } from '@angular/core';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-vehicle-feedback-report',
  templateUrl: './vehicle-feedback-report.component.html',
  styleUrls: ['./vehicle-feedback-report.component.scss'],
})
export class VehicleFeedbackReportComponent implements OnInit {

  constructor(private modalContrller: ModalController, private pdfGenerator: PDFGenerator) { }

  @Input() feedback;
  content: string;
  closeModal() {
    this.modalContrller.dismiss();
  }
  downloadInvoice() {
    this.content = document.getElementById('VehicleFeedback').innerHTML;
    let options = {
      documentSize: 'A4',
      type: 'share',
      fileName: 'Vehicle-Feedback-Report.pdf'
    };
    this.pdfGenerator.fromData(this.content, options)
      .then((base64) => {
        console.log('OK', base64);
      }).catch((error) => {
        console.log('error', error);
      });

  }
  ngOnInit() {
    console.log('Feedback Page', this.feedback);
  }
}
