import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AssignedPartService } from '../services/assigned-part.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perform-postcheck',
  templateUrl: './perform-postcheck.page.html',
  styleUrls: ['./perform-postcheck.page.scss'],
})
export class PerformPostcheckPage implements OnInit {

  assignedPart = {};
  checks = [];
  postServiceForm: UntypedFormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: UntypedFormBuilder, public authService: AuthService, 
    public service: AssignedPartService, public firestore: AngularFirestore, public router: Router, private toastCtrl: ToastController) {
      this.route.params.subscribe(params => {
          this.data = params.id;
      });
    this.postServiceForm = new UntypedFormGroup({
      check: new UntypedFormControl('', [Validators.required])
    })
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.postServiceForm.valid){
      return false;
    }
    else{
        const assignedPart = {
          check: this.postServiceForm.get('check').value
        }
        this.service.updateAssignedPart(this.data, assignedPart)
        this.presentToast();
      }
      this.router.navigate(['/tabs/view/assigned-part', this.data]);
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
    return this.postServiceForm.controls;
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Assigned Part has been updated successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}
