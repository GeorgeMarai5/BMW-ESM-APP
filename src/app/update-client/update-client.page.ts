import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.page.html',
  styleUrls: ['./update-client.page.scss'],
})
export class UpdateClientPage implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }


  /*let field = document.getElementById("field");

  
  if (sessionStorage.getItem("autosave")) {
    
    field.value = sessionStorage.getItem("autosave");
  }
  
  
  field.addEventListener("change", function() {
   
    sessionStorage.setItem("autosave", field.value);
  });

*/




}
