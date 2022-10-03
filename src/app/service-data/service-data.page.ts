import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ServiceItem } from 'app/models/ServiceItem';
import { ServiceItemService } from '../services/service-item.service';
import { response } from 'express';

@Component({
  selector: 'app-service-data',
  templateUrl: './service-data.page.html',
  styleUrls: ['./service-data.page.scss'],
})
export class ServiceDataPage implements OnInit {

  data: any;
  constructor(public authService: AuthService,
    public fb: FormBuilder,
    public router: Router, private _service: ServiceItemService) { 

      _service = {} as ServiceItemService;
    }

  ngOnInit() {
  }

  async printMyPDF(){
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


async myServiceData(){
this._service.getServiceItemList().subscribe(response => {
  console.log(response);
      this.data = response;
})
}

}
