import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { Vehicle } from '../models/Vehicle';
import { AuthService } from '../services/auth.service';
import { ServiceItemService } from '../services/service-item.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ServiceItem } from 'app/models/ServiceItem';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-view-service-invoice',
  templateUrl: './view-service-invoice.page.html',
  styleUrls: ['./view-service-invoice.page.scss'],
})
export class ViewServiceInvoicePage implements OnInit {

item: any;

  vehicles: Vehicle;
  vehicle = [];
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
  viewInvoiceForm: FormGroup;
  isSubmitted = false;
  data: any;
  maintenanceplanID: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, 
    public firestore: AngularFirestore, public router: Router, public service: ServiceItemService) {
      service = {} as ServiceItemService;
     }

  ngOnInit() {
this.getAllServiceItems();
  }
  async getAllServiceItems(){
    this.service.getServiceItemList().subscribe(response => {
      console.log(response);
      this.data = response;
    })

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
  submitForm(){
  }

  navToUpdate() {
    this.router.navigate(['tabs/edit/vehicle', this.data]);
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
  
        var dataURL = canvas.toDataURL("image/png");
  
        resolve(dataURL);
      };
  
      img.onerror = error => {
        reject(error);
      };
  
      img.src = url;
    });
  }

  async getReport() {
    let docDefinition = {  
      header: {
        margin: 10,
        columns: [
            {
                margin: [10, 0, 10, 0],
                text: 'End of Service Report',  
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
                    fontSize: 16, 
                    bold: true
                },  
                { text: this.getAllServiceItems()}
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
    var createPdf = pdfMake.createPdf(docDefinition);
    var base64data = null;

    createPdf.getBase64(function(encodedString) {
        base64data = encodedString;

        var byteCharacters = atob(base64data);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var file = new Blob([byteArray], { type: 'application/pdf;base64' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
  });
}


}
