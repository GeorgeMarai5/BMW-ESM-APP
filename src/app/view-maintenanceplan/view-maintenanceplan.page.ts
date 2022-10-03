import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder,Validators,FormGroup,FormControl  } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { MaintenancePlan } from '../models/Maintenance-Plan';
import { ActivatedRoute } from '@angular/router';
import { MaintenancePlanService } from '../services/MaintenancePlan.service';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-view-maintenanceplan',
  templateUrl: './view-maintenanceplan.page.html',
  styleUrls: ['./view-maintenanceplan.page.scss'],
})
export class ViewMaintenancePlanPage implements OnInit {
  
  maintenanceplan = {};
  plans: MaintenancePlan;
  planform : FormGroup;
  data: any;
  id: any;

  constructor(public planService: MaintenancePlanService , private zone: NgZone,private toastCtrl: ToastController,private service: PostService, 
  public fb: FormBuilder,private router: Router, private activatedRoute: ActivatedRoute, public authService: AuthService, private firestore: AngularFirestore) { 
  
    planService = {} as MaintenancePlanService;

    // this.planform = new FormGroup({
    //   PlanName: new FormControl('', Validators.required),
    //   Description: new FormControl('', Validators.required),
    //   Duration: new FormControl('', Validators.required),
    //   Price: new FormControl('', Validators.required)
    // });
    this.activatedRoute.params.subscribe(params => {
      this.data = params.id;
  });
  }

  ngOnInit() {
    this.planService.getMaintenancePlan(this.data).subscribe(response => {
      console.log(response);
      this.data = response;
    })

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

    // this.planService.getMaintenancePlan(this.data).valueChanges()
    //   .subscribe(res =>{
    //   console.log(res)
    //   this.planform.setValue({
    //     PlanName: res['Plan_Name'], 
    //     Description: res['Description'],
    //     Duration: res['Duration'], 
    //     Price: res['Price']
    //   })
    // });
  }

  navToUpdate() {
    this.router.navigate(['/tabs/upgrade/maintenanceplan', this.data]);
  }
}