import { Component, OnInit } from '@angular/core';
import { Part } from '../models/Part';
import { AuthService } from '../services/auth.service';
import { PartInfoService } from '../services/part-info.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-part',
  templateUrl: './search-part.page.html',
  styleUrls: ['./search-part.page.scss'],
})

export class SearchPartPage implements OnInit {
  parts: Part;
  partList = [];
  partForm: FormGroup;
  searchTerm: string;

  constructor(public authService: AuthService, 
    private service: PartInfoService, 
    public fb: FormBuilder,  
    public alertCtrl: AlertController, 
    public router: Router, 
    private httpClient: HttpClient) { 
      this.parts = {} as Part;
  }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
    
    this.partForm = this.fb.group({
      PartID: ['', [Validators.required]],
      PartName: ['', [Validators.required]],
      Description: ['', [Validators.required]]
    });
    this.httpClient.get<any>("assets/vehicle-parts.json").subscribe((data)=>
      this.partList = data
    );

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
}