import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
