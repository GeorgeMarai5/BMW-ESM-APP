import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { CaptureInitialInspectionDetailsHelpComponent } from 'app/components/capture-initial-inspection-details-help/capture-initial-inspection-details-help.component';
import { AuthService } from '../services/auth.service';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-capture-initial-inspection-details',
  templateUrl: './capture-initial-inspection-details.page.html',
  styleUrls: ['./capture-initial-inspection-details.page.scss'],
})
export class CaptureInitialInspectionDetailsPage implements OnInit {

  inspections: [];
  isSubmitted = false;
  data: any;
  checkList = {};
  inspectionDetailsForm: FormGroup;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, public firestore: AngularFirestore, 
    public service: VehicleService, public router: Router, public toastCtrl: ToastController, public helpModal: ModalController) { 
      this.route.params.subscribe(params => {
        this.data = params['id'];
      });
    }

  ngOnInit() {
    /*if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }*/
    this.checkList = JSON.parse(sessionStorage.getItem('checkList'));

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

  async showHelp(){
    const modal = await this.helpModal.create({
      component: CaptureInitialInspectionDetailsHelpComponent});
      return await modal.present();
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Initial inspection details have been successfully captured.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }

  get errorControl() {
    return this.inspectionDetailsForm.controls;
  }
}
