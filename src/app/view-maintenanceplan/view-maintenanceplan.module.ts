import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMaintenanceplanPageRoutingModule } from './view-maintenanceplan-routing.module';

import { ViewMaintenanceplanPage } from './view-maintenanceplan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMaintenanceplanPageRoutingModule
  ],
  declarations: [ViewMaintenanceplanPage]
})
export class ViewMaintenanceplanPageModule {}
