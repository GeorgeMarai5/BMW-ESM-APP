import { Component, OnInit ,NgZone} from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { QuoteService } from '../services/quote.service';
import { Quote, Quotes } from '../models/Quote';
import { ToastController } from '@ionic/angular';


interface QuoteData {

  ClientName: String;
  Date: String;
  Description: String;
  Accepted: String;

}

@Component({
  selector: 'app-create-quote',
  templateUrl: './create-quote.page.html',
  styleUrls: ['./create-quote.page.scss'],
})

export class CreateQuotePage implements OnInit {

  QuoteData: QuoteData;
  createQuoteForm: FormGroup;
  isSubmitted = false;
  data:Quotes;

  constructor(public authService: AuthService, public fb: FormBuilder, public router: Router, private quoteservice: QuoteService,
    private zone: NgZone, public toastCtrl: ToastController) { 

      this.QuoteData = {} as QuoteData;
      this.data = new Quotes();
    }

  ngOnInit() {

    

    this.createQuoteForm = this.fb.group({
      ClientName: ['', [Validators.required]],
      Date: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Accepted: ['', [Validators.required]],
    });
  }

  submit(){
    console.log(this.createQuoteForm.value);
    this.quoteservice.create_Quote(this.createQuoteForm.value).then(resp => {
      this.createQuoteForm.reset();
      this.presentToast();
    }).catch(error => {
        console.log(error);
      });

      this.router.navigate(['/search/quote']);
  }



  create(){

  
    this.quoteservice.AddQuote(this.data).subscribe(response => {
      console.log(response);
      //this.router.navigate(['student-list']);
    });
  }



  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'A new quote has been created successfully',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }

  get errorControl() {
    return this.createQuoteForm.controls;
  }
}