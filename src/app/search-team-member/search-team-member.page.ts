import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Employee } from '../models/Employee';
import { AuthService } from '../services/auth.service';
import { TeamMemberService } from '../services/team-member.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EmployeeService } from 'app/services/Employee.service';

@Component({
  selector: 'app-search-team-member',
  templateUrl: './search-team-member.page.html',
  styleUrls: ['./search-team-member.page.scss'],
})
export class SearchTeamMemberPage implements OnInit {

  teamMembers: Employee;
  teamMemberList = [];
  teamMemberForm: FormGroup;
  searchTerm: string;
  teamMemberID: string;
  data: any;

  constructor(public authService: AuthService, private teamMemberservice: TeamMemberService, public fb: FormBuilder, public firestore: AngularFirestore, 
     public alertCtrl: AlertController, public router: Router, public toastCtrl: ToastController,private employeeservice: EmployeeService) { 


      //this.teamMembers = {} as Employee;
      employeeservice = {} as EmployeeService;
    }

  ngOnInit() {

    /*
    if(this.authService.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/tabs/login']);
    }
    */

    this.getallTeamMembers();

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
  }

  async getallTeamMembers(){
    this.employeeservice.getEmployeeList().subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }

async delete(item){

      this.employeeservice.delete(item.employeeId).subscribe(Response => {
        
        console.log(Response);
        //this.getallTeamMembers();

      });
    

  }

  async deleteTeamMember(item){
    const confirmDeleteAlert = await this.alertCtrl.create({
      header: 'Remove Team Memeber',
      message: 'Are you sure you would like to remove this team member from this team?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: end => {
          this.alertCtrl.dismiss();
        }
      },
      {
        text: 'Remove',
        role: 'remove',
        handler: () => {
          this.teamMemberservice.deleteTeamMember(item.teamMemberID).subscribe(Response => {
            console.log(Response);
          });
          this.presentToast();
        }
      }]
    });
    confirmDeleteAlert.present();
  }

  async assignTeamMember(id){
    
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Team member has been removed successfully.',
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
}
