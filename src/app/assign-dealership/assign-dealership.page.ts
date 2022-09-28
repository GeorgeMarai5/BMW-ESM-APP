import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Console } from 'console';
import { Dealership } from '../models/Dealership';
import { AuthService } from '../services/auth.service';
import { Service } from '../services/service.service';
import { DealershipService } from '../services/dealership.service';

@Component({
  selector: 'app-assign-dealership',
  templateUrl: './assign-dealership.page.html',
  styleUrls: ['./assign-dealership.page.scss'],
})

export class AssignDealershipPage implements OnInit {

  assignDealershipForm: FormGroup;
  isSubmitted = false;
  data: any;
  dealership: Dealership;

  constructor(private route: ActivatedRoute,
    public fb: FormBuilder, 
    public authService: AuthService,
    public service: Service, public router: Router, 
    private toastCtrl: ToastController, 
    private dealershipservice: DealershipService) { 

      dealershipservice = {} as DealershipService;
      this.data = new Dealership();

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
    this.dealershipservice.createDealership(this.data).subscribe(response => {
      console.log(response);
    });
    this.presentToast();
    //this.presentToast();
    //this.router.navigate(['/tabs/search/fleet']);
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Dealership has been assigned successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
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
