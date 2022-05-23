import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectMaintenanceplanPageRoutingModule } from './select-maintenanceplan-routing.module';

import { SelectMaintenanceplanPage } from './select-maintenanceplan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectMaintenanceplanPageRoutingModule
  ],
  declarations: [SelectMaintenanceplanPage]
})
export class SelectMaintenanceplanPageModule {}
