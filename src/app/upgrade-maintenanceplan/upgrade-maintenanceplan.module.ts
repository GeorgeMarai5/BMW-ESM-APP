import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpgradeMaintenanceplanPageRoutingModule } from './upgrade-maintenanceplan-routing.module';

import { UpgradeMaintenancePlanPage } from './upgrade-maintenanceplan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpgradeMaintenanceplanPageRoutingModule
  ],
  declarations: [UpgradeMaintenancePlanPage]
})
export class UpgradeMaintenanceplanPageModule {}
