import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { Service } from '../services/service.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';
import { AlertController, ToastController } from '@ionic/angular';
import jsPDF from 'jspdf';

// interface ServiceData {
//   ServiceID: number;
//   DealershipName: string;
//   TeamName: string;
//   ServiceType: string;
//   ServiceStatus: string;

// }

interface ServiceVehicles {
  VehicleID: number;
  DealershipName: string;
  TeamName: string;
  ServiceTypeName: string;
  ServiceStatus: string;
}

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.page.html',
  styleUrls: ['./view-service.page.scss'],
})
export class ViewServicePage implements OnInit {
  
  serviceList = [];
  viewServiceForm: FormGroup;
  services: Service;
  searchTerm: string;
  ServiceData: ServiceVehicles;
  data: any;

  constructor(public authService: AuthService, private _service: Service, public router: Router, private fb: FormBuilder,
    private alertController: AlertController, public toastCtrl: ToastController, public route: ActivatedRoute) {
      this.route.params.subscribe(params => {
        this.data = params.id;
    });
    this.viewServiceForm = new FormGroup({
      ServiceID: new FormControl('', [Validators.required]),
      DealershipName: new FormControl('', [Validators.required]),
      TeamName: new FormControl('', [Validators.required]),
      ServiceType: new FormControl('', [Validators.required]),
      ServiceStatus: new FormControl('', [Validators.required]),
    })

      this.ServiceData = {} as ServiceVehicles;

  }

  ngOnInit() {

    this._service.getServices().subscribe((data) => {
      this.serviceList = data.map((e) => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          ServiceID: e.payload.doc.data()['ServiceID'],
          DealershipName: e.payload.doc.data()['DealershipName'],
          TeamName: e.payload.doc.data()['TeamName'],
          ServiceType: e.payload.doc.data()['ServiceType'],
          ServiceStatus: e.payload.doc.data()['ServiceStatus'],
        };
      });
      console.log(this.serviceList);
    });
  }

  async captureInspection(){
    this.router.navigate(['tabs/capture-initial-inspection-details', this.data]);
  }

  async concludeServiceAlert() {
    const alert = await this.alertController.create({
      header: 'Conclude Service',
      message: 'Are you sure you would like to end this service?',
      buttons: ['Conclude', 'Back'],
    });

    await alert.present();
  }

  generatePdf() {
      var pdf = new jsPDF('p', 'pt', 'a4');
      var y = 20;
      pdf.setLineWidth(2);
      pdf.text('End Of Service Report', 200, y = y + 30);
      pdf.setFontSize(12);
      pdf.setTextColor(99);


      (pdf as any).autoTable({
        theme: 'grid',
        head: [['VIN Number', 'Service ID', 'Service Type', 'Date']],
        body: this.serviceList.map(({VIN_Number, ServiceID, ServiceType, Date}) => [VIN_Number, ServiceID, ServiceType, Date]),
        columnStyles: {
          0: {
            halign: 'right',
            tableWidth: 10,
          },
          1: {
            tableWidth: 10,  
          },
          },
    });

      pdf.output('dataurlnewwindow');
      pdf.save('Service_History_Report.pdf');
      
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Service has been concluded successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}