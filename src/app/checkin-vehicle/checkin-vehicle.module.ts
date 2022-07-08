import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckinVehiclePageRoutingModule } from './checkin-vehicle-routing.module';

import { CheckinVehiclePage } from './checkin-vehicle.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckinVehiclePageRoutingModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  declarations: [CheckinVehiclePage]
})
export class CheckinVehiclePageModule {}
