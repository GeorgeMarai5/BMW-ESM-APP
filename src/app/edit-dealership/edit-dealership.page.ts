import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { EditDealershipHelpComponent } from 'app/components/edit-dealership-help/edit-dealership-help.component';
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
  id:any;

  constructor(private route: ActivatedRoute, 
    public fb: FormBuilder, 
    public authService: AuthService, 
    public dealershipService: DealershipService, 
    public router: Router, 
    public toastCtrl: ToastController,
    public activatedRoute: ActivatedRoute,
    public helpModal: ModalController) {
      
      // this.route.params.subscribe(params => {
      //   this.dealership = params['id'];
      // });
      // this.editDealershipForm = new FormGroup({
      //   dealershipName: new FormControl('', Validators.required),
      //   address: new FormControl('', Validators.required)
      // })
dealershipService = {} as DealershipService;
this.dealership = new Dealership();

this.activatedRoute.params.subscribe(params => {
  this.id = params.id;

  })
    }
  submitForm(){
    // this.isSubmitted = true;
    // if(!this.editDealershipForm.valid){
    //   return false;
    // }
    // else{
    //     const dealership = {
    //       DealershipName: this.editDealershipForm.get('dealershipName').value,
    //       AddressName: this.editDealershipForm.get('address').value
    //     }
    //     this.dealershipService.updateDealership(this.id)
    //     this.presentToast();
    //   }
    //   this.router.navigate(['/tabs/search/dealership', this.data]);
  }

  async showHelp(){
    const modal = await this.helpModal.create({
      component: EditDealershipHelpComponent});
      return await modal.present();
  }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }

    // this.dealershipService.getDealership(this.data)
    // .subscribe(res =>{
    //   console.log(res)
    //   this.editDealershipForm.setValue({
    //     DealershipName: res['dealershipName'],
    //     AddressName: res['address']
    //   })
    // });

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
  }


async updateDealership(id, data){
  this.dealershipService.updateDealership(this.id,this.data).subscribe(response => {
    console.log(response);
    
  })
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