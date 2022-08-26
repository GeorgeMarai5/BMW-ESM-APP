import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup,FormControl } from '@angular/forms';
import { AddressService } from '../services/Address.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Address } from '../models/Address';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
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
    public alertCtrl: AlertController, public router: Router,private ActivatedRoute: ActivatedRoute) { 

      addressservice = {} as AddressService;

  
      this.AddressForm = new FormGroup({
        addressID: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        postal_Code: new FormControl('', Validators.required),
        date_Of_Update: new FormControl('', Validators.required)

      })

    }

  ngOnInit() {
    //this.AddressList$ = this.addressservice.getAddressList();
    this.addressservice.getAddressList().subscribe(res => {
 
      console.log(res);
      
    });
      //this.AddressList = res;

//let id = this.ActivatedRoute.snapshot.paramMap.get();
this.addressservice.getAddressList().subscribe(res => {
  console.log(res);
  this.data = res;


    });
   


    this.addressservice.getAddressList().subscribe(res =>{
      console.log(res)
      this.AddressForm.setValue({
        addressID: res, 
        address: res['address'],
        postal_Code: res['postal_Code'],
        date_Of_Update: res['date_Of_Update']


      });
    });
    /*

    this.addressservice.getAddressList().subscribe(res => {

    this.AddressForm = this.fb.group({
      AddressID: res[this.data.addressID],
      Address: ['', [Validators.required]],
      PostalCode: ['', [Validators.required]],
      Date_Of_Update: ['', [Validators.required]],
  });


});

    this.addressservice.getAddressList().subscribe(res => {

     
           this.data = res;
           this.AddressForm.setValue({
            

            
            addressID: res.toString['addressID'], 
            address: res['address'],
            postal_Code: res['postal_Code'],
            date_of_Update: res['date_of_Update'],
            
         })
         console.log(res);
         this.data = res;
         console.log(this.data);
       });
        */
     
  }






  do(){

    
      
  }
}
