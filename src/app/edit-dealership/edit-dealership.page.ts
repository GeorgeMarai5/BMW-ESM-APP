import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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

  dealerships: Dealership;
  dealership = {};
  editDealershipForm: FormGroup;
  isSubmitted = false;
  data: Dealership;
  id : any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, public Dservice: DealershipService, 
    public firestore: AngularFirestore, public router: Router, public toastCtrl: ToastController) {
      
    this.id = this.route.snapshot.paramMap.get('id');


  }


  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }

    this.fetchUser(this.id);
    this.editDealershipForm = this.fb.group({
      dealership_Name: [''],
      address: [''],
     
    })
  }

  fetchUser(id) {
    this.Dservice.getItem(id).subscribe((data) => {
      this.editDealershipForm.setValue({
        dealership_Name: data['dealership_Name'],
        address: data['address'],
        
      });

      console.log(data);
    });




  }




}


  /*

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
        this.Dservice.updateItem(this.data, dealership)
        this.presentToast();
      }
      this.router.navigate(['/tabs/view/dealership', this.data]);
  }

  ngOnInit() {


    this.id = this.route.snapshot.params["dealershipID"];
    //get item details using id
    this.Dservice.getItem(this.id).subscribe(response => {
      console.log(response);
      this.data = response;
    })

  }





  get errorControl() {
    return this.editDealershipForm.controls;
  }

  back(){
    this.router.navigate(['tabs/view/dealership', this.data]);
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



*/

/*

this.service.getItem(this.data)
    .subscribe(res =>{
      console.log(res)
      this.editDealershipForm.setValue({
        dealershipName: res['DealershipName'], 
        address: res['AddressName']
      })
    });





this.route.params.subscribe(params => {
        this.data = params.id;
      });
    this.editDealershipForm = new FormGroup({
      dealershipName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required)
    })











*/