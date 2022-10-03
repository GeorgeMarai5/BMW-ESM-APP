import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Console } from 'console';
import { Dealership } from '../models/Dealership';
import { AuthService } from '../services/auth.service';
import { ServiceService } from '../services/service.service';
import { AddressService } from 'app/services/Address.service';
import { DealershipService } from '../services/dealership.service';
import { Address } from 'app/models/Address';
import { AssignDealershipHelpComponent } from 'app/components/assign-dealership-help/assign-dealership-help.component';

@Component({
   selector: 'app-assign-dealership',
   templateUrl: './assign-dealership.page.html',
   styleUrls: ['./assign-dealership.page.scss'],
 })

 export class AssignDealershipPage implements OnInit {

assignDealershipForm: FormGroup;
isSubmitted = false;
data: any;
ad: any;
adID: any;
dealership: Dealership;
address: Address;

constructor(private route: ActivatedRoute,
public fb: FormBuilder, 
public authService: AuthService,
public service: ServiceService, public router: Router, 
private toastCtrl: ToastController, 
private dealershipservice: DealershipService, private addresservice: AddressService,
public helpModal: ModalController) { 

dealershipservice = {} as DealershipService;
addresservice = {} as AddressService;
this.data = new Dealership();
this.ad = new Address();
this.adID = new Address();

}
 
ngOnInit(){
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

async showHelp(){
  const modal = await this.helpModal.create({
    component: AssignDealershipHelpComponent});
    return await modal.present();
}

   async createDealership(){
//this.data.addressId.toString() = this.ad.addressId.toString();
this.addresservice.AddAddress(this.ad).subscribe(res => {
  let details =JSON.stringify(res.valueOf);

console.log(details);
  this.adID = this.addresservice.getItem(this.ad.addressId) 
  //this.ad.addressId = this.adID;
  //console.log(this.ad = this.adID.addressId);
  console.log(res["addressId"]);
 
  let id = JSON.stringify(res["addressId"]);
  this.data.addressId = id;
  this.dealershipservice.createDealership(this.data).subscribe(response => {
    //this.adID = this.addresservice.getItem(this.ad.addressId) 
    
     console.log(response);
    });

});
//this.data.addressId = id;
//this.adID = this.addresservice.getItem(this.ad.addressId) 
    
    //this.dealershipservice.createDealership(this.data).subscribe(response => {
     //this.adID = this.addresservice.getItem(this.ad.addressId) 
     
     // console.log(response);
     
      
    //});
    this.presentToast();
    
   }


   async assignID(){



  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Dealership has been assigned successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
     }

   async CreateAddress(){
     this.addresservice.AddAddress(this.ad).subscribe(response => {
     
      console.log(response);

     

      
      
  });
     this.presentToast();

   }

  checkWhiteSpaces(str){
    if (!/\S/.test(str)) {
      return true;
    }
    else{
      return false;
    }
  }

}
//     //this.presentToast();
//     //this.router.navigate(['/tabs/search/fleet']);

//     //console.log(this.address.addressId)

//      //response.valueOf().toString().includes("addressId");

//      //this.dealershipservice.createDealership(this.ad).subscribe(response =>)

//      //this.presentToast();
//     //this.router.navigate(['/tabs/search/fleet']);

//     //this.data.addressId = 