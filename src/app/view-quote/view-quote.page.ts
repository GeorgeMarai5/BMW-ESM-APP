import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { Router, NavigationExtras,ActivatedRoute } from '@angular/router';
import { QuoteService } from '../services/quote.service';
@Component({
  selector: 'app-view-quote',
  templateUrl: './view-quote.page.html',
  styleUrls: ['./view-quote.page.scss'],
})
export class ViewQuotePage implements OnInit {

  QuoteForm: FormGroup;
 
  id: any;



  constructor(public authService: AuthService,public router: Router, 
    private actRoute: ActivatedRoute,private quoteservice: QuoteService) {


    this.id = this.actRoute.snapshot.paramMap.get('id');

   }

  ngOnInit() {
  }



  getQuotes(id){

    
      this.quoteservice.GetQuote(id).subscribe(res => {
        this.QuoteForm.setValue({
          ClientName: res['ClientID'],
          Date: res['Date'],
          Description: res['Description'],
          Accepted: res['is_accepted']
        });
      });
    }
  

}
