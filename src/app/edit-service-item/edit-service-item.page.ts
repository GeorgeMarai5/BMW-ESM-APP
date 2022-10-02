import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  editItemForm: FormGroup;
  isSubmitted = false;
  data: any;
  id: any;
  

  constructor(private route: ActivatedRoute, 
    public fb: FormBuilder, 
    public authService: AuthService, 
    public _service: ServiceItemService,  
    public router: Router, 
    public toastCtrl: ToastController,
    public activatedRoute: ActivatedRoute) {

    //   this.route.params.subscribe(params => {
    //       this.data = params.id;
    //   });
    // this.editItemForm = new FormGroup({
    //   itemName: new FormControl('', Validators.required),
    //   itemDescription: new FormControl('', Validators.required)
    // })

     _service = {} as ServiceItemService;
     this.serviceItem = new ServiceItem();
 
  
 
     this.activatedRoute.params.subscribe(params => {
       this.id = params.id;
   });
    
  }

  submitForm(){
    // this.isSubmitted = true;
    // if(!this.editItemForm.valid){
    //   return false;
    // }
    // else{
    //     const serviceItems = {
    //       itemName: this.editItemForm.get('itemName').value,
    //       itemDescription: this.editItemForm.get('itemDescription').value
    //     }

    //   this.service.updateServiceItem(this.data)
    //   this.presentToast();
    // }

    // this.router.navigate(['tabs/search/service-item', this.data]);
  }

  ngOnInit() {
    /*if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
    */

   this.getItemID();
  }

  async getItemID(){
    this._service.getServiceItem(this.id).subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }

  async updateServiceItem(){

    this._service.updateserviceItem(this.id,this.data).subscribe(response => {
      console.log(response);
    })
    await this.presentToast();
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
