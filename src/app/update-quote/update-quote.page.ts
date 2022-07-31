import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { QuoteService } from '../services/quote.service';

@Component({
  selector: 'app-update-quote',
  templateUrl: './update-quote.page.html',
  styleUrls: ['./update-quote.page.scss'],
})
export class UpdateQuotePage implements OnInit {

QuoteForm: FormGroup;
id: any;
  constructor(public authService: AuthService,
    public router: Router,
    private quoteservice: QuoteService) { }
  

  ngOnInit() {
  }



  updateQuote(id) {
    

}

}
