import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Service } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
interface ServiceData {
  TeamName: string;
  ServiceTypeName: string;
  
}

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.page.html',
  styleUrls: ['./create-service.page.scss'],
})
export class CreateServicePage implements OnInit {

  services: Service;
  serviceList = [];
  serviceForm: FormGroup;
  searchTerm: string;
  deleteModal: HTMLElement;
  isSubmitted = false;
  data: any;


  constructor(private route: ActivatedRoute, public router: Router,  public firestore: AngularFirestore, public authService: AuthService, public fb: FormBuilder, private _service: Service) {
    this.route.params.subscribe(params => {
      this.data = params['id'];
    });
    this.serviceForm = new FormGroup({
      TeamName: new FormControl('', [Validators.required]),
      ServiceTypeName: new FormControl('', Validators.required)
    })
      
   }


  //   this.serviceForm = this.fb.group({
  //     TeamName: ['', [Validators.required]],
  //     ServiceTypeName: ['', [Validators.required]],
  //   })
  //   // const auth = getAuth();
  //   // const currUser = auth.current.uid;
  
  // this._service.readService().subscribe(data => {
  //   this.serviceList = data.map(e => {
  //     return {
  //       id: e.payload.doc.id,
  //       DealershipID: e.payload.doc.data()['DealershipID'],
  //       DealershipName: e.payload.doc.data()['DealershipName'],
  //       AddressName: e.payload.doc.data()['AddressName'],
  //     };
  //   })
  //   console.log(this.serviceList);

  // });
  // }

  // CreateService() {
  //   console.log(this.serviceForm.value);
  //   this._service.createService(this.serviceForm.value).then(resp => {
  //     this.serviceForm.reset();
  //     alert("A new service has been created successfully.")
  //   })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  
  submitForm(){
    this.isSubmitted = true;
    if(!this.serviceForm.valid){
      return false;
    }
    else{
      const service = {
        TeamName: this.serviceForm.get('TeamName').value,
        ServiceTypeName: this.serviceForm.get('ServiceTypeName').value
      }
      this.firestore.collection('Service').add(service).then(function(docRef){
        alert("Service has been created successfully");
        const serviceID = {
          dealershipID: docRef.id
        }
        this.service.updateService(this.data, {"ServiceID": serviceID})
      });
    }

    this.router.navigate(['tabs/assign/dealership'], this.data);
  }
  ngOnInit() {
    this.serviceForm.setValue({TeamName: '', ServiceTypeName: ''});
}
get errorControl() {
  return this.serviceForm.controls;
}
navToAssign() {
  this.router.navigate(['/tabs/assign/dealership', this.data]);
}
}
