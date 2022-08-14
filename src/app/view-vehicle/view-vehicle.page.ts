import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../models/Vehicle';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.page.html',
  styleUrls: ['./view-vehicle.page.scss'],
})
export class ViewVehiclePage implements OnInit {

  vehicles: Vehicle;
  vehicle = {};
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
    this.service.getVehicle(this.data).valueChanges()
    .subscribe(res =>{
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
    this.service.getVehicle(this.data).valueChanges()
    .subscribe(res =>{
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

  generatePDF() {
    const div = document.getElementById("html2PDF");
    const options = {background: "white", height: div.clientHeight, width: div.clientWidth};

    html2canvas(div, options).then((canvas) => {
      let doc = new jsPDF("p", "mm", "a4");
      //let imgData = canvas.toDataURL("image/PNG");
      //doc.addImage(imgData, "PNG" , 20, 20, 56);

      let pdfOuput = doc.output();
      let buffer = new ArrayBuffer(pdfOuput.length);
      let array = new Uint8Array(buffer);
      for (let i = 0; i < pdfOuput.length; i++) {
        array[i] = pdfOuput.charCodeAt(i);
      }
      const fileName = "example.pdf";
      doc.save(fileName);
    })
  }
}
