import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehiclePerformancePageRoutingModule } from './vehicle-performance-routing.module';

import { VehiclePerformancePage } from './vehicle-performance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehiclePerformancePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VehiclePerformancePage]
})
export class VehiclePerformancePageModule {}
