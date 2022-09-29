import { Component, OnInit ,NgZone} from '@angular/core';
import { UntypedFormBuilder,UntypedFormGroup,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { QuoteService } from '../services/quote.service';
import { Quote } from '../models/Quote';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-quote',
  templateUrl: './create-quote.page.html',
  styleUrls: ['./create-quote.page.scss'],
})

export class CreateQuotePage implements OnInit {

  createQuoteForm: UntypedFormGroup;
  isSubmitted = false;
  data: any;
  quote: Quote;

  constructor (private route: ActivatedRoute, 
    public router: Router, 
    public authService: AuthService, 
    public fb: UntypedFormBuilder, 
    private quoteservice: QuoteService, 
    public toastCtrl: ToastController) {



      quoteservice = {} as QuoteService;
      //this.data = new Fleet();
      this.data = new Quote();

   // this.route.params.subscribe(params => {
    //  this.data = params.id;
   // });
    //this.addFleetForm = new FormGroup({
      //fleetName: new FormControl('', Validators.required),
      //fleetLocation: new FormControl('', Validators.required)
    //}); 

  
  }

  /*submitForm(){
    this.isSubmitted = true;
    if(!this.addFleetForm.valid){
      return false;
    }
    else{
        const fleet = {
          fleetName: this.addFleetForm.get('fleetName').value,
          fleetID: this.addFleetForm.get('fleetID').value,
          vehicleAmount: this.addFleetForm.get('vehicleAmount').value,
          fleetLocation: this.addFleetForm.get('fleetLocation').value
        }
        this.fleetservice.createFleet(fleet);
        console.log(fleet);
        this.presentToast()
      }
      this.router.navigate(['/tabs/search/vehicle']);
  }
  */



  async create(){

  this.quoteservice.createQuote(this.data).subscribe(response => {
    console.log(response);
    //this.router.navigate(['student-list']);
  });

  this.presentToast();

}


  ngOnInit() {
    /*if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
    */


  }

  get errorControl() {
    return this.createQuoteForm.controls;
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'The quote has been created successfully',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}