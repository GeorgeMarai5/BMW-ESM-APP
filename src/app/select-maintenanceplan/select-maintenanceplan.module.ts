import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectMaintenanceplanPageRoutingModule } from './select-maintenanceplan-routing.module';

import { SelectMaintenanceplanPage } from './select-maintenanceplan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SelectMaintenanceplanPageRoutingModule
  ],
  declarations: [SelectMaintenanceplanPage]
})
export class SelectMaintenanceplanPageModule {}
