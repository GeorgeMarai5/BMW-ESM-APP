import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Dealership } from '../models/Dealership';
import { AuthService } from '../services/auth.service';
import { DealershipService } from '../services/dealership.service';

@Component({
  selector: 'app-edit-service-item',
  templateUrl: './edit-service-item.page.html',
  styleUrls: ['./edit-service-item.page.scss'],
})
export class EditServiceItemPage implements OnInit {

  dealerships: Dealership;
  dealership = {};
  editItemForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, public service: DealershipService, 
    public firestore: AngularFirestore, public router: Router, public toastCtrl: ToastController) {
      this.route.params.subscribe(params => {
          this.data = params.id;
      });
    this.editItemForm = new FormGroup({
      itemName: new FormControl('', Validators.required),
      itemDescription: new FormControl('', Validators.required)
    })
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.editItemForm.valid){
      return false;
    }
    else{
        const dealership = {
          itemName: this.editItemForm.get('itemName').value,
          itemDescription: this.editItemForm.get('itemDescription').value
        }

      this.service.updateItem(this.data, dealership)
      this.presentToast();
    }

      this.router.navigate(['/tabs/view/dealership', this.data]);
  }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
    this.service.getItem(this.data)
    .subscribe(res =>{
      console.log(res)
      this.editItemForm.setValue({
        dealershipName: res['DealershipName'], 
        address: res['AddressName']
      })
    });
  }

  back(){
    this.router.navigate(['tabs/view/service-item', this.data]);
  }

  get errorControl() {
    return this.editItemForm.controls;
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
