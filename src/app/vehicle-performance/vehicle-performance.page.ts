import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-vehicle-performance',
  templateUrl: './vehicle-performance.page.html',
  styleUrls: ['./vehicle-performance.page.scss'],
})
export class VehiclePerformancePage implements OnInit {

  constructor(public authService: AuthService,
    public fb: FormBuilder,
    public router: Router ) { }

  ngOnInit() {
  }
  async generatePDF() {
    document.getElementById("downloadButton").innerHTML = "Currently downloading, please wait";

    //Downloading
    var downloading = document.getElementById("whatToPrint");
    var doc = new jsPDF('l', 'pt');

    await html2canvas(downloading, {
        //allowTaint: true,
        //useCORS: true,
        width: 530
    }).then((canvas) => {
        //Canvas (convert to PNG)
        doc.addImage(canvas.toDataURL("image/png"), 'PNG', 5, 5, 500, 200);
    })

    doc.save("Document.pdf");

    //End of downloading

    document.getElementById("downloadButton").innerHTML = "Click to download";
}
}
