import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../models/Vehicle';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.page.html',
  styleUrls: ['./view-vehicle.page.scss'],
})
export class ViewVehiclePage implements OnInit {

  vehicles: Vehicle;
  vehicle = {
    VINNum: 'AHJS27HA39',
    Registration: '42641 GP',
    warrantyPlan: 'Standard'
  };
  viewVehicleForm: FormGroup;
  isSubmitted = false;
  data: any;
  maintenanceplanID: any;
  models = ['I8'];
  plans = ['Standard'];
  pdfObj = null;
  base64Img = null;
  logoData = null;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, public firestore: AngularFirestore,
    public router: Router, public service: VehicleService) {
      this.route.params.subscribe(params => {
          this.data = params.id;
      });
      this.viewVehicleForm = new FormGroup({
        VINNum: new FormControl('', [Validators.required, Validators.min(17), Validators.max(17)]),
        vehicleModel: new FormControl('', Validators.required),
        Registration: new FormControl('', Validators.required),
        warrantyPlan: new FormControl('', Validators.required)
      })
     }

  ngOnInit() {
    /* this.service.getVehicle(this.data).valueChanges().subscribe(res =>{
    //   console.log(res)
    //   this.viewVehicleForm.setValue({
    //     vehicleModel: res['VehicleModel'], 
    //     Registration: res['Registration'],
    //     VINNum: res['VIN_Number'], 
    //     warrantyPlan: res['Warranty']
    //   })
    // });
    */
  }

  submitForm(){
    /* 
    this.service.getVehicle(this.data).valueChanges().subscribe(res =>{
      this.maintenanceplanID = res['MaintenanceID'];
    });
    console.log(this.maintenanceplanID)
    if (this.maintenanceplanID != null || this.maintenanceplanID != undefined) {
      this.router.navigate(['/tabs/view/maintenanceplan', '7jk7GWQB5eC6SdZuzU6P']);
    }
      else {
        this.router.navigate(['/tabs/search/maintenanceplan']);
    }
    */
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
                text: 'Vehicle Performance Report',  
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
                    text: 'VIN Number',  
                    fontSize: 16, 
                    bold: true
                },  
                { text: this.vehicle.VINNum }
            ]
          ], 
        },
        {  
          text: 'Metric',  
          style: 'sectionHeader'  
        },
        {
          table: {
            headerRows: 1,
            width: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Age', 'Number Of Services', 'Number Of Parts Replaced'],
              [{text: '5'}, {text: '0'}, {text: '0'},]
            ]
          },
          layout: 'noBorders',
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
        console.log(base64data);


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
}}