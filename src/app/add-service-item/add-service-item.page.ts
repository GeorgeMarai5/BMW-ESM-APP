import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ServiceItem } from 'app/models/ServiceItem';
import { ServiceItemService } from 'app/services/service-item.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-service-item',
  templateUrl: './add-service-item.page.html',
  styleUrls: ['./add-service-item.page.scss'],
})
export class AddServiceItemPage implements OnInit {

  addItemForm: UntypedFormGroup;
  isSubmitted = false;
  data: any;
  serviceItem: ServiceItem;

  constructor(private route: ActivatedRoute, 
    public fb: UntypedFormBuilder, 
    public authService: AuthService, 
    public firestore: AngularFirestore, 
    public service: ServiceItemService, 
    public router: Router, 
    public toastCtrl: ToastController) { 
    
      service = {} as ServiceItemService;
      this.data = new ServiceItem();
    /*
    this.route.params.subscribe(params => {
      this.data = params['id'];
    });
    this.addItemForm = new FormGroup({
      itemName: new FormControl('', [Validators.required, Validators.min(17), Validators.max(17)]),
      itemDescription: new FormControl('', Validators.required),
    })
    */
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

  async create(){

    this.service.createServiceItem(this.data).subscribe(response => {
      console.log(response);
      //this.router.navigate(['student-list']);
    });
  
    this.presentToast();
  
  }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
  }

  get errorControl() {
    return this.addItemForm.controls;
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
