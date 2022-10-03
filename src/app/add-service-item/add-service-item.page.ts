import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ServiceItem } from 'app/models/ServiceItem';
import { ServiceItemService } from 'app/services/service-item.service';
import { ModalController, ToastController } from '@ionic/angular';
import { AddServiceItemHelpComponent } from 'app/components/add-service-item-help/add-service-item-help.component';

@Component({
  selector: 'app-add-service-item',
  templateUrl: './add-service-item.page.html',
  styleUrls: ['./add-service-item.page.scss'],
})
export class AddServiceItemPage implements OnInit {

  data: any;
  serviceItem: ServiceItem;

  constructor(private route: ActivatedRoute,  
    public authService: AuthService, 
    public firestore: AngularFirestore, 
    public service: ServiceItemService, 
    public router: Router, 
    public toastCtrl: ToastController,
    public helpModal: ModalController) { 
    
      service = {} as ServiceItemService;
      this.data = new ServiceItem();

  }

  async showHelp(){
    const modal = await this.helpModal.create({
      component: AddServiceItemHelpComponent});
      return await modal.present();
  }

  async create(){
    this.service.createServiceItem(this.data).subscribe(response => {
      console.log(response);
      this.router.navigate(['/tabs/search/service-item']);
    });
    this.presentToast();
  }

  ngOnInit() {
    /*if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }*/
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

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Service item has been successfully created.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
