import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { AngularDelegate } from '@ionic/angular';
//import{HttpClient} from '@angular/core'

@Component({
  selector: 'app-view-client-account',
  templateUrl: './view-client-account.page.html',
  styleUrls: ['./view-client-account.page.scss'],
})
export class ViewClientAccountPage implements OnInit {

  
    public Clientpage : FormGroup;
  
  constructor(private formBuilder: FormBuilder) { 


    this.Clientpage = this.formBuilder.group({
      title: [''],
      First_Name: [''], Last_Name: [''],
      Phone_Number: [''], Email_Address: [''],
      Address: ['']
    });


  }

  logForm(){
    console.log(this.Clientpage.value)
  }

  ngOnInit() {



  }


  update(){   

    //this.createform.patchValue({

   //title: this.ClientDate.title

   //first_name: this.ClientData.first_name,

   //last_name: this.ClientData.last_name,

   //username: this.ClientData.username,

   //email: this.ClientData.email,

 //})





}

delete(){



}



back(){


}




}
