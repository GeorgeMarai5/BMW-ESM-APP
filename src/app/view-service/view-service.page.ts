import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { VehicleService } from 'app/models/VehicleService';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';
import { AlertController, ToastController } from '@ionic/angular';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

/*
interface ServiceData {
    ServiceID: number;
    DealershipName: string;
    TeamName: string;
    ServiceType: string;
    ServiceStatus: string;
}
*/



@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.page.html',
  styleUrls: ['./view-service.page.scss'],
})
export class ViewServicePage implements OnInit {
  
  serviceList = [];
  viewServiceForm: FormGroup;
  services: ServiceService;
  searchTerm: string;
  ServiceData: VehicleService;
  data: any;
  vehicle = {
    VINNum: 'AHJS27HA39',
    Registration: '42641 GP',
    warrantyPlan: 'Standard'
  };

  constructor(public authService: AuthService, private _service: ServiceService, public router: Router, private fb: FormBuilder,
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

      this.ServiceData = {} as VehicleService;

  }

  ngOnInit() {

    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }

    var coll = document.getElementsByClassName("collapsible");
    var i;
    let up = document.getElementById('up');
    let down = document.getElementById('down');

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
          down.style.display = "none";
          up.style.display = "block";
        } else {
          content.style.display = "block";
          up.style.display = "none";
          down.style.display = "block";
        }
      });
    }
    
    
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

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Service has been concluded successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }

  getReport() {
    let docDefinition = {  
      header: {
        margin: 10,
        columns: [
          {
            image: '',
            width: 12,
          },
            {
                margin: [10, 0, 0, 0],
                text: 'Service Data Report',  
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
                    text: 'Team Name',  
                    fontSize: 16, 
                    bold: true
                },  
                { text: 'BMMAS01' }
            ],
            [  
              {  
                  text: 'Service ID',  
                  fontSize: 16, 
                  bold: true
              },  
              { text: '1920AHJSK9229DTW' }
          ]
          ], 
        },
        {
          table: {
            headerRows: 1,
            width: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Service Items', '', ''],
              [{text: 'Oil Change' + '\t\t\t R2 000' + '\n' + 'Quantity: 1'}, {text: 'Brake Disk Replacement' + '\t\t\t R4 000' + '\n' + 'Quantity: 4'},
            {text: 'Grand Total' + '\t\t\t R6 480' + '\n' + '+VAT (8%)'}]
            ]
          },
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