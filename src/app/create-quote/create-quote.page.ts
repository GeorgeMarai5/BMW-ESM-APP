import { Component, OnInit ,NgZone} from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { QuoteService } from '../services/quote.service';
import { Quote } from '../models/Quote';
@Component({
  selector: 'app-create-quote',
  templateUrl: './create-quote.page.html',
  styleUrls: ['./create-quote.page.scss'],
})
export class CreateQuotePage implements OnInit {

QuoteForm: FormGroup;

  constructor(public authService: AuthService,
    public fb: FormBuilder,
    public router: Router, 
    private quoteservice: QuoteService,
    private zone: NgZone) { }

  ngOnInit() {

    this.QuoteForm = this.fb.group({
      ClientName: ['', [Validators.required]],
      Date: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Accepted: ['', [Validators.required]],
    
  }
    )
}



  CreateQuote(){
  
    const quote = {
      ClientName: this.QuoteForm.get('ClientName').value,
      Date: this.QuoteForm.get('Date').value,
      Description: this.QuoteForm.get('Description').value,
      Accepted: this.QuoteForm.get('Accepted').value
      
}
this.quoteservice.CreateQuote(this.QuoteForm.value).subscribe((res) => {
  this.zone.run(() => {
    console.log(res)
    this.QuoteForm.reset();
})

}
)
    console.log(quote);

this.quoteservice.CreateQuote(quote)

   // this.router.navigate(['tabs/tab3']);
  }





}








  







/*

 if (!this.QuoteForm.valid) {
      return false;
    } else {
      this.QuoteService.CreateQuote(this.QuoteForm.value)
        .subscribe((res) => {
          this.zone.run(() => {
            console.log(res)
            this.QuoteForm.reset();
            this.router.navigate(['/home']);
          })
        });
    }



 const quote = {
        ClientName: this.QuoteForm.get('ClientName').value,
        Date: this.QuoteForm.get('Date').value,
        Description: this.QuoteForm.get('Description').value
        Accepted: this.QuoteForm.get('Accepted').value
 }
    this.quoteservice.CreateQuote(quote).subscribe((res: any) => {
      this.orderAlert();
      localStorage.push(quote);
     // this.router.navigate(['tabs/tab3']);
    });
  }














 console.log(this.QuoteForm.value);
    this.quoteservice.CreateQuote(this.QuoteForm.value).subscribe(data => {
      this.QuoteForm.reset();
      alert("Quote successfully Created")
      console.log("successfully created")
    })
      
  






*/










  
  
  
  
   






