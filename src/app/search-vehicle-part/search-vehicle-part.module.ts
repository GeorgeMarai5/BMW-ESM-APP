import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchVehiclePartPageRoutingModule } from './search-vehicle-part-routing.module';

import { SearchVehiclePartPage } from './search-vehicle-part.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchVehiclePartPageRoutingModule
  ],
  declarations: [SearchVehiclePartPage]
})
export class SearchVehiclePartPageModule {}
