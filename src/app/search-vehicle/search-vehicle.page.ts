import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../models/Vehicle';
import { AuthService } from '../services/auth.service';
import { VehicleService } from '../services/vehicle.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { stringify } from 'querystring';
import { generateKeyPair } from 'crypto';
import { Console } from 'console';
import { AlertController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
//import 'jspdf-autotable';

@Component({
  selector: 'app-search-vehicle',
  templateUrl: './search-vehicle.page.html',
  styleUrls: ['./search-vehicle.page.scss'],
})
export class SearchVehiclePage implements OnInit {

  vehicles: Vehicle;
  vehicleList = [];
  vehicleForm: FormGroup;
  searchTerm: string;
  data:any;
  Model: any;
  d:any;
  constructor(public authService: AuthService, private service: VehicleService, public fb: FormBuilder, private firestore: AngularFirestore, 
    public alertCtrl: AlertController, public router: Router, public toastCtrl: ToastController) { 
    
      service = {} as VehicleService;
      
      /*
      this.vehicles = {} as Vehicle;
      this.vehicleForm = new FormGroup({
        VehicleID: new FormControl('', Validators.required),
        VINNum: new FormControl('', Validators.required),
        model: new FormControl('', Validators.required),
        year: new FormControl('', Validators.required),
      })
      */
    }

  ngOnInit() {

    this.getallVehicles()
    //this.getModel()
    /*
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }

    //this.getallVehicles();

    //  this.service.getVehicleList().subscribe(data => {
    //    this.vehicleList = data.map(e => {
    //      let yearCode: string;
    //      yearCode = e.payload.doc.data()['VIN_Number'];

    //      return {
    //        id: e.payload.doc.id,
    //        VehicleID: e.payload.doc.data()['VehicleID'],
    //        VINNum: e.payload.doc.data()['VIN_Number'],
    //        model: e.payload.doc.data()['VehicleModel'],
    //        year: this.service.getYear(yearCode.substring(9, 10))
    //      };
    //    })
    //    console.log(this.vehicleList);

    //  });
    */

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


  getallVehicles(){

    this.service.getVehicleList().subscribe(response => {
      this.d = JSON.stringify(response);
      console.log(this.d)


      console.log(response);
      this.data = response ;

      //let item = JSON.stringify(response["vinNumber"])
    
    })

  
  }

  getModel(){

    this.service.getVehicleModelList().subscribe(response => {
      console.log(response);
      this.data = response;

    



    })

  }

  async removeVehicle(item){
    const confirmDeleteAlert = await this.alertCtrl.create({
      header: 'Remove Vehicle',
      message: 'Are you sure you would like to remove this vehicle from the system?',
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
          this.service.deleteVehicle(item.VehicleID).subscribe(Response => {
            console.log(Response);
            this.getallVehicles()
          });
          this.presentToast('Vehicle has been removed successfully.');
        }
      }]
    });
    confirmDeleteAlert.present();
  }

  async checkInVehicle(id){
    const confirmCheckInAlert = await this.alertCtrl.create({
      header: 'Check-in Vehicle',
      message: 'Would you like to check in this vehicle?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: end => {
          this.alertCtrl.dismiss();
        }
      },
      {
        text: 'Check-in',
        role: 'check-in',
        handler: () => {
          //Add Check in when backend added
          //this.service.deleteVehicle(id);
          this.presentToast('Vehicle check in successful.');
        }
      }]
    });

    confirmCheckInAlert.present();

  }

  getReport() {
    var pdf = new jsPDF('p', 'pt', 'a4');
      var y = 20;
      pdf.setLineWidth(2);
      pdf.text('Vehicle Performance Report', 200, y = y + 30);
      pdf.setFontSize(12);
      pdf.setTextColor(99);


      (pdf as any).autoTable({
        head: [['Vin Number', 'Model Name', 'Registration' ,'Year']],
          body: this.vehicleList.map(({VIN_Number, ModelName, Registration, Year}) => {return [VIN_Number, ModelName, Registration, Year]}),
        theme: 'grid',
        columnStyles: {
          0: {
            halign: 'right',
            tableWidth: 100,
          },
          1: {
            tableWidth: 100,  
          },
          }
    });

      pdf.output('dataurlnewwindow');
      pdf.save('Service_History_Report.pdf');
      
  } 

  async presentToast(_message) {
    let toast = await this.toastCtrl.create({
      message: _message,
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}
