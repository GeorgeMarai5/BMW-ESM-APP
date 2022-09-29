import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../models/Vehicle';
import { AlertController } from '@ionic/angular';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { sendPasswordResetEmail } from 'firebase/auth';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-view-service-progress',
  templateUrl: './view-service-progress.page.html',
  styleUrls: ['./view-service-progress.page.scss'],
})

export class ViewServiceProgressPage implements OnInit {
// getting ready


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

  constructor(private route: ActivatedRoute, public fb: UntypedFormBuilder, public authService: AuthService, public firestore: AngularFirestore,
    public router: Router, public service: VehicleService, private alertController: AlertController) {
      this.route.params.subscribe((params) => {
        this.data = params.id;
      });
    }
    readonly  twilioNumber = '+19859806244';
readonly accountSid = 'AC2b54afb9d76e88c12db2ba3f5d5d911d';
readonly authToken = '6ee0efe44516b7df5de5b1680d2e1a69';
  ngOnInit() {}

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



// start sending message
// readonly client = Twilio(this.accountSid, this.authToken);
//  sendText(){
//     const phoneNumbers = [ 'phone-number-1', 'phone-number-2']    

//     phoneNumbers.map(phoneNumber => {
//         console.log(phoneNumber);
        
//         if ( !this.validE164(phoneNumber) ) {
//             throw new Error('number must be E164 format!')
//         }
    
//         const textContent = {
//             body: `You have a new sms from Dale Nguyen :)`,
//             to: phoneNumber,
//             from: this.twilioNumber
//         }
    
//         this.client.messages.create(textContent)
//         .then((message) => console.log(message.to))
//     })
// }

// // Validate E164 format
//  validE164(num) {
//     return /^\+?[1-9]\d{1,14}$/.test(num)
// }
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

}
