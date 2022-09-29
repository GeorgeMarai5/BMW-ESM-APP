import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UntypedFormBuilder,UntypedFormGroup, FormControl, Validators, Form } from '@angular/forms';
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
  viewQuoteForm: UntypedFormGroup;
  quotedata: QuoteData;
  data: any;

  constructor(public authService: AuthService, public router: Router, private route: ActivatedRoute, private quoteservice: QuoteService,
    private fb:UntypedFormBuilder) {
      this.route.params.subscribe(params => {
        this.data = params.id;
    });
      this.quotedata = {} as QuoteData;
   }

  ngOnInit() {
    // this.quoteservice.getQuoteList().subscribe(data => {
    //   this.QuoteList = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       isEdit: false,
    //       ClientName: e.payload.doc.data()['ClientName'],
    //       Date: e.payload.doc.data()['Date'],
    //       Description: e.payload.doc.data()['Description'],
    //       Accepted: e.payload.doc.data()['Accepted'],
    //     };
    //   });

    //   console.log(this.QuoteList);
    // });
  }

  navToUpdate() {
    this.router.navigate(['tabs/update/quote', this.data]);
  }

  viewServiceNote() {
    this.router.navigate(['tabs/view/service-note', this.data]);
  }

  getQuotes(id){

  }
}