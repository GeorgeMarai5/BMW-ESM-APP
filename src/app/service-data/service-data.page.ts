import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder,Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-data',
  templateUrl: './service-data.page.html',
  styleUrls: ['./service-data.page.scss'],
})
export class ServiceDataPage implements OnInit {

  constructor(public authService: AuthService,
    public fb: UntypedFormBuilder,
    public router: Router) { }

  ngOnInit() {
  }

}
