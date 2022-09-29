import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DealershipService } from '../services/dealership.service'; 
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Dealership } from '../models/Dealership';
import { AlertController, ToastController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-dealership',
  templateUrl: './search-dealership.page.html',
  styleUrls: ['./search-dealership.page.scss'],
})
export class SearchDealershipPage implements OnInit {

  dealerships: Dealership;
  dealershipList = [];
  dealershipForm: FormGroup;
  searchTerm: string;
  data:any;

  constructor(public authService: AuthService, private dealershipservice: DealershipService, public fb: FormBuilder, private firestore: AngularFirestore, 
    public alertCtrl: AlertController, public router: Router, public toastCtrl: ToastController) { 

      dealershipservice = {} as DealershipService;
    }

  ngOnInit() {
    

<<<<<<< HEAD
<<<<<<< HEAD
  //   this.getallDealerships();
=======
    this.getallDealerships();
>>>>>>> parent of 8ecf2ac (changes)



    this.dealershipForm = this.fb.group({
      FleetName: ['', [Validators.required]],
      FleetLocation: ['', [Validators.required]],
      FleetID: ['', [Validators.required]],
      FleetVehicleQty: ['', [Validators.required]],
  });

  /*
  this.service.getList().subscribe(data => {
    this.dealershipList = data.map(e => {
      return {
        id: e.payload.doc.id,
        DealershipID: e.payload.doc.data()['DealershipID'],
        DealershipName: e.payload.doc.data()['DealershipName'],
        AddressName: e.payload.doc.data()['AddressName'],
      };
    })
    console.log(this.dealershipList);

  });
  */
=======
    this.getallDealerships();
>>>>>>> a6593f7130021485db44e9f0ab47503ba5876a34
 
  }

  async getallDealerships(){

    this.dealershipservice.getDealershipList().subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }



  async removeDealership(id){
    const confirmDeleteAlert = await this.alertCtrl.create({
      header: 'Remove Dealership',
      message: 'Are you sure you would like to remove this dealership from the system?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: end => {
          this.alertCtrl.dismiss();
        }
      },
      {
        text: 'Remove',
        role: 'remove',
        handler: () => {
<<<<<<< HEAD
<<<<<<< HEAD
          this.service.deleteDealership(dealershipID);
=======
          this.dealershipservice.deleteDealership(id);
>>>>>>> a6593f7130021485db44e9f0ab47503ba5876a34
=======
          this.service.deleteDealership(id);
>>>>>>> parent of 8ecf2ac (changes)
          this.presentToast();
        }
      }]
    });

    confirmDeleteAlert.present();

  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Dealership has been removed successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}



/*if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }*/