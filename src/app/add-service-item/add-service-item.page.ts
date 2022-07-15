import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-add-service-item',
  templateUrl: './add-service-item.page.html',
  styleUrls: ['./add-service-item.page.scss'],
})
export class AddServiceItemPage implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
