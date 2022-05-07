import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup, AnyForUntypedForms } from '@angular/forms';
import { AngularDelegate } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
//import{HttpClient} from '@angular/core'

@Component({
  selector: 'app-view-client-account',
  templateUrl: './view-client-account.page.html',
  styleUrls: ['./view-client-account.page.scss'],
})
export class ViewClientAccountPage implements OnInit {

  
    public Clientpage : FormGroup;
    clientList: [];

  title: String;
  FirstName: string;
  LastName: string;
  PhoneNumber: number;
  Email: string;
  Address: String;
  
  
  constructor(private toastCtrl: ToastController,private service: PostService, private formBuilder: FormBuilder,private router: Router) { 


    //this.Clientpage = this.formBuilder.group({
      //title: [''],
      //First_Name: [''], Last_Name: [''],
      //Phone_Number: [''], Email_Address: [''],
     // Address: ['']
  


  }

  logForm(){
    console.log(this.Clientpage.value)
    
  }



  ngOnInit() {
    this.clientList = JSON.parse(localStorage.getItem('Client'));


  }

  async removeAlert(){

    let toast = await this.toastCtrl.create({
      message: 'The client was removed',
      duration: 3000,
      position: 'top',
    });


  deleteClient(){
    this.removeAlert();
    this.Clientpage.splice(this.Clientpage.indexOf(item),1);
    localStorage.setItem('basket',JSON.stringify(this.Clientpage));
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





back(){


}




}

}

function deleteClient(item: any, any: any) {
  throw new Error('Function not implemented.');
}
