import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { AddressService } from '../services/Address.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Address } from '../models/Address';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  AddressList = [];
  AddressList$!:Observable<any[]>;
  AddressForm: FormGroup;
  searchTerm: string;
  AddressID: string;
  data: any;
  address: Address;
 


  constructor(public authService: AuthService, public fb: FormBuilder, private addressservice: AddressService, 
    public alertCtrl: AlertController, public router: Router,) { 

      addressservice = {} as AddressService;

    }

  ngOnInit() {
    //this.AddressList$ = this.addressservice.getAddressList();
    this.addressservice.getAddressList().subscribe(res => {
 
      console.log(res);

      //this.AddressList = res;




    });

    this.addressservice.getAddressList().subscribe(res => {

    this.AddressForm = this.fb.group({
      AddressID: res['addressID'],
      Address: ['', [Validators.required]],
      PostalCode: ['', [Validators.required]],
      Date_Of_Update: ['', [Validators.required]],
  });


});

    this.addressservice.getAddressList().subscribe(res => {

     
          
           this.AddressForm.setValue({
            

            
            AddressID: res['addressID'], 
            Address: res['address'],
            PostalCode: res['postal_Code'],
            Date_Of_Update: res['date_of_update'],
         })
         console.log(res);
       });
        
     
  }






  do(){

    this.AddressForm = this.fb.group({
      AddressID: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      PostalCode: ['', [Validators.required]],
      Date_Of_Update: ['', [Validators.required]],
  });

    this.addressservice.getAddressList().subscribe(res => {

     
          
           this.AddressForm.setValue({
            
            AddressID: res['AddressID'], 
            Address: res['FleetLocation'],
            PostalCode: res['PostalCode'],
            Date_Of_Update: res['Date_Of_Update'],
         })
         console.log(res);
       });
        
       
  }
}
