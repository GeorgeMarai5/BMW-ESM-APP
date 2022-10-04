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

  constructor(public authService: AuthService, private service: DealershipService, public fb: FormBuilder, private firestore: AngularFirestore, 
    public alertCtrl: AlertController, public router: Router, public toastCtrl: ToastController) { 

      this.dealerships = {} as Dealership;
    }

  ngOnInit() {
    this.getallDealerships();
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }

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

  //   this.getallDealerships();
    



    this.dealershipForm = this.fb.group({
      FleetName: ['', [Validators.required]],
      FleetLocation: ['', [Validators.required]],
      FleetID: ['', [Validators.required]],
      FleetVehicleQty: ['', [Validators.required]],
  });

  
 
  }

  getallDealerships(){

    this.service.getDealershipList().subscribe(response => {
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
          this.service.deleteDealership(id);
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
