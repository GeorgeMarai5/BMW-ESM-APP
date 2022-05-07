import { Component, OnInit,ElementRef, Input, Output } from '@angular/core';
import { FormBuilder,Validators,FormGroup, AnyForUntypedForms } from '@angular/forms';
import { AngularDelegate } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';


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


  }

  logForm(){
    console.log(this.Clientpage.value)
    
  }



  ngOnInit() {
    this.clientList = JSON.parse(sessionStorage.getItem('Client'));


  }

  async removeAlert(){

    let toast = await this.toastCtrl.create({
      message: 'The client was removed',
      duration: 3000,
      position: 'top',
    });

  }
  deleteClient(){
    this.removeAlert();
    sessionStorage.removeItem('Client')
    
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

  this.router.navigate(['SearchclientaccountPage'])
}




}



function deleteClient(item: any, any: any) {
  throw new Error('Function not implemented.');
}


