
import { Component, OnInit,NgZone } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import{FleetService} from '../services/fleet.service';
import { ActivatedRoute, Router } from '@angular/router';

interface FleetData {
  FleetName: string;
  FleetLocation: string;
  
}



@Component({
  selector: 'app-edit-fleet',
  templateUrl: './edit-fleet.page.html',
  styleUrls: ['./edit-fleet.page.scss'],
})
export class EditFleetPage implements OnInit {

  
  fleetData: FleetData;
  fleetForm: FormGroup;
  isSubmitted = false;
  id: any;
  Fleet = {};
  

  constructor(public authService: AuthService,public fb: FormBuilder, private fleetservice:FleetService,private route: ActivatedRoute, private router: Router) {

      
      this.fleetData = {} as FleetData;
           
      this.fleetForm = new FormGroup({
        FleetName: new FormControl('', Validators.required),
        FleetLocation: new FormControl('', Validators.required)
  })
   }


   submitForm(){
    this.isSubmitted = true;
    if(!this.fleetForm.valid){
      return false;
    }
    else{
        const Fleet = {
          FleetName: this.fleetForm.get('FleetName').value,
          FleetLocation: this.fleetForm.get('FleetLocation').value,
          
        }
        this.fleetservice.update_Fleet(this.id, Fleet)
        alert("Fleet was successfully updated.");
      }
      this.router.navigate(['/tabs/view/fleet'], this.id);
  }




  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.fleetservice.getFleet('BGcTH5Vg40i8BHMNju5x').valueChanges()
    .subscribe(res =>{
    console.log(res)
    this.fleetForm.setValue({
      FleetName: res['FleetName'], 
      FleetLocation: res['FleetLocation']
      
    })
    });

  }

  get errorControl() {
    return this.fleetForm.controls;
  }



EditFleet(Fleet) {
  Fleet.isEdit = true;
  Fleet.EditFleetName = Fleet.FleetName;
  Fleet.EditFleetLocation = Fleet.FleetLocation;
  
}


UpdateFleet(Fleet) {
  let FleetID = {};
  Fleet['FleetName'] = Fleet.FleetName;
  Fleet['FleetLocation'] = Fleet.FleetLocation; 
  this.fleetservice.update_Fleet(Fleet.id,Fleet);
  //Fleet.isEdit = false;
  console.log(Fleet,"successfully updated")
}



}
