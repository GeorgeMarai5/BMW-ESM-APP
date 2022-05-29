import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DealershipService } from '../services/dealership.service';
import { Dealership } from '../models/Dealership';

@Component({
  selector: 'app-view-dealership',
  templateUrl: './view-dealership.page.html',
  styleUrls: ['./view-dealership.page.scss'],
})
export class ViewDealershipPage implements OnInit {

  dealerships: Dealership;
  dealership = {};
  viewDealershipForm: FormGroup;
  isSubmitted = false;
  data: any;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, public authService: AuthService, public firestore: AngularFirestore,
    public router: Router, public service: DealershipService) {
      this.route.params.subscribe(params => {
          this.data = params.id;
      });
      this.viewDealershipForm = new FormGroup({
        dealershipName: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required)
      })
     }

  ngOnInit() {
    this.service.getDealership(this.data).valueChanges()
    .subscribe(res =>{
    console.log(res)
    this.viewDealershipForm.setValue({
      dealershipName: res['DealershipName'], 
      address: res['AddressName']
    })
    });
  }

  navToUpdate() {
    this.router.navigate(['/tabs/edit/dealership', this.data]);
  }

}