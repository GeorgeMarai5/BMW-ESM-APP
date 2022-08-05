import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-end-of-service',
  templateUrl: './end-of-service.page.html',
  styleUrls: ['./end-of-service.page.scss'],
})
export class EndOfServicePage implements OnInit {

  constructor(public authService: AuthService,
    public fb: FormBuilder,
    public router: Router) { }

  ngOnInit() {
  }

}
