import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewEmployeeAccountPageRoutingModule } from './view-employee-account-routing.module';

import { ViewEmployeeAccountPage } from './view-employee-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewEmployeeAccountPageRoutingModule
  ],
  declarations: [ViewEmployeeAccountPage]
})
export class ViewEmployeeAccountPageModule {}
