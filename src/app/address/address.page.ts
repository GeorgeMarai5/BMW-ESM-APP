import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import{FleetService} from '../services/fleet.service';
import { AddressService } from '../services/Address.service';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Address } from '../models/Address';
@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {


  AddressList = [];

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

  ngOnInit() {


    this.AddressForm = this.fb.group({
      VehicleID: ['', [Validators.required]],
      VinNumber: ['', [Validators.required]],
      ModelName: ['', [Validators.required]],
      Year: ['', [Validators.required]],
  });


  this.addressservice.GetAddress().subscribe(data => {

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