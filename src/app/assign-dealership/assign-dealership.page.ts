import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
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
    public service: Service, public router: Router) { 
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
        dealershipName: this.assignDealershipForm.get('dealershipName').value,
        address: this.assignDealershipForm.get('address').value
      }
      this.firestore.collection('Dealership').add(dealership).then(function(docRef){
        alert("Dealership has been assigned successfully");
        const dealershipID = {
          dealershipID: docRef.id
        }
        this.service.updateService(this.data, {"DealershipID": dealershipID})
      });
    }

    this.router.navigate(['tabs/search/fleet'], this.data);
  }

  ngOnInit() {
    this.assignDealershipForm.setValue({dealershipName: '', address: ''});
  }

  get errorControl() {
    return this.assignDealershipForm.controls;
  }

}
