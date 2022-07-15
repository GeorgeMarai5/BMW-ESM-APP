import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-search-quote',
  templateUrl: './search-quote.page.html',
  styleUrls: ['./search-quote.page.scss'],
})
export class SearchQuotePage implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
