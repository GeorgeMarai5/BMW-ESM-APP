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
      
     }



viewVehicle(){

  this.service.getVehicle(this.data).subscribe(response => {
    console.log(response);
    this.data = response;
  })

}



  ngOnInit() {

    this.viewVehicle();
    
    
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
    this.isSubmitted = true;
    if(!this.viewVehicleForm.valid){
      return false;
    }
    else{
        const assignedDealership = {
          dealershipName: this.viewVehicleForm.get('dealershipName').value,
          address: this.viewVehicleForm.get('address').value
        }
        console.log(assignedDealership);
        this.service.getVehicleList();
    
      }
      this.router.navigate(['/tabs/search/fleet', this.data]);
    // this.service.getVehicle(this.data).subscribe(res =>{
    //   this.maintenanceplanID = res['MaintenanceID'];
    // });
    // console.log(this.maintenanceplanID)
    // if (this.maintenanceplanID != null || this.maintenanceplanID != undefined) {
    //   this.router.navigate(['/tabs/view/maintenanceplan', '7jk7GWQB5eC6SdZuzU6P']);
    // }
    //   else {
    //     this.router.navigate(['/tabs/search/maintenanceplan']);
    // }
  
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
}

}