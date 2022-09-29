import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryService } from '../services/History.service';
import { AlertController } from '@ionic/angular';
import { VehicleService } from '../models/VehicleService';
import { Dealership } from '../models/Dealership';
import { Clients } from '../models/Clients';
import { Team } from '../models/Team';
import { Vehicle } from '../models/Vehicle';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  
  deleteModal: HTMLElement;
  history: HistoryData;
  HistoryList = [];
  historyForm: FormGroup;
  searchTerm: string;
  id: any;
  data: any;
  serviceHistory: VehicleService;
  dealership: Dealership;
  team: Team;
  client: Clients;
  vehicle: Vehicle;

  constructor(public authService: AuthService, private _historyservice: HistoryService, public fb: FormBuilder, 
     public alertCtrl: AlertController) { 
      this.history = {} as HistoryData;
    }
    

  ngOnInit() {
    this.historyForm = this.fb.group({
      VIN_Number: ['', [Validators.required]],
      Service_Type: ['', [Validators.required]],
      Date: ['', [Validators.required]]   
    });

    this._historyservice.getServiceList().subscribe(response => {
      console.log(response);
      this.data = response;
    });
  } 

/*
  getallServices(){
    this._historyservice.getServiceList().subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }
*/

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
          this._historyservice.deleteService(id);
          alert('Service was successfully removed');
        }
      }]
    });
    confirmDeleteAlert.present();
  }

  getReport() {
    let docDefinition = {  
      header: {
        margin: 10,
        columns: [
            {
              image:{
              style:'width: 12vw; height: 12vh; padding: 0.2rem; margin-left: -1vw;', 
              src:'assets/icon/bmw-logo-2020-grey.png',}
            },
            {
              margin: [10, 0, 0, 0],
              text: 'Service History',  
              fontSize: 20,  
              float: 'right',  
              color: '#000000' 
            }
        ]
      },
      content: [
        {
          columns: [  
            [  
              {  
                  text: 'Client Details',  
                  style: 'sectionHeader'
              },  
              { text: 'HA92MS92' }
            ],
            [  
                {  
                    text: 'VIN Number',  
                    style: 'sectionHeader'
                },  
                { text: 'HA92MS92' }
            ]
          ], 
        },
        {  
          text: ' ',  
          style: 'sectionHeader'  
        },
        {
          table: {
            headerRows: 1,
            width: ['*', 'auto', 'auto', 'auto'],
            body: [
              [{text:'Service: '}],
              [{text:'Dealership: ', bold: true,}],
              [{text:'Team: ', bold: true,}],
              [{text:'Service Type: ', bold: true,}],
            ]
          },
          layout: 'noBorders',
          style: 'superMargin'
        },
      ],
      styles: {  
        sectionHeader: {  
            bold: true, 
            fontSize: 16,  
            margin: [0, 15, 0, 15]  
        },
        superMargin: {
          margin: [20, 0, 40, 0],
        }  
      }
    };  
    pdfMake.createPdf(docDefinition).download();
    pdfMake.createPdf(docDefinition).open();
  }
}