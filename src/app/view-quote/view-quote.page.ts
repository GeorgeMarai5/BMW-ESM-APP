import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-view-quote',
  templateUrl: './view-quote.page.html',
  styleUrls: ['./view-quote.page.scss'],
})
export class ViewQuotePage implements OnInit {

  QuoteForm: FormGroup;




  constructor(public authService: AuthService,public router: Router) { }

  ngOnInit() {
  }

}
