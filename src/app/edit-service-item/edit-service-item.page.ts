import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ServiceItem } from 'app/models/ServiceItem';
import { AuthService } from '../services/auth.service';
import { ServiceItemService } from 'app/services/service-item.service';

@Component({
  selector: 'app-edit-service-item',
  templateUrl: './edit-service-item.page.html',
  styleUrls: ['./edit-service-item.page.scss'],
})
export class EditServiceItemPage implements OnInit {

  serviceItem: ServiceItem;
  serviceItems = {};
  editItemForm: UntypedFormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, 
    public fb: UntypedFormBuilder, 
    public authService: AuthService, 
    public service: ServiceItemService,  
    public router: Router, 
    public toastCtrl: ToastController) {

      this.route.params.subscribe(params => {
          this.data = params.id;
      });
    this.editItemForm = new UntypedFormGroup({
      itemName: new UntypedFormControl('', Validators.required),
      itemDescription: new UntypedFormControl('', Validators.required)
    })
    
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.editItemForm.valid){
      return false;
    }
    else{
        const serviceItems = {
          itemName: this.editItemForm.get('itemName').value,
          itemDescription: this.editItemForm.get('itemDescription').value
        }

      this.service.updateServiceItem(this.data)
      this.presentToast();
    }

      this.router.navigate(['tabs/search/service-item', this.data]);
  }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }

    this.service.getServiceItem(this.data)
    .subscribe(res =>{
      console.log(res)
      this.editItemForm.setValue({
        itemName: res['itemName'], 
        itemDescription: res['itemDescription']
      })
    });
  }

  back(){
    this.router.navigate(['tabs/search/service-item', this.data]);
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
