import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteService } from '../services/quote.service';
import { AlertController, ToastController } from '@ionic/angular';

// interface QuoteData {
//   ClientName: string;
//   Date: string;
//   Description: string;
//   Accepted: string;
  
// }

@Component({
  selector: 'app-search-quote',
  templateUrl: './search-quote.page.html',
  styleUrls: ['./search-quote.page.scss'],
})
export class SearchQuotePage implements OnInit {

  QuoteList = [];
  QuoteForm: FormGroup;
  //quotedata: QuoteData;
  id: any;
  data: any;
  searchTerm: string;
  ClientName: string;

  constructor(public authService: AuthService, public fb: FormBuilder, private quoteservice: QuoteService, 
    public alertCtrl: AlertController, public toastCtrl: ToastController, public router: Router) { 

    quoteservice = {} as QuoteService;

  }

  ngOnInit() {
    this.getAllQuotes();

    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);

 
    }
    this.getAllQuotes();
    var coll = document.getElementsByClassName("collapsible");
    var i;
    let up = document.getElementById('up');
    let down = document.getElementById('down');

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
          down.style.display = "none";
          up.style.display = "block";
        } else {
          content.style.display = "block";
          up.style.display = "none";
          down.style.display = "block";
        }
      });
    }


    

    //this.fleetservice.getList().subscribe(response => {
      //console.log(response);
      //this.data = response;

  //})

    }

gotoview(id){


  //this.router.navigate(['/tabs/view/fleet', this.data]);



}





    async getAllQuotes(){

      this.quoteservice.getQuoteList().subscribe(response => {
        console.log(response);
        this.data = response;
      })
    }

    
    async deleteQuote(item){
      const confirmDeleteAlert = await this.alertCtrl.create({
        header: 'Remove Quote',
        message: 'Are you sure you would like to remove this Quote from the system?',
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
            this.quoteservice.deleteQuote(item.QuoteId).subscribe(Response => {
              //Update list after delete is successful
              console.log(Response);
              this.getAllQuotes()
      
            });
            this.presentToast();
          }
        }]
      });
  
      confirmDeleteAlert.present();
      //Delete item in Student data
      
    }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Quote has been removed successfully.',
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