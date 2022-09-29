import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Console } from 'console';
import { Dealership } from '../models/Dealership';
import { AuthService } from '../services/auth.service';
import { ServiceService } from '../services/service.service';
import { AddressService } from 'app/services/Address.service';
import { DealershipService } from '../services/dealership.service';
import { Address } from 'app/models/Address';

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
  dealership: Dealership;
  address: Address;

  constructor(private route: ActivatedRoute,
    public fb: FormBuilder, 
    public authService: AuthService,
    public service: ServiceService, public router: Router, 
    private toastCtrl: ToastController, 
    private dealershipservice: DealershipService, private addresservice: AddressService) { 

      dealershipservice = {} as DealershipService;
      addresservice = {} as AddressService;
      this.data = new Dealership();
      this.ad = new Address();

  }
 
  ngOnInit(){
    /*if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
    */

  }

  get errorControl() {
    return this.assignDealershipForm.controls;
  }

  async createDealership(){

    //this.data.addressId = 
    this.dealershipservice.createDealership(this.data).subscribe(response => {
      console.log(response);
      
    });
    this.presentToast();
    //this.presentToast();
    //this.router.navigate(['/tabs/search/fleet']);
  }


  async assignID(){

//this.dealershipservice.createDealership(this.ad).subscribe(response =>)

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
      //response.valueOf().toString().includes("addressId");
      console.log(response);

     

      //console.log(this.address.addressId)
      
  });
    this.presentToast();
    //this.presentToast();
    //this.router.navigate(['/tabs/search/fleet']);
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
