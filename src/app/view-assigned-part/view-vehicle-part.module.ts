import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewVehiclePartPageRoutingModule } from './view-vehicle-part-routing.module';

import { ViewVehiclePartPage } from './view-vehicle-part.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ViewVehiclePartPageRoutingModule
  ],
  declarations: [ViewVehiclePartPage]
})
export class ViewVehiclePartPageModule {}
