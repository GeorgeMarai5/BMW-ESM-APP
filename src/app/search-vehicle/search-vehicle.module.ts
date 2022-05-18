import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchVehiclePageRoutingModule } from './search-vehicle-routing.module';

import { SearchVehiclePage } from './search-vehicle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchVehiclePageRoutingModule
  ],
  declarations: [SearchVehiclePage]
})
export class SearchVehiclePageModule {}
