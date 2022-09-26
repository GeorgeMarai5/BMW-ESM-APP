import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Console } from 'console';
import { Dealership } from '../models/Dealership';
import { AuthService } from '../services/auth.service';
import { Service } from '../services/service.service';
import { DealershipService } from '../services/dealership.service';

@Component({
  selector: 'app-assign-dealership',
  templateUrl: './assign-dealership.page.html',
  styleUrls: ['./assign-dealership.page.scss'],
})
export class AssignDealershipPage implements OnInit {
  assignDealershipForm: FormGroup;
  isSubmitted = false;
  dealership: Dealership;
  data: any;

  constructor(private route: ActivatedRoute,
    public fb: FormBuilder, 
    public authService: AuthService,
    public service: Service, public router: Router, 
    private toastCtrl: ToastController, 
    private dealershipservice: DealershipService) { 

      dealershipservice = {} as DealershipService;
      this.route.params.subscribe(params => {
       this.data = params['id'];
      });
      this.assignDealershipForm = new FormGroup({
        dealershipName: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required)
      })

  }

  // submitForm(){
  //   this.isSubmitted = true;
  //   if(!this.assignDealershipForm.valid){
  //     return false;
  //   }
  //   else{
  //     const dealership = {
  //       DealershipID: '00' ,
  //       DealershipName: this.assignDealershipForm.get('dealershipName').value,
  //       AddressName: this.assignDealershipForm.get('address').value
  //     }
  //       //this.service.updateService(this.dealership, {"DealershipID": Dealership});
  //       this.presentToast();
  //   }
  //   this.router.navigate(['tabs/search/dealership'], this.data);
  // }

  ngOnInit() {
    this.assignDealershipForm.setValue({dealershipName: '', address: ''});
    this.assignDealership()
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
  }

  async assignDealership(){
    this.dealershipservice.createDealership(this.data).subscribe(response => {
      console.log(response);
      //this.router.navigate(['student-list']);
    });

  }

submitForm(){
  this.isSubmitted = true;
  if(!this.assignDealershipForm.valid){
    return false;
  }
  else{
      const dealershipGroup = this.fb.group({dealershipName : ""});
      this.assignDealershipForm = this.fb.group({
        address: this.fb.group({
          dealershipName: ""
        })
        });
    }
    this.presentToast();
    this.router.navigate(['/tabs/search/fleet']);
      //  dealershipId: this.assignDealershipForm.get('dealershipId').value,
      //   dealershipName: this.assignDealershipForm.get('dealershipName').value,
      //   address: this.assignDealershipForm.get('address').value
      // const assignedDealership = {
      //   name: this.assignDealershipForm.get("dealershipName").get("address").value;
      // //  dealershipId: this.assignDealershipForm.get('dealershipId').value,
      // //   dealershipName: this.assignDealershipForm.get('dealershipName').value,
      // //   address: this.assignDealershipForm.get('address').value
      // }
      //console.log(assignedDealership);
     // this.dealershipservice.createDealership(assignedDealership);
      
}
getValue(){
  console.log(this.assignDealershipForm.get("address").get("dealershipName").value);
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

function getValue() {
  throw new Error('Function not implemented.');
}
