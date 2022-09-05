import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryService } from '../services/History.service';
import { AlertController } from '@ionic/angular';
import { ModelService } from '../models/ModelService';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Dealership } from '../models/Dealership';
import { Clients } from '../models/Clients';
import { Team } from '../models/Team';
import { Vehicle } from '../models/Vehicle';
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
  
  fileName:string;
  deleteModal: HTMLElement;
  history: HistoryData;
  HistoryList = [];
  historyForm: FormGroup;
  searchTerm: string;
  id: any;
  data: any;
  serviceHistory: ModelService;
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

  generatePdf(action = 'open') {
    const documentDefinition = this.getDocumentDefinition();
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;
      default: pdfMake.createPdf(documentDefinition).open(); break;
    }
  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("src\assets\icon\bmw-logo-2020-grey.png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }

  async getDocumentDefinition() {
    sessionStorage.setItem('service', JSON.stringify(this.serviceHistory));​    
    return {
      content: [
        {
          image: await this.getBase64ImageFromURL("src\assets\icon\bmw-logo-2020-grey.png"),      
          alignment: 'left',
          margin: [0, 0, 0, 20]
        },
        {
          text: 'Service History',
          bold: true,
          fontSize: 20,
          alignment: 'right',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
          [{
            text: 'Client Details',
            style: 'Details'
          },
          {
            text: this.client.FirstName + ' ' + this.client.LastName,
            style: 'Name'
          },
          {
            text: this.client.Email,
            style: 'Email'
          },
          {
            text: this.client.PhoneNumber,
            style: 'PhoneNum'
          }
          ]
        ],
        align: 'left'
      },
      {
        columns: [
        [{
          text: 'VIN Number',
          style: 'VINNumber'
        },
        {
          text: this.vehicle.VINNumber,
          style: 'Vehicle'
        }
        ]
      ],
      align: 'right'
      },
        {
          columns: [
            [{
              text: this.serviceHistory.Date,
              style: 'Date'
            },
            {
              text: this.dealership.DealershipName,
              style: 'Dealership'
            },
            {
              text: 'Team Name : ' + this.team.TeamName,
              style: 'TeamName'
            },
            {
              text: 'Service Type : ' + this.serviceHistory.ServiceTypeName,
              style: 'ServiceType'
            }
            ]
          ]
        }],
      info: {
        title: this.serviceHistory.ServiceID + '_SERVICE_HSTORY',
        author: this.team.TeamName,
        subject: 'SERVICE_HSTORY',
        keywords: 'SERVICE_HSTORY',
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        Details: {
          fontSize: 16,
          bold: true
        },
        Name: {
          fontSize: 12,
          bold: true
        },
        Email: {
          fontSize: 12,
          bold: true
        },
        PhoneNum: {
          fontSize: 12,
          bold: true
        },
        VINNUmber: {
          fontSize: 16,
          bold: true
        },
        Vehicle: {
          fontSize: 12,
          bold: true
        },
        Date: {
          fontSize: 16,
          bold: true
        },
        Dealership: {
          fontSize: 12,
          bold: true
        },
        TeamName: {
          fontSize: 12,
          bold: true
        },
        ServiceType: {
          fontSize: 12,
          bold: true
        },
        tableHeader: {
          bold: true,
        }
      }
    };
  }

  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
}