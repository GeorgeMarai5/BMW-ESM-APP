import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMaintenanceplanPageRoutingModule } from './view-maintenanceplan-routing.module';

import { ViewMaintenancePlanPage } from './view-maintenanceplan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ViewMaintenanceplanPageRoutingModule
  ],
  declarations: [ViewMaintenancePlanPage]
})
export class ViewMaintenanceplanPageModule {}
