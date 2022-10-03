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

  submitForm(){

    /*
    this.isSubmitted = true;
    if(!this.addItemForm.valid){
      return false;
    }
    else{
      const serviceItem = {
        itemName: this.addItemForm.get('itemName').value,
        itemDescription: this.addItemForm.get('itemDescription').value,
      }
      this.service.createServiceItem(serviceItem)
      this.presentToast()
    }
    this.router.navigate(['/tabs/view/fleet']);
    */
   
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
