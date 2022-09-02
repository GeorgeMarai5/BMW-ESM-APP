import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { Router, NavigationExtras,ActivatedRoute } from '@angular/router';
import { QuoteService } from '../services/quote.service';

interface QuoteData {
  ClientName: string;
  Date: string;
  Description: string;
  Accepted: string;
}

@Component({
  selector: 'app-view-quote',
  templateUrl: './view-quote.page.html',
  styleUrls: ['./view-quote.page.scss'],
})

export class ViewQuotePage implements OnInit {
  
  QuoteList = [];
  viewQuoteForm: FormGroup;
  quotedata: QuoteData;
  id: any;

  constructor(public authService: AuthService, public router: Router, private actRoute: ActivatedRoute, private quoteservice: QuoteService,
    private fb:FormBuilder) {
      this.quotedata = {} as QuoteData;
   }

  ngOnInit() {
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
      });

      console.log(this.QuoteList);
    });
  }

  getQuotes(id){

  }
}