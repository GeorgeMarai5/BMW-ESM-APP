import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dealership } from '../models/Dealership';
import { AuthService } from '../services/auth.service';
import { DealershipService } from '../services/dealership.service';

@Component({
  selector: 'app-edit-service-item',
  templateUrl: './edit-service-item.page.html',
  styleUrls: ['./edit-service-item.page.scss'],
})
export class EditServiceItemPage implements OnInit {

  dealerships: Dealership;
  dealership = {};
  editItemForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, 
    public service: DealershipService, public firestore: AngularFirestore, public router: Router) {
      this.route.params.subscribe(params => {
          this.data = params.id;
      });
    this.editItemForm = new FormGroup({
      itemName: new FormControl('', Validators.required),
      itemDescription: new FormControl('', Validators.required)
    })
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.editItemForm.valid){
      return false;
    }
    else{
        const dealership = {
          itemName: this.editItemForm.get('itemName').value,
          itemDescription: this.editItemForm.get('itemDescription').value
        }
        this.service.updateDealership(this.data, dealership)
        alert("Dealership was successfully updated.");
      }
      this.router.navigate(['/tabs/view/dealership', this.data]);
  }

  ngOnInit() {
    this.service.getDealership(this.data).valueChanges()
    .subscribe(res =>{
    console.log(res)
    this.editItemForm.setValue({
      dealershipName: res['DealershipName'], 
      address: res['AddressName']
    })
    });
  }

  get errorControl() {
    return this.editItemForm.controls;
  }

}
