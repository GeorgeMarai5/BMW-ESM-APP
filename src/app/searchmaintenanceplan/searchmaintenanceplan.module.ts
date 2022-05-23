import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchmaintenanceplanPageRoutingModule } from './searchmaintenanceplan-routing.module';

import { SearchmaintenanceplanPage } from './searchmaintenanceplan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchmaintenanceplanPageRoutingModule
  ],
  declarations: [SearchmaintenanceplanPage]
})
export class SearchmaintenanceplanPageModule {}
