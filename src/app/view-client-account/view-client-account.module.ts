import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewClientAccountPageRoutingModule } from './view-client-account-routing.module';

import { ViewClientAccountPage } from './view-client-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewClientAccountPageRoutingModule, ReactiveFormsModule
  ],
  declarations: [ViewClientAccountPage]
})
export class ViewClientAccountPageModule {}
