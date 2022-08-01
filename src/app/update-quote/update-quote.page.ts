import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteService } from '../services/quote.service';


interface QuoteData {
  ClientName: string;
  Date: string;
  Description: string;
  Accepted: string;
  
}



@Component({
  selector: 'app-update-quote',
  templateUrl: './update-quote.page.html',
  styleUrls: ['./update-quote.page.scss'],
})
export class UpdateQuotePage implements OnInit {

QuoteForm: FormGroup;
id: any;
quotedata: QuoteData;
QuoteList = [];
isSubmitted = false;
data: any;
  constructor(public authService: AuthService,
    public router: Router,
    private quoteservice: QuoteService,
    private fb: FormBuilder,
    private route: ActivatedRoute) { 



      this.route.params.subscribe(params => {
        this.data = params.id;
    });
  this.QuoteForm = new FormGroup({
    ClientName: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    Date: new FormControl('', Validators.required),
    Accepted: new FormControl('', Validators.required)
  })
}

      

    
  

  ngOnInit() {



    this.quoteservice.getQuote("Y9y4T8I0pQ29WqAYKgu9").valueChanges()
    .subscribe(res =>{
    console.log(res)
    this.QuoteForm.setValue({
      ClientName: res['ClientName'], 
      Date: res['Date'],
      Description: res['Description'],
      Accepted: res['Accepted'],
    })
    });
  }

  get errorControl() {
    return this.QuoteForm.controls;
  }





  updateQuote() {
    this.isSubmitted = true;
    if(!this.QuoteForm.valid){
      return false;
    }
    else{
        const service = {
          CLientName: this.QuoteForm.get('ClientName').value,
          Date: this.QuoteForm.get('Date').value,
          Description: this.QuoteForm.get('Description').value,
          Accepted: this.QuoteForm.get('Accepted').value
        }
        this.quoteservice.updateQuote(this.data, service)
        alert("Service was successfully updated.");
      }
      this.router.navigate(['/view/quote', this.data]);
  }

}






/*








    this.QuoteForm = this.fb.group({
      ClientName: ['', [Validators.required]],
      Date: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Accepted: ['', [Validators.required]],
  });

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
      })
      console.log(this.QuoteList);
  
    });



*/