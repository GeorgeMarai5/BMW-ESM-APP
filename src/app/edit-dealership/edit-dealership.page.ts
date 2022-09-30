import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Dealership } from '../models/Dealership';
import { AuthService } from '../services/auth.service';
import { DealershipService } from '../services/dealership.service';

@Component({
  selector: 'app-edit-dealership',
  templateUrl: './edit-dealership.page.html',
  styleUrls: ['./edit-dealership.page.scss'],
})
export class EditDealershipPage implements OnInit {

  dealserships = {};
  address = [];
  editDealershipForm: FormGroup;
  isSubmitted = false;
  dealership: Dealership;
  data: any;

  constructor(private route: ActivatedRoute, 
    public fb: FormBuilder, 
    public authService: AuthService, 
    public dealershipService: DealershipService, 
    public router: Router, 
    public toastCtrl: ToastController) {
      
      this.route.params.subscribe(params => {
        this.dealership = params['id'];
      });
      this.editDealershipForm = new FormGroup({
        dealershipName: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required)
      })

  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.editDealershipForm.valid){
      return false;
    }
    else{
        const dealership = {
          DealershipName: this.editDealershipForm.get('dealershipName').value,
          AddressName: this.editDealershipForm.get('address').value
        }
        this.dealershipService.updateDealership(dealership, this.data)
        this.presentToast();
      }
      this.router.navigate(['/tabs/search/dealership', this.data]);
  }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }

    this.dealershipService.getDealership(this.data)
    .subscribe(res =>{
      console.log(res)
      this.editDealershipForm.setValue({
        DealershipName: res['dealershipName'],
        AddressName: res['address']
      })
    });
  }

  get errorControl() {
    return this.editDealershipForm.controls;
  }

  back(){
    this.router.navigate(['tabs/search/dealership', this.data]);
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Dealership has been updated successfully.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}