import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../models/Vehicle';
import { AlertController } from '@ionic/angular';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ServiceService } from 'app/services/service.service';
import { Clients } from 'app/models/Clients';
import { Dealership } from 'app/models/Dealership';
import { Team } from 'app/models/Team';
import { Quote } from 'app/models/Quote';
import { Service_Note } from 'app/models/Service_Note';
import { AssignedPart } from 'app/models/AssignedPart';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-service-invoice',
  templateUrl: './service-invoice.page.html',
  styleUrls: ['./service-invoice.page.scss'],
})
export class ServiceInvoicePage implements OnInit {

  serviceList = [];
  searchTerm: string;
  id: any;
  data: any;
  service: VehicleService;
  dealership: Dealership;
  team: Team;
  client: Clients;
  vehicle: Vehicle;
  invoice: Quote;
  note: Service_Note;
  serviceItem: AssignedPart;

  constructor(public authService: AuthService, public router: Router, private route: ActivatedRoute,
    private fb:FormBuilder, private _service: ServiceService) { 
      this.route.params.subscribe((params) => {
        this.data = params.id;
      });
    }

  ngOnInit() {
    // this._service.getServices().subscribe((data) => {
    //   this.serviceList = data.map((e) => {
    //     return {
    //       id: e.payload.doc.id,
    //       isEdit: false,
    //       ServiceID: e.payload.doc.data()['ServiceID'],
    //       DealershipName: e.payload.doc.data()['DealershipName'],
    //       TeamName: e.payload.doc.data()['TeamName'],
    //       ServiceType: e.payload.doc.data()['ServiceType'],
    //       ServiceStatus: e.payload.doc.data()['ServiceStatus'],
    //     };
    //   });
    //   console.log(this.serviceList);
    // });
  }

  getReport() {
    let docDefinition = {  
      header: {
        margin: 10,
        columns: [
            {
                margin: [0, 15, 0, 15],
                text: 'End Of Service Report',  
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
                style: 'sectionHeader',
                color: '#1976D2',
              },  
            { text: this.client.FirstName + ' ' + this.client.LastName},
            {text: this.client.Email},
            {text: this.client.PhoneNumber},
          ]
          ], 
        },
        {  
          text: ' \n ',  
          style: 'sectionHeader'  
        },
        {
          table: {
            headerRows: 1,
            width: ['*', 'auto', 'auto', 'auto'],
            body: [
              [{text: 'Service Items', style: 'tableHeader'}, {text: 'Quantity'}],
              [{text: this.serviceItem.PartName}, {text: this.serviceItem.Quanity}],
              [{text: 'Grand Total: ' + '\t' + this.invoice.Service_Price}],
          ]
          },
          layout: 'noBorders',
          style: 'superMargin'
        },
        { 
            text: 'Service Note',  
            style: 'sectionHeader' 
        },
        {
          stack: [
            {text: [
              this.note.Description,
            ]
            },
          ],
          style: 'superMargin'
        },
      ],
      styles: {  
        sectionHeader: {  
            bold: true,  
            decoration: 'underline',  
            fontSize: 14,  
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