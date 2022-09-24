import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteService } from '../services/quote.service';
import { ToastController } from '@ionic/angular';
import { Quote } from 'app/models/Quote';

@Component({
  selector: 'app-update-quote',
  templateUrl: './update-quote.page.html',
  styleUrls: ['./update-quote.page.scss'],
})
export class UpdateQuotePage implements OnInit {

  editquoteForm: FormGroup;
  quotedata: Quote;
  QuoteList = [];
  isSubmitted = false;
  data: any;
  
  constructor(public authService: AuthService, 
    public router: Router, 
    private quoteservice: QuoteService, 
    private fb: FormBuilder,
    private route: ActivatedRoute, 
    public toastCtrl: ToastController) { 

      this.route.params.subscribe(params => {
        this.data = params.id;
    });
    this.editquoteForm = new FormGroup({
      ClientName: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      Date: new FormControl('', Validators.required),
      Accepted: new FormControl('', Validators.required)
    });

  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.editquoteForm.valid){
      return false;
    }
    else{
        const QuoteData = {
          ClientName: this.editquoteForm.get('ClientName').value,
          Date: this.editquoteForm.get('Date').value,
          Description: this.editquoteForm.get('Description').value,
          Accepted: this.editquoteForm.get('Accepted').value
        }
        this.quoteservice.updateQuote(this.data, QuoteData)
        this.presentToast()
      }
      this.router.navigate(['/tabs/view/dealership', this.data]);
  }

  ngOnInit() {
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }

    /*this.quoteservice.get_Quote(this.data)
    .subscribe(res =>{
    console.log(res)
    this.editquoteForm.setValue({
      ClientName: res['ClientName'],
      Date: res['Date'], 
      Description: res['Description'], 
      Accepted: res['Accepted']
    })
    });*/
  }

  get errorControl() {
    return this.editquoteForm.controls;
  }

  back() {
    this.router.navigate(['tabs/view/quote', this.data]);
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Quote has been updated successfully.',
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }
}