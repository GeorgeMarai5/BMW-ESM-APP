import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchmaintenanceplanPageRoutingModule } from './searchmaintenanceplan-routing.module';

import { SearchMaintenancePlanPage } from './searchmaintenanceplan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchmaintenanceplanPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SearchMaintenancePlanPage]
})
export class SearchmaintenanceplanPageModule {}
