import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup,FormControl } from '@angular/forms';
import { AddressService } from '../services/Address.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Address } from '../models/Address';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ad } from '../models/Address';
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
  dat: ad
  information= null;
  //addres: Address = {addressID: null, address:'',postal_Code:'',date_Of_Update: ''}


  constructor(public authService: AuthService, public fb: FormBuilder, private addressservice: AddressService, 
    public alertCtrl: AlertController, public router: Router,public ActivatedRoute: ActivatedRoute) { 
      
      addressservice = {} as AddressService;
      this.data = [];
      this.dat = new ad();
    
    
    }

  ngOnInit() {
    this.addressservice.getList().subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }




  ionViewWillEnter() {
    // Used ionViewWillEnter as ngOnInit is not 
    // called due to view persistence in Ionic
    this.do();
  }

  do(){

    {
      //Get saved list of students
      this.addressservice.getList().subscribe(response => {
        console.log(response);
        this.data = response;
      })
    }
      
  }

create(){

  
    this.addressservice.createAddress(this.dat).subscribe((response) => {
      console.log(response);
      this.router.navigate(['student-list']);
    });


}

delete(item) {
  //Delete item in Student data
  this.addressservice.deleteItem(item.id).subscribe(Response => {
    //Update list after delete is successful
    this.addressservice.getList();
  });
}




}





/*



//this.AddressList$ = this.addressservice.getAddressList();
    this.addressservice.getAddressList().subscribe(res => {

      console.log(res);
      //this.addres = res;


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
     












