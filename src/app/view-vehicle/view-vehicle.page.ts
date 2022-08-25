import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../models/Vehicle';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.page.html',
  styleUrls: ['./view-vehicle.page.scss'],
})
export class ViewVehiclePage implements OnInit {

  vehicles: Vehicle;
  vehicle = [];
  viewVehicleForm: FormGroup;
  isSubmitted = false;
  data: any;
  maintenanceplanID: any;

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
    this.service.getVehicle(this.data).valueChanges().subscribe(res =>{
      console.log(res)
      this.viewVehicleForm.setValue({
        vehicleModel: res['VehicleModel'], 
        Registration: res['Registration'],
        VINNum: res['VIN_Number'], 
        warrantyPlan: res['Warranty']
      })
    });
  }

  submitForm(){
    this.service.getVehicle(this.data).valueChanges().subscribe(res =>{
      this.maintenanceplanID = res['MaintenanceID'];
    });

    console.log(this.maintenanceplanID)

    if(this.maintenanceplanID != null || this.maintenanceplanID != undefined){
      this.router.navigate(['/tabs/view/maintenanceplan', '7jk7GWQB5eC6SdZuzU6P']);
    }
    else{
      this.router.navigate(['/tabs/search/maintenanceplan']);
    }
  }

  navToUpdate() {
    this.router.navigate(['tabs/edit/vehicle', this.data]);
  }

  getReport() {
    var pdf = new jsPDF('p', 'pt', 'a4');
      var y = 20;
      pdf.setLineWidth(2);
      pdf.text('Vehicle Performance Report', 200, y = y + 30);
      pdf.setFontSize(12);
      pdf.setTextColor(99);

      (pdf as any).autoTable({
        head: [ ['Vin Number'], [], ['Model Name', 'Registration' ,'Year']],
        body: this.vehicle.map(({ModelName, Registration, Year}) => [ ModelName, Registration, Year]),
        theme: 'grid',
        columnStyles: {
          0: {
            halign: 'right',
            tableWidth: 100,
          },
          1: {
            tableWidth: 100,  
          },
          2: {
            halign: 'right',
            tableWidth: 100,
          },
          3: {
            halign: 'right',  
            tableWidth: 100,
          }
        }
      });

      // Open PDF document in browser's new tab
      pdf.output('dataurlnewwindow');

      // Download PDF doc  
      pdf.save('Service_History_Report.pdf');
  } 
}
