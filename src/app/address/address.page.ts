import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import{FleetService} from '../services/fleet.service';
import { AddressService } from '../services/Address.service';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
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



  constructor(public authService: AuthService,public fb: FormBuilder, private addressservice:AddressService, 
    public alertCtrl: AlertController, public router: Router,
    ) { 

      this.addressservice = {} as AddressService;


    }

  ngOnInit(): void {
    //this.AddressList$ = this.addressservice.getAddresList();
this.addressservice.getAddresList().subscribe(res => {
 
console.log(res);
}
  )

  


    this.AddressForm = this.fb.group({
      AddressID: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      PostalCode: ['', [Validators.required]],
      Date_Of_Update: ['', [Validators.required]],
  });


  this.addressservice.getAddresList().subscribe((data) => {

    this.AddressList = data.map(e => {
      let yearCode: string;
     
      return {
        id: e.payload.doc.id,
        isEdit: false,
        AddressID: e.payload.doc.data()['AddressID'],
        Address: e.payload.doc.data()['Address'],
        PostalCode: e.payload.doc.data()['PostalCode'],
        Date_Of_Update: e.payload.doc.data()['Date_Of_Update'],
       
      };
    })
    console.log(this.AddressList);

  });


}

}
