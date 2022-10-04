import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { AssignVehiclePartHelpComponent } from 'app/components/assign-vehicle-part-help/assign-vehicle-part-help.component';
import { Part } from '../models/Part';
import { AuthService } from '../services/auth.service';
import { VehiclePartService } from 'app/services/vehicle-part.service';

@Component({
  selector: 'app-assign-vehicle-part',
  templateUrl: './assign-vehicle-part.page.html',
  styleUrls: ['./assign-vehicle-part.page.scss'],
})
export class AssignVehiclePartPage implements OnInit {

  part: Part;
  types: [];
  parts = {};
  assignPartForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute,
    public fb: FormBuilder, 
    public authService: AuthService, 
    public service: VehiclePartService, 
    public router: Router, 
    public toastCtrl: ToastController,
    public helpModal: ModalController) {

      service = {} as VehiclePartService;
      this.data = new Part();

  }

  async create(){
    this.service.createPart(this.data).subscribe(response => {
      console.log(response);
      this.data = response;
    });
    this.presentToast();
  }

  async showHelp(){
    const modal = await this.helpModal.create({
      component: AssignVehiclePartHelpComponent});
      return await modal.present();
  }

  ngOnInit() {
    if(this.authService.isLoggedIn) {
      return true;
    }
    else {
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
  }

  get errorControl() {
    return this.assignPartForm.controls;
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Part has been successfully assigned.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}