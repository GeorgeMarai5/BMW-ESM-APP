import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder,Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-performance',
  templateUrl: './vehicle-performance.page.html',
  styleUrls: ['./vehicle-performance.page.scss'],
})
export class VehiclePerformancePage implements OnInit {

  constructor(public authService: AuthService,
    public fb: UntypedFormBuilder,
    public router: Router) { }

  ngOnInit() {
  }

}
