import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryService } from '../services/History.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import jsPDF from 'jspdf';
//import * as html2canvas from 'html2canvas';
import html2canvas from 'html2canvas';

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
    })
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
    const div = document.getElementById("html2Pdf");
    const options = {background: "white", height: div.clientHeight, width: div.clientWidth};

    html2canvas(div, options).then((canvas) => {
        //Initialize JSPDF
        let doc = new jsPDF("p", "mm", "a4");
        //Converting canvas to Image
        let imgData = canvas.toDataURL("image/PNG");
        //Add image Canvas to PDF
        doc.addImage(imgData, "image/PNG", 10, 10, 200, 80, "history", 'MEDIUM', 0);

        let pdfOutput = doc.output();
        // using ArrayBuffer will allow you to put image inside PDF
        let buffer = new ArrayBuffer(pdfOutput.length);
        let array = new Uint8Array(buffer);
        for (let i = 0; i < pdfOutput.length; i++) {
            array[i] = pdfOutput.charCodeAt(i);
        }

        //Name of pdf
        const fileName = "example.pdf";

        // Make file
        doc.save(fileName);

    });
}









}


