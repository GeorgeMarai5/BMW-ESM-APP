import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckinVehiclePageRoutingModule } from './checkin-vehicle-routing.module';

import { CheckinVehiclePage } from './checkin-vehicle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckinVehiclePageRoutingModule
  ],
  declarations: [CheckinVehiclePage]
})
export class CheckinVehiclePageModule {}
