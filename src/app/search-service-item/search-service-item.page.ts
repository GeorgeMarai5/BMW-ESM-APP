import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ServiceItemService } from 'app/services/service-item.service';

@Component({
  selector: 'app-search-service-item',
  templateUrl: './search-service-item.page.html',
  styleUrls: ['./search-service-item.page.scss'],
})
export class SearchServiceItemPage implements OnInit {

  serviceItemList = [];
  serviceItemForm: FormGroup;
  searchTerm: string;
  id: any;
  data: any;

  constructor(public authService: AuthService, private service: ServiceItemService, public fb: FormBuilder, 
    public alertCtrl: AlertController, public router: Router, public toastCtrl: ToastController) { 
      service = {} as ServiceItemService;
    }

  ngOnInit() {
    /*
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
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


    this.getAllServiceItems();
  }

  async getAllServiceItems(){
    this.service.getServiceItemList().subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }

  async removeItem(item){
    const confirmDeleteAlert = await this.alertCtrl.create({
      header: 'Remove Service Item',
      message: 'Are you sure you would like to remove this item from the service?',
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
          this.service.deleteServiceItem(item.serviceItemId).subscribe(Response => {
            console.log(Response);
            this.getAllServiceItems()
          });
          this.presentToast('Service Item has been removed successfully.');
        }
      }]
    });
    confirmDeleteAlert.present();
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
