import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMaintenanceplanPageRoutingModule } from './view-maintenanceplan-routing.module';

import { ViewMaintenancePlanPage } from './view-maintenanceplan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMaintenanceplanPageRoutingModule
  ],
  declarations: [ViewMaintenancePlanPage]
})
export class ViewMaintenanceplanPageModule {}
