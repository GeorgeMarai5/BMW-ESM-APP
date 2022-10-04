import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { Router, NavigationExtras,ActivatedRoute } from '@angular/router';
import { QuoteService } from '../services/quote.service';

// interface QuoteData {
//   ClientName: string;
//   Date: string;
//   Description: string;
//   Accepted: string;
// }

@Component({
  selector: 'app-view-quote',
  templateUrl: './view-quote.page.html',
  styleUrls: ['./view-quote.page.scss'],
})

export class ViewQuotePage implements OnInit {
  
  QuoteList = [];
  viewQuoteForm: FormGroup;
  //quotedata: QuoteData;
  data: any;
  searchTerm: string;

  constructor(public authService: AuthService, public router: Router, private activatedRoute: ActivatedRoute, private quoteservice: QuoteService,
    private fb:FormBuilder) {
      this.activatedRoute.params.subscribe(params => {
        this.data = params.id;
    });
  
    quoteservice = {} as QuoteService;
   }

  ngOnInit() {
    

    this.quoteservice.getQuote(this.data).subscribe(response => {
      console.log(response);
      this.data = response;
    });

    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
    
    var coll = document.getElementsByClassName("collapsible");
    var i;
    let up = document.getElementById('up');
    let down = document.getElementById('down');

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
          down.style.display = "none";
          up.style.display = "block";
        } else {
          content.style.display = "block";
          up.style.display = "none";
          down.style.display = "block";
        }
      });
    }
    
   

  
  }

  navToUpdate() {
    this.router.navigate(['tabs/update/quote', this.data.id]);
  }

  viewServiceNote() {
    this.router.navigate(['tabs/view/service-note', this.data.id]);
  }

  getQuote(id){

  }
}