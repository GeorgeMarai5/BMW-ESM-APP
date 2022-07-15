import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-quote',
  templateUrl: './create-quote.page.html',
  styleUrls: ['./create-quote.page.scss'],
})
export class CreateQuotePage implements OnInit {

QuoteForm: FormGroup;

  constructor(public authService: AuthService,public router: Router) { }

  ngOnInit() {
  }

}
