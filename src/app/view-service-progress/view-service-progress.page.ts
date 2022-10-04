import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../models/Vehicle';
import { AlertController, ToastController } from '@ionic/angular';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { sendPasswordResetEmail } from 'firebase/auth';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-view-service-progress',
  templateUrl: './view-service-progress.page.html',
  styleUrls: ['./view-service-progress.page.scss'],
})

export class ViewServiceProgressPage implements OnInit {



  isSubmitted = false;
  data: any;
  newItems = {
    item1: {
      name: 'Oil Change',
      quantity: 1,
      price: 2000
    },
    item2: {
      name: 'Brake Disk Replacement',
      quantity: 4,
      price: 1000
    }
  }
  serviceItems = [this.newItems.item1, this.newItems.item2];

  constructor(private route: ActivatedRoute, public fb: FormBuilder, private httpClient: HttpClient, public authService: AuthService, public firestore: AngularFirestore,
    public router: Router, public service: VehicleService, public toastCtrl: ToastController, private alertController: AlertController, public alertCtrl: AlertController) {
      this.route.params.subscribe((params) => {
        this.data = params.id;
      });
    }

  
  ngOnInit() {
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
  
  
  async myDateTimeFunction(){
    /*var inputValue = (<HTMLInputElement>document.getElementById('daytime')).value;
    console.log(inputValue);*/
    const alert = await this.alertController.create({
      header: 'Confirm Date & Time',
      buttons: ['Submit', 'Cancel'],
      inputs: [
        {
          name: 'Date',
          placeholder: 'Please enter date here...',
          type: 'date',
        },
        {
          name: 'Time',
          placeholder: 'Please enter time here...',
          type: 'time',
        },
      ],
    });

    await alert.present();
  }
  
  async concludeQuoteAlert() {
    const alert = await this.alertController.create({
      header: 'Conclude Quote',
      buttons: ['Submit', 'Cancel'],
      inputs: [
        {
          placeholder: 'Would you like to conclude the service?',
        },
      ],

    });

    await alert.present();
  }

  async concludeQuote() {
    const concludeQuoteAlert = await this.alertCtrl.create({
      header: 'Conclude Quote',
      message: 'Would you like to conclude the service?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: end => {
          this.alertCtrl.dismiss();
        }
      },
      {
        text: 'Submit',
        role: 'Submit',
        handler: () => {
          
          this.presentToast('Your service has been concluded.');
        }
      }]
    });  
    concludeQuoteAlert.present();
  }

  async presentToast(_message) {
    let toast = await this.toastCtrl.create({
      message: _message,
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }

  async provideFeedbackAlert() {
    const alert = await this.alertController.create({
      header: 'CaptureFeedback',
      buttons: ['Submit', 'Cancel'],
      inputs: [
        {
          placeholder: 'Please enter your feedback here...',
        },
      ],
    });

    await alert.present();
  }

  getReport() {
    let docDefinition = {  
      header: {
        margin: 10,
        columns: [

            {
                margin: [10, 0, 0, 0],
                text: 'Service Feedback',  
                fontSize: 20,  
                float: 'right',  
                color: '#000000' 
            }
        ]
      },
      content: [
        {  
          text: 'Client Details',  
          style: 'sectionHeader'  
        },
        {
          columns: [  
            [  
                {  
                  text: 'George Marais' + '\n' + 'maraisgeorge39@gmail.com' + '\n' + '020 423 3400',   
                }, 
            ]
          ], 
        },
        {
          table: {
            headerRows: 1,
            width: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Feedback: '],
              [{stack: [
                {text: [
                  'Feedback Here'
                ]
                },
              ],
              style: 'superMargin'},]
            ]
          },
          layout: 'noBorders',
          style: 'superMargin'
        },
      ],
      styles: {  
        sectionHeader: {  
            bold: true,   
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
  // async myFunction(){
  //   this.sms.send('27716333611', 'Your service has been concluded successfully!');
  //   console.log(this.sms);
  //   }

}
