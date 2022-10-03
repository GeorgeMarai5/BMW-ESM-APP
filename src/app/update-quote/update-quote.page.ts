import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteService } from '../services/quote.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Quote } from 'app/models/Quote';
import { UpdateQuoteHelpComponent } from 'app/components/update-quote-help/update-quote-help.component';

@Component({
  selector: 'app-update-quote',
  templateUrl: './update-quote.page.html',
  styleUrls: ['./update-quote.page.scss'],
})
export class UpdateQuotePage implements OnInit {

  editquoteForm: FormGroup;
  quote: Quote;
  QuoteList = [];
  isSubmitted = false;
  data: any;
  id: any;
  
  constructor(public authService: AuthService, 
    public router: Router, 
    private quoteService: QuoteService, 
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute, 
    public toastCtrl: ToastController,
    public helpModal: ModalController) { 

    //   this.route.params.subscribe(params => {
    //     this.data = params.id;
    // });
    // this.editquoteForm = new FormGroup({
    //   ClientName: new FormControl('', Validators.required),
    //   Description: new FormControl('', Validators.required),
    //   Date: new FormControl('', Validators.required),
    //   Accepted: new FormControl('', Validators.required)
    // });
    quoteService = {} as QuoteService;
    this.quote = new Quote();

    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
  });

  }

  submitForm(){
    /*
    this.isSubmitted = true;
    if(!this.editquoteForm.valid){
      return false;
    }
    else{
        const QuoteData = {
          ClientName: this.editquoteForm.get('ClientName').value,
          Date: this.editquoteForm.get('Date').value,
          Description: this.editquoteForm.get('Description').value,
          Accepted: this.editquoteForm.get('Accepted').value
        }
        this.quoteservice.updateQuote(this.data)
        this.presentToast()
      }
      this.router.navigate(['/tabs/view/dealership', this.data]);
      */
  }

  async showHelp(){
    const modal = await this.helpModal.create({
      component: UpdateQuoteHelpComponent});
      return await modal.present();
  }

  ngOnInit() {
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

    /*this.quoteservice.get_Quote(this.data)
    .subscribe(res =>{
    console.log(res)
    this.editquoteForm.setValue({
      ClientName: res['ClientName'],
      Date: res['Date'], 
      Description: res['Description'], 
      Accepted: res['Accepted']
    })
    });*/
  }

  get errorControl() {
    return this.editquoteForm.controls;
  }
   
  async updateQuote(id, data){

    this.quoteService.updateQuote(this.id,this.data).subscribe(response => {
      console.log(response);
    })
  }
  back() {
    this.router.navigate(['tabs/view/quote', this.data]);
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Quote has been updated successfully.',
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }
}