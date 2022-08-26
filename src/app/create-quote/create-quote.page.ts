import { Component, OnInit ,NgZone} from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { QuoteService } from '../services/quote.service';
import { Quote } from '../models/Quote';
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
  QuoteForm: FormGroup;

  constructor(public authService: AuthService, public fb: FormBuilder, public router: Router, private quoteservice: QuoteService,
    private zone: NgZone, public toastCtrl: ToastController) { 

      this.QuoteData = {} as QuoteData;

    }

  ngOnInit() {

    this.QuoteForm = this.fb.group({
      ClientName: ['', [Validators.required]],
      Date: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Accepted: ['', [Validators.required]],
    });
  }

  submit(){
    console.log(this.QuoteForm.value);
    this.quoteservice.create_Quote(this.QuoteForm.value).then(resp => {
      this.QuoteForm.reset();
      this.presentToast();
    }).catch(error => {
        console.log(error);
      });

      this.router.navigate(['/search/quote']);
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'A new quote has been created successfully',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}