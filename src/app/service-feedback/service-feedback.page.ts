import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { VehicleFeedbackReportComponent } from 'app/components/vehicle-feedback-report/vehicle-feedback-report.component';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas'
import { ChartOptions } from 'chart.js';

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
  // tableChartOptions : ChartOptions = {
  //   responsive: true
  // }
  
  // tableChartLabels: Label[] = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
  // tableChartType: Chart.ChartType = 'table';
  // tableChartLegend = true;
  // tableChartPlugins = [];
  
  // tableChartData : Chart.ChartDataSets[] = [
  //   { data: [45, 45, 37, 60, 40, 50], label: 'Series A'},
  //   { data: [48, 60, 32, 60, 60, 50], label: 'Series B'},
  //   { data: [70, 90, 33, 60, 50, 50], label: 'Series C'},
  // ]
  @ViewChild('serviceFeedbackData') htmlData:ElementRef | any;
downloadPDF(){
  // console.log("Printing PDF");
  // const doc = new jsPDF; 
    let Data = document.getElementById('serviceFeedbackData')!;
  
    html2canvas(Data).then(canvas => {
      let fileWidth = 210;
      let fileHeight = canvas.height * fileWidth / canvas.width;
  
      const contentDataUrl = canvas.toDataURL('image/png');
  
      let PDF = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      });
  
      let topPosition = 10;
      let leftPosition = 0;
  
      PDF.addImage(contentDataUrl, 'PNG', leftPosition, topPosition, fileWidth, fileHeight);
      PDF.save('Service-Feedback.pdf');
    }
    )
}
  // let data = document.getElementById("serviceFeedback");
  // doc.text("Hello world!", 10, 10);
  // this.generatePDF(data);
  // doc.save('Service-Feedback.pdf')
  


// async generatePDF(htmlContent){
// // html2canvas(htmlContent).then (canvas =>{
// //   let pdf = new jsPDF('l', 'mm','a4');
// //   pdf.save('Service-Feedback.pdf');
// })

  // async openInvoice(feedback) {
  //   const InvoiceModal = await this.createModal(VehicleFeedbackReportComponent, { feedback });
  //   await InvoiceModal.present();
  // }

  // async createModal(component, componentProps?, cssClass?): Promise<HTMLIonModalElement> {
  //   const modal = await this.modalCtrl.create({
  //     component,
  //     cssClass,
  //     componentProps,
  //     backdropDismiss: true
  //   });
  //   return modal;
  // }

  
}