import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder,Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-feedback',
  templateUrl: './service-feedback.page.html',
  styleUrls: ['./service-feedback.page.scss'],
})
export class ServiceFeedbackPage implements OnInit {

  constructor(public authService: AuthService,
    public fb: UntypedFormBuilder,
    public router: Router) { }

  ngOnInit() {
  }

}
