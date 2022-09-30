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

  dealership: Dealership = {
    dealershipId: '',
    address: '',
    dealershipName: '',
    addressId: ''
  };
  submitted = false;

  constructor(private dealershipService: DealershipService, private route: ActivatedRoute,
    public fb: FormBuilder, 
    public authService: AuthService,
    public service: ServiceService, public router: Router, 
    private toastCtrl: ToastController, 
    private dealershipservice: DealershipService, private addresservice: AddressService) { }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
  }

  createDealership(): void {
    const data = {
      dealershipId: this.dealership.dealershipId,
      address: this.dealership.address,
      dealershipName: this.dealership.dealershipName,
      addressId: this.dealership.addressId,
    };

    this.dealershipService.createDealership(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newDealership(): void {
    this.submitted = false;
    this.dealership = {
      dealershipId: '',
      address: '',
      dealershipName: '',
      addressId: ''
    };
  }


// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
// import { ActivatedRoute, Router } from '@angular/router';
// import { ToastController } from '@ionic/angular';
// import { Console } from 'console';
// import { Dealership } from '../models/Dealership';
// import { AuthService } from '../services/auth.service';
// import { ServiceService } from '../services/service.service';
// import { AddressService } from 'app/services/Address.service';
// import { DealershipService } from '../services/dealership.service';
// import { Address } from 'app/models/Address';

// @Component({
//   selector: 'app-assign-dealership',
//   templateUrl: './assign-dealership.page.html',
//   styleUrls: ['./assign-dealership.page.scss'],
// })

// export class AssignDealershipPage implements OnInit {

  assignDealershipForm: FormGroup;
  isSubmitted = false;
//   data: any;
//   ad: any;
//   dealership: Dealership;
//   address: Address;

  // constructor(private route: ActivatedRoute,
  //   public fb: FormBuilder, 
  //   public authService: AuthService,
  //   public service: ServiceService, public router: Router, 
  //   private toastCtrl: ToastController, 
  //   private dealershipservice: DealershipService, private addresservice: AddressService) { 

//       dealershipservice = {} as DealershipService;
//       addresservice = {} as AddressService;
//       this.data = new Dealership();
//       this.ad = new Address();

//   }
 
//   ngOnInit(){
    // if(this.authService.isLoggedIn){
    //   return true;
    // }
    // else{
    //   this.router.navigate(['/tabs/login']);
    // }
    

//   }

  get errorControl() {
    return this.assignDealershipForm.controls;
  }

//   async createDealership(){

    
//     this.dealershipservice.createDealership(this.data).subscribe(response => {
//       console.log(response);
      
//     });
//     this.presentToast();
    
//   }


//   async assignID(){



//   }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Dealership has been assigned successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }

//   async CreateAddress(){
//     this.addresservice.AddAddress(this.ad).subscribe(response => {
     
//       console.log(response);

     

      
      
//   });
//     this.presentToast();

//   }

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