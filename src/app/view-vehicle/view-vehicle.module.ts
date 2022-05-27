import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewVehiclePageRoutingModule } from './view-vehicle-routing.module';

import { ViewVehiclePage } from './view-vehicle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewVehiclePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ViewVehiclePage]
})
export class ViewVehiclePageModule {}
