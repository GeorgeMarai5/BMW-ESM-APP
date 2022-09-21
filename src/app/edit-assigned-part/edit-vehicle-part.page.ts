import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignedPart } from '../models/AssignedPart';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { AssignedPartService } from '../services/assigned-part.service';


@Component({
  selector: 'app-edit-vehicle-part',
  templateUrl: './edit-vehicle-part.page.html',
  styleUrls: ['./edit-vehicle-part.page.scss'],
})
export class EditVehiclePartPage implements OnInit {

  assignedParts: AssignedPart;
  assignedPart = {};
  partTypes = [];
  editPartForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, 
    public service: AssignedPartService, public firestore: AngularFirestore, public router: Router, private toastCtrl: ToastController) {
      this.route.params.subscribe(params => {
          this.data = params.id;
      });
    this.editPartForm = new FormGroup({
      partName: new FormControl('', [Validators.required]),
      partType: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      partStock: new FormControl('', Validators.required)
    })
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.editPartForm.valid){
      return false;
    }
    else{
        const assignedPart = {
          partName: this.editPartForm.get('partName').value,
          partType: this.editPartForm.get('partType').value,
          Description: this.editPartForm.get('Description').value,
          partStock: this.editPartForm.get('partStock').value,
        }
        this.service.updateItem(this.data, assignedPart)
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

    this.service.getItem(this.data)
    .subscribe(res =>{
    console.log(res)
    this.editPartForm.setValue({
      partName: res['PartName'],
      partType: res['PartType'], 
      Description: res['Description'], 
      partStock: res['PartInStock']
    })
    });
  }

  get errorControl() {
    return this.editPartForm.controls;
  }

  back(){
    this.router.navigate(['tabs/view/assigned-part', this.data]);
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
