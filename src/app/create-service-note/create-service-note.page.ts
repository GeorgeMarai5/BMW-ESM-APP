import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ServiceNoteService } from '../services/servicenote.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { ServiceService } from '../services/service.service';
import { Service_Note } from '../models/Service_Note'
import { ModalController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-create-service-note',
  templateUrl: './create-service-note.page.html',
  styleUrls: ['./create-service-note.page.scss'],
})

export class CreateServiceNotePage implements OnInit {

  serviceNotes: Service_Note
  
  //serviceNoteList = [];
  searchTerm: string;
 
  //isSubmitted = false;
  data : any;
  ServiceNote: Service_Note;
  //today = new Date();
 

  constructor ( 
    public router: Router,
    public authService: AuthService, 
    
    private servicenote: ServiceNoteService,
    
    ) {

    //serviceNote = {} as ServiceNoteService;
    this.data = new Service_Note();

  }

  async create() {
    this.servicenote.createServiceNote(this.data).subscribe(response => {
      console.log(response);
    });
   
  }
    
  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }

    /*

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
/*
  getServiceInfo() { 
    this.service.getServiceList().subscribe(response => {
      console.log(response);
      this.serviceData = response;
    })
  }

  
  async showHelp(){
    const modal = await this.helpModal.create({
      component: CreateServiceNoteHelpComponent});
      return await modal.present();
  }
  

  get errorControl() {
    return this.addNoteForm.controls;
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Service note has been successfully created.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}


*/

  }

}