import { Component, OnInit,NgZone } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import{FleetService} from '../services/fleet.service';

interface FleetData {
  FleetName: string;
  FleetLocation: string;
  
}



@Component({
  selector: 'app-create-fleet',
  templateUrl: './create-fleet.page.html',
  styleUrls: ['./create-fleet.page.scss'],
})
export class CreateFleetPage implements OnInit {

  //studentList = [];
  fleetData: FleetData;
  fleetForm: FormGroup;
  

  constructor(public authService: AuthService,public fb: FormBuilder, private fleetservice:FleetService) {

    {
      this.fleetData = {} as FleetData;
    }

   }





  ngOnInit() {

    this.fleetForm = this.fb.group({
      FleetName: ['', [Validators.required]],
      FleetLocation: ['', [Validators.required]],
      
    })





  }



  CreateFleet() {
    console.log(this.fleetForm.value);
    this.fleetservice.create_Fleet(this.fleetForm.value).then(resp => {
      this.fleetForm.reset();
    })
      .catch(error => {
        console.log(error);
      });
  }

}
