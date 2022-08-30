import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Console } from 'console';
import { AuthService } from '../services/auth.service';
import { Service } from '../services/service.service';

@Component({
  selector: 'app-assign-dealership',
  templateUrl: './assign-dealership.page.html',
  styleUrls: ['./assign-dealership.page.scss'],
})
export class AssignDealershipPage implements OnInit {

  assignDealershipForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, public firestore: AngularFirestore, 
    public service: Service, public router: Router, private toastCtrl: ToastController) { 
        this.route.params.subscribe(params => {
          this.data = params['id'];
        });
      this.assignDealershipForm = new FormGroup({
        dealershipName: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required)
      })
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.assignDealershipForm.valid){
      return false;
    }
    else{
      const dealership = {
        DealershipID: '00' /*add id*/,
        DealershipName: this.assignDealershipForm.get('dealershipName').value,
        AddressName: this.assignDealershipForm.get('address').value
      }
      this.firestore.collection('Dealership').add(dealership).then(function(docRef){
        const dealershipID = {
          dealershipID: docRef.id
        }
        this.service.updateService(this.data, {"DealershipID": dealershipID});
        this.presentToast();
      });
    }

    this.router.navigate(['tabs/search/dealership'], this.data);
  }

  ngOnInit() {
    this.assignDealershipForm.setValue({dealershipName: '', address: ''});
  }

  get errorControl() {
    return this.assignDealershipForm.controls;
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Dealership has been assigned successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }

  checkWhiteSpaces(str){
    if (!/\S/.test(str)) {
      return true;
    }
    else{
      return false;
    }
  }
}
