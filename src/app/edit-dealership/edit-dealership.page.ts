import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
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
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, 
    public service: DealershipService, public firestore: AngularFirestore, public router: Router) {
      this.route.params.subscribe(params => {
          this.data = params.id;
      });
    this.editDealershipForm = new FormGroup({
      dealershipName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required)
    })
  }

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
        this.service.updateDealership(this.data, dealership)
        alert("Vehicle was successfully updated.");
      }
      this.router.navigate(['/tabs/view/dealership', this.data]);
  }

  ngOnInit() {
    this.service.getDealership(this.data).valueChanges()
    .subscribe(res =>{
    console.log(res)
    this.editDealershipForm.setValue({
      dealershipName: res['DealershipName'], 
      address: res['AddressName']
    })
    });
  }

  get errorControl() {
    return this.editDealershipForm.controls;
  }

}
