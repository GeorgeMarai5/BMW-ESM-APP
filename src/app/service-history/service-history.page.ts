import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryService } from '../services/History.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import jsPDF from 'jspdf';
//import autoTable from 'jspdf-autotable';

interface HistoryData {
  $key: string;
  VIN_Number: number;
  Service_Type: string;
  Date: string;
 
  
}
@Component({
  selector: 'app-service-history',
  templateUrl: './service-history.page.html',
  styleUrls: ['./service-history.page.scss'],
})


export class ServiceHistoryPage implements OnInit {
  
  fileName:string;
  deleteModal: HTMLElement;
  history: HistoryData;
  HistoryList = [];
  historyForm: FormGroup;
  searchTerm: string;
  id: any;

  constructor(public authService: AuthService, private _historyservice: HistoryService, public fb: FormBuilder, 
    private firestore: AngularFirestore, public alertCtrl: AlertController) { 
      this.history = {} as HistoryData;
    }
    

  ngOnInit() {
    this.historyForm = this.fb.group({
      VIN_Number: ['', [Validators.required]],
      Service_Type: ['', [Validators.required]],
      Date: ['', [Validators.required]]   
    });

    this._historyservice.gethistory().subscribe(data => {
      this.HistoryList = data.map(e => {
        return {
          id: e.payload.doc.id,
          VIN_Number: e.payload.doc.data()['VIN_Number'],
          Service_Type: e.payload.doc.data()['Service_Type'],
          Date: e.payload.doc.data()['Date']

        };
      });
      console.log(this.HistoryList);
    });
  }

  async removeService(id){
    const confirmDeleteAlert = await this.alertCtrl.create({
      header: 'Remove Service',
      message: 'Are you sure you would like to remove this service from the system?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: end => {
          this.alertCtrl.dismiss();
        }
      },
      {
        text: 'Remove',
        role: 'remove',
        handler: () => {
          this._historyservice.deletehistory(id);
          alert('Service was successfully removed');
        }
      }]
    });
    confirmDeleteAlert.present();
  }

  generatePdf() {
      var pdf = new jsPDF('p', 'pt', 'a4');
      var y = 20;
      pdf.setLineWidth(2);
      pdf.text('Service History Report', 200, y = y + 30);
      pdf.setFontSize(12);
      pdf.setTextColor(99);


      (pdf as any).autoTable({
        head: [['Vin Number', 'Service Type', 'Date']],
        body: this.HistoryList.map(({VIN_Number, ServiceType, Date}) => [VIN_Number, ServiceType, Date]),
        theme: 'grid',
        columnStyles: {
          0: {
            halign: 'right',
            tableWidth: 100,
          },
          1: {
            tableWidth: 100,  
          },
          }
    });

      pdf.output('dataurlnewwindow');
      pdf.save('Service_History_Report.pdf');

  }  
}