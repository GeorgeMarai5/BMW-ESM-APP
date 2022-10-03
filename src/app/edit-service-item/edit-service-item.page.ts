import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ServiceItem } from 'app/models/ServiceItem';
import { AuthService } from '../services/auth.service';
import { ServiceItemService } from 'app/services/service-item.service';
import { EditServiceItemHelpComponent } from 'app/components/edit-service-item-help/edit-service-item-help.component';

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
    public activatedRoute: ActivatedRoute,
    public helpModal: ModalController) {

     _service = {} as ServiceItemService;
     this.serviceItem = new ServiceItem();
     this.activatedRoute.params.subscribe(params => {
       this.id = params.id;
   });
    
  }


  ngOnInit() {
    /*if(this.authService.isLoggedIn){
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

   this.getItemID();
  }

  async getItemID(){
    this._service.getServiceItem(this.id).subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }

  async showHelp(){
    const modal = await this.helpModal.create({
      component: EditServiceItemHelpComponent});
      return await modal.present();
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
      message: 'Service Item has been updated successfully.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
