import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpgradeMaintenanceplanPageRoutingModule } from './upgrade-maintenanceplan-routing.module';

import { UpgradeMaintenancePlanPage } from './upgrade-maintenanceplan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpgradeMaintenanceplanPageRoutingModule
  ],
  declarations: [UpgradeMaintenancePlanPage]
})
export class UpgradeMaintenanceplanPageModule {}
