import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-data',
  templateUrl: './service-data.page.html',
  styleUrls: ['./service-data.page.scss'],
})
export class ServiceDataPage implements OnInit {

  constructor(public authService: AuthService,
    public fb: FormBuilder,
    public router: Router) { }

  ngOnInit() {
  }

}
