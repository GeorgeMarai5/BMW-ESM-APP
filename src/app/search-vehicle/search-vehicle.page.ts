import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../models/Vehicle';
import { AuthService } from '../services/auth.service';
import { VehicleService } from '../services/vehicle.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { stringify } from 'querystring';
import { generateKeyPair } from 'crypto';
import { Console } from 'console';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

  constructor(public authService: AuthService, private service: VehicleService, public fb: FormBuilder, 
    private firestore: AngularFirestore, public alertCtrl: AlertController, public router: Router) { 
      this.vehicles = {} as Vehicle;
    }

  ngOnInit() {
    this.vehicleForm = this.fb.group({
      FleetName: ['', [Validators.required]],
      FleetLocation: ['', [Validators.required]],
      FleetID: ['', [Validators.required]],
      FleetVehicleQty: ['', [Validators.required]],
    });

    this.service.getVehicles().subscribe(data => {
      this.vehicleList = data.map(e => {
        let yearCode: string;
        yearCode = e.payload.doc.data()['VIN_Number'];

        return {
          id: e.payload.doc.id,
          VehicleID: e.payload.doc.data()['VehicleID'],
          VINNumber: e.payload.doc.data()['VIN_Number'],
          vehicleModel: e.payload.doc.data()['VehicleModel'],
          year: this.service.getYear(yearCode.substring(9, 10))
        };
      })
      console.log(this.vehicleList);

    });
  }

  async removeVehicle(id){
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
          this.service.deleteVehicle(id);
          alert('Vehicle was successfully removed');
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
          alert('Vehicle was successfully checked in');
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
}
