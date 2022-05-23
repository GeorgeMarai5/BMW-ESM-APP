import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpgradeMaintenanceplanPageRoutingModule } from './upgrade-maintenanceplan-routing.module';

import { UpgradeMaintenanceplanPage } from './upgrade-maintenanceplan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpgradeMaintenanceplanPageRoutingModule
  ],
  declarations: [UpgradeMaintenanceplanPage]
})
export class UpgradeMaintenanceplanPageModule {}
