import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteService } from '../services/quote.service';
import { AlertController, ToastController } from '@ionic/angular';

interface QuoteData {
  ClientName: string;
  Date: string;
  Description: string;
  Accepted: string;
  
}

@Component({
  selector: 'app-search-quote',
  templateUrl: './search-quote.page.html',
  styleUrls: ['./search-quote.page.scss'],
})
export class SearchQuotePage implements OnInit {

  QuoteList = [];
  QuoteForm: FormGroup;
  quotedata: QuoteData;
  id: any;
  data: any;
  searchTerm: string;
  ClientName: string;

  constructor(public authService: AuthService,private fb: FormBuilder,public router: Router, private actRoute: ActivatedRoute, 
    private quoteservice: QuoteService, public alertCtrl: AlertController, public toastCtrl: ToastController) { 
      quoteservice = {} as QuoteService;

    }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }


    this.getallQuotes();






  }

  getallQuotes(){

    this.quoteservice.getList().subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }






  async DeleteQuote(id){
    const confirmDeleteAlert = await this.alertCtrl.create({
      header: 'Remove Fleet',
      message: 'Are you sure you would like to remove this Fleet from the system?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: end => {
          this.alertCtrl.dismiss();
        }
      },
      {
        text: 'Remove',
        role: 'remove',
        handler: () => {
          //this.quoteservice.delete_Quote(id);
          this.presentToast();
        }
      }]
    });

    confirmDeleteAlert.present();

  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Fleet has been removed successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}


















/*

this.QuoteForm = this.fb.group({
      ClientName: ['', [Validators.required]],
      Date: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Accepted: ['', [Validators.required]],
    });

    this.quoteservice.get_Quote().subscribe(data => {

      this.QuoteList = data.map(e => {
        
        return {
          id: e.payload.doc.id,
          isEdit: false,
          ClientName: e.payload.doc.data()['ClientName'],
          Date: e.payload.doc.data()['Date'],
          Description: e.payload.doc.data()['Description'],
          Accepted: e.payload.doc.data()['Accepted'],
        };
      })
      console.log(this.QuoteList);

    });




*/